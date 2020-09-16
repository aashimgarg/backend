const express =  require('express')
const router = express.Router();
const path = require('path');
const adminData = require('./admin');

router.get('/' , (req,res) => {
    console.log(adminData.products)
    res.sendFile(path.join(__dirname,'../','views','shop.html'))
})

module.exports = router