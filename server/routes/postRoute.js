const Blog = require('../module/Blog');
const router = require('express').Router();

router.get('/postBlog',async (req,res)=>{
res.render('post');
});

router.post('/postBlog',async (req,res)=>{
    let title = req.body.title;
    let author = req.body.author;
    let content = req.body.content;
  
    const regExp = /[!@#*%'*=-]/;
    if(regExp.test(title) || regExp.test(author) || regExp.test(content)){
      return res.redirect('post');
    }
    else{
      const newBlog = new Blog({
        title:title,
        author:author,
        content:content
        
      });
      newBlog.save();
      res.send('ww');
      
    }
  });

  module.exports = router;