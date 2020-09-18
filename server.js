const express = require('express')
const app = express();
const path = require('path')
const mongoose = require('mongoose')

app.set('view engine', 'ejs');
app.set('views', 'views');

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

mongoose.connect(
    'mongodb+srv://aashimgarg:aashimgarg@shop-app.7uqv5.mongodb.net/<dbname>?retryWrites=true&w=majority'
)
.then( result => {
    app.listen(3000)
})
.catch( err => {
    console.log(err)
})
