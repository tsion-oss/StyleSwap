import { useState,useRef, useEffect, useContext } from 'react'
import UserContext from '../UserContext'
import axios from 'axios'

export default function SignUp () {

    const [usernameFormState, setUsernameFormState] = useState('')
    const [passwordFormState, setPasswordFormState] = useState('')
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
    })
    const { vertUsername,setVertUsername,vertId,setVertId } = useContext(UserContext)

    const usernameHandleChange = (evt) => {
        setUsernameFormState(evt.target.value)
        console.log(usernameFormState)
    }
    const passwordHandleChange = (evt) => {
        setPasswordFormState(evt.target.value)
        
        console.log(passwordFormState)
    }

    useEffect(()=>{
        setUserInfo({
            username: usernameFormState, 
            password: passwordFormState,
            isLoggedIn: true
        })
    },[usernameFormState, passwordFormState])
    console.log(userInfo)

    const handleSubmit = async(evt) => {
        evt.preventDefault()
        const postLoginInfo = async(req,res) =>{
            const response2 = await axios.post(`http://localhost:3001/api/userinfo/signup`, userInfo)
            console.log(response.data)  
        }
        postLoginInfo()    
    }

    const changeUser = async() => {
        const response = await axios.get(`http://localhost:3001/api/userinfo`)
        alert(`Hello ${userInfo.username}, welcome to StyleSwap!`)
        setVertUsername(response.data.users[response.data.users.length-1].username) 
        setVertId(response.data.users[response.data.users.length-1]._id)
        localStorage.setItem('userId', response.data.users[response.data.users.length-1]._id)
        localStorage.setItem('username', response.data.users[response.data.users.length-1].username)
        console.log(vertUsername)
    }

    const inputRef = useRef(null)
    const [image, setImage] = useState('')
    
    const handleImageClick = (event) => {
        inputRef.current.click()
    }
    
    function handleImage(e) {
        const file = e.target.files[0]
        console.log(file)
        setImage('')
    }

    return(
        <div>
            <form onSubmit={()=>{
                handleSubmit()
                setTimeout(()=>console.log('pause'),1000)
                changeUser()
                }} className='loginContainer signUp'>
                <h1 className="headinglogin">Signup page</h1>
                <label>Username:</label>
                <input className='signUpInput' type="text" onChange={usernameHandleChange} placeholder='Enter your username...'/>
                <label>Password:</label>
                <input className='signUpInput' type="text" onChange={passwordHandleChange} placeholder='Enter your password...'/>
                <div onClick={handleImageClick}
                     className="upload">
                     <img src='./src/images/upload.png'
                        style={{ cursor: 'pointer' }} />
                     <input type='file' 
                        ref={inputRef}
                        onChange={handleImage}
                        style={{ display: 'none' }}></input>
                </div>
                <input className='signUpSubmit' type="submit"/>
            </form>
        </div>
    )
}