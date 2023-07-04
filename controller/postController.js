const { Post } = require('../models')
const db = require('../db')


const getAllPosts = async(req, res) => {
    try{
        const posts = await Post.find()
         res.status(200).json({ posts })
    } catch (error){
         res.status(500).send(error.message)
    }

}

const getPost = async(req,res) => {
    try{
        const { id } = req.params
        const post = await Post.findById(id)
        if(!post) throw Error('Post not found')
        res.json({ post })
    }catch (error) {
        return res.status(500).send(error.message)
    }
}

const createPost = async(req,res) => {
    try{
        const post = new Post(req.body)
        await post.save()
        return res.status(200).json({ post })
    } catch(error){
        return res.status(500).send(error.message)
    }
}

const updatePost = async(req,res) => {
    try{
        let { id } = req.params
        let post = await Post.findByIdAndUpdate(id, req.body, { new: true })
        if (post) {
            return res.status(200).json(post)
        }
         throw new Error('Post not found')
    } catch (error){
       return res.status(500).send(error.message)
    }
} 

const deletePost = async(req, res) => {
    try{
        const { id } = req.params
        const deleted = await Post.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send('Post deleted')
        }
        throw new Error('post not found')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const addLikeToPost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id)
        if(!post) throw Error('Post not found')

        post.likes++
        await post.save()

        res.json({ post })

    } catch (error) {
        res.status(500).send(error.message)
    }
}

const unLikeToPost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id)
        if(!post) throw Error('Post not found')

        post.likes--
        await post.save()
         
        res.json({ post })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const uploadImage = async (req, res) => {
    try{
        if(!req.files || Object.keys(req.files.length === 0)) {
        return res.status(400).json({ message: 'No image file provided' })
        }
        const image = req.files.image
        return res.status(200).json({ message: 'Image uploaded successfully' })

    }catch(error) {
        console.error('Error uploading image:', error)
        return res.status(500).json({ message: 'Image upload failed'})
    }
}


module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    addLikeToPost,
    unLikeToPost,
    uploadImage
}
