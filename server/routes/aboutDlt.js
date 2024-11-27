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


  router.post('/update',async(req,res)=>{
   let id = req.body.id;

   console.log(id);
   let data =  await Blog.findById({_id: id});
   console.log(data.title);
    res.render('edit',{data});
})

router.post('/updateReal',async(req,res)=>{
   let id = req.body.id;
   const filter = {
      _id : id
   }
   const update = {
      "title":req.body.title,
      "author":req.body.author,
      "content":req.body.content
   };

 await Blog.findOneAndUpdate(filter,update);
   return res.redirect('about');

})

  module.exports = router;