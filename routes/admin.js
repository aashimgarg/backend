const express =  require('express')
const router = express.Router();
const path = require('path')

const products = []
router.get('/add-product' , (req,res) => {
    res.render('add-product')
})

router.post('/add-product' , (req,res) => {
    products.push({ title : req.body.title});
    res.redirect('/')
})

exports.routes = router;
exports.products = products;