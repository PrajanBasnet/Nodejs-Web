const router = require('express').Router();
const Blog = require('../module/Blog');


const passport = require('passport');
const mongoose = require('mongoose');

const localStrategy = require('passport-local');
const crypto = require('crypto');
const session = require('express-session');
const adminLogin = require('../module/admin');
const { error } = require('console');


router.use(session({
    secret:'Keyboard warrior',
    saveUninitialized: true,
    resave:false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    }

}));

function isAuthenticated(req,res,next){
    if(req.session.userName) next()
        else next('route')
}

router.get('/register',isAuthenticated, (req,res)=>{
    res.render('register');
})
router.post('/register', (req,res)=>{
    const adminlog = new adminLogin({
        userName: req.body.userName,
        password:req.body.password
        
      });
      adminlog.save();
    res.redirect('/admin');
})

router.get('/postBlog', isAuthenticated, async (req,res)=>{
    res.render('post');
    
    });

// express.urlencoded({ extended: false })
router.get('/admin',(req,res)=>{
    res.render('admin');
});

router.post('/admin',async(req,res)=>{
    const userData = await adminLogin.findOne({
        userName: req.body.userName
    });
try{
    if(userData.userName == req.body.userName && userData.password == req.body.password){
 
    req.session.regenerate((err)=>{
        try{
            req.session.userName = req.body.userName
            req.session.save();
           res.redirect('postBlog');
        }catch(err){
            console.log("There was an error");
        }
    });

}}catch(err){
    res.redirect("admin");
}   
  
});

router.get('/logout',(req,res)=>{
    req.session.userName = null;
    req.session.save((err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("logout sucessfull");
            res.redirect('/');
        }
    } )
})

module.exports = router;