const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

const info = []

// app.use(function(req, res, next) {
//   if (req.url == '/login') {
//     next()
//   } else if (!req.session.username) {
//      res.render('login')
//   } next()  
// }
// })

app.get('/', function(req, res) {
  res.render('index')
});

app.post('/login', function(req, res) {
  console.log('username is ' + req.body.username);
  console.log('password is ' + req.body.password);

  // loop through array to find username and password
  // if you find a match then set req.session.login =true
  // req.session.user = req.body.username
  // res.render('index')

  // if not then render login with an error message
  // res.render('login')

  res.render('index')
})

app.listen(3000, function() {
  console.log('Successfully started express application!');
});
