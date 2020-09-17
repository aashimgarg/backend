const products = []

exports.getAddProduct = (req,res) => {
    res.render('add-product')
}

exports.postAddProduct = (req,res) => {
    products.push({ title : req.body.title});
    res.redirect('/')
}

exports.getProducts = (req,res) => {
    res.render('shop', {prods:products, docTitle:'Shop'})
}