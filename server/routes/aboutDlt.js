const Blog = require('../module/Blog');
const router = require('express').Router();

router.get('/about',async(req,res)=>{
    const readBlog = await Blog.find();
    res.render('about',{readBlog});
  });


  router.post('/delete/:id',async(req,res)=>{
     await Blog.deleteOne({_id: req.params.id});
     return res.redirect('/about');
  })

  module.exports = router;