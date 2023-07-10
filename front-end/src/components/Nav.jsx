import { Link, Routes, Route } from 'react-router-dom'
import Home from './Home'
import heroSearch from '../images/heroSearch.png'

export default function Nav () {
    return(
        <div className='nav-links'>
            <div className='right-title'>
                   <Link to='/'><img className='logo' src="src/images/logo.png" alt="logo" /></Link>
                   <Link to='/'><h1 className='nav-title'>StyleSwap</h1></Link>
            </div>
        
            <div className='center-links'>
                 <Link to='/'><img src='src/images/home.png'/></Link>
                 <Link to='/product'><img className='nav-icon center marketplace' src="src/images/product.png"/></Link>
                 {/* <Link><img src='src/images/heroSearch.png'/></Link> */}
            </div>

            <div className='left-title'>
                <Link to='/cart'><img className='nav-icon left cart' src="src/images/cartt.png" alt="cart" /></Link>
                 <Link to='/login'><img className='nav-icon left login' src="src/images/user.png" alt="user-icon" /></Link> 
            </div>
        </div>
    )
}