const express = require('express')
const app = express();
const path = require('path')

app.set('view engine' , 'pug')

const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const errorController = require('./controllers/error')

app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(express.static(path.join(__dirname,'public')))
app.use(shopRoutes)
app.use('/admin',adminRoutes)

app.use(errorController.get404)

app.listen(3000)