require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./server/module/Blog');
const bodyParser = require("body-parser");

const expressLayout = require('express-ejs-layouts');


const connectDB = require('./server/config/db');
// mongoose.connect("mongodb+srv://hero:Hero991@clusterp.1ykeo.mongodb.net/?retryWrites=true&w=majority&appName=ClusterP");

const app = express();
app.use(express.static('public'));
app.use(expressLayout);
app.set('layout','./layouts/main');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

connectDB();

app.get('/',(req,res)=>{
  res.render('index');
})

app.get('/postBlog',(req,res)=>{
  res.render('post');
})

app.post('/postBlog',(req,res)=>{
  let title = req.body.title;
  let author = req.body.author;
  let content = req.body.content;

  const regExp = /[!@#*%'*=/\-]/;
  if(regExp.test(title) || regExp.test(author) || regExp.test(content)){

    res.status(404).redirect('index');
  }
  if(!title || !author || content ){
    // res.status(404).send("file cannot be empty");
    res.status(404).redirect('index');

  }
    const newBlog = new Blog({
      title:title,
      author:author,
      content:content
      
    });
    newBlog.save();
    
    res.send("Saved in databased");


})
app.get('/about',async(req,res)=>{
    const readBlog = await Blog.find();
    res.render('about',{readBlog});
  });


  app.post('/delete/:id',async(req,res)=>{
     await Blog.deleteOne({_id: req.params.id});
     return res.redirect('/about');
  })


app.listen(3000);