const express = require('express')
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const User = require('./models/user');

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

app.use((req, res, next) => {
    User.findById('5f68f864ff342c4b2094d8f5')
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });

app.use(shopRoutes)
app.use('/admin',adminRoutes)

app.use(errorController.get404)

mongoose.connect(
    'mongodb+srv://aashimgarg:aashimgarg@shop-app.7uqv5.mongodb.net/aashim?retryWrites=true&w=majority'
)
.then( result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Aashim',
          email: 'aashim@email.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000)
})
.catch( err => {
    console.log(err)
})
