require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./server/module/Blog');

const bodyParser = require("body-parser");
const adminroute = require('./server/routes/admin');
const indexRoute = require('./server/routes/index');
const aboutDlt = require('./server/routes/aboutDlt');
const postRouter = require('./server/routes/postRoute');




const expressLayout = require('express-ejs-layouts');


const connectDB = require('./server/config/db');

const app = express();
app.use(express.static('public'));
app.use(expressLayout);
app.set('layout','./layouts/main');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

connectDB();

app.use(indexRoute);
app.use(postRouter);
app.use(aboutDlt);
app.use(adminroute);

app.get('/ww',(req,res)=>{
  res.render('index');
})

app.listen(3000);