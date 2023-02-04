const router = require('express').Router();
const verify = require('./verifyToken');
const Blog = require('../model/BlogModel');


router.post('/blog',verify,async (req,res)=>{
    const blog = new Blog({
        title:req.body.title,
        description:req.body.description,
        createdBy:req.body.createdBy
    });
    try{
        const savedblog = await blog.save();
        res.send(savedblog);
        // res.send({blog:blog._id});
    }catch(err){
        res.status(400).send(err);
    }
})

router.get('/blogs', async(req,res)=>{
    try{
        const blogs = await Blog.find()
        res.json(blogs)
    }catch(err){
        console.log(err);
    }
    // res.send('Here is your blogs')
})
router.get('/blog/:id',async(req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id)
        res.json(blog)
    }catch(err){
        console.log(err);
    }
    // res.send('Here is your blogs')
})

router.put('/blog/:id',verify,async(req,res)=>{
    
    try{
        let blog = await Blog.findById(req.params.id)
       
        blog = await Blog.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        

        res.status(200).json(blog)
    }catch(err){
        console.log(err)
        res.send(err);
    }
})

router.delete('/blog/:id',verify,async(req,res)=>{
    const blog = await Blog.findById(req.params.id);
    if(!blog) return res.status(500).json({
        message:"product not found"
    })
    blog.remove();
    res.status(200).json({
        message:"Blog deleted Successfully"
    })
})

module.exports = router;