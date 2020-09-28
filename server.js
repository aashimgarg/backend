const express = require('express')
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const User = require('./models/user');

const MONGODB_URI =
  'mongodb+srv://aashimgarg:aashimgarg@shop-app.7uqv5.mongodb.net/aashim';

  const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
  });
  
app.set('view engine', 'ejs');
app.set('views', 'views');

const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth');

const errorController = require('./controllers/error')

app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(
  session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store })
);

app.use(express.static(path.join(__dirname,'public')))

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin',adminRoutes)
app.use(shopRoutes)
app.use(authRoutes);

app.use(errorController.get404)

mongoose.connect(
  MONGODB_URI
)
.then(result => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: 'Max',
        email: 'max@test.com',
        cart: {
          items: []
        }
      });
      user.save();
    }
  });
  app.listen(3000);
})
.catch(err => {
  console.log(err);
});

