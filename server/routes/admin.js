const router = require('express').Router();

router.get('/admin',(req,res)=>{
    res.send("Admin page");
});


module.exports = router;