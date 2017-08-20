const express = require('express');
const mustacheExpress = require('mustache-express');
const parseurl = require('parseurl');
const session = require('express-session');
const bodyParser = require('body-parser')
const app = express();
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
// making an array of objects with properties.
let profiles = [{
  username: 'courtney',
  password: 'isbadatcoding'
}, {
  username: 'sorry',
  password: 'notsorry'
}];

// this will intercept the user before the home page renders and will send the user to the login page
app.use(function(req, res, next) {
// if the req url = my login page then move on past this interceptor
  if (req.url === '/login') {
    next();
    // if not then have the section req the login and then render the login page
  } else if (!req.session.login) {
    res.render('login');
// if niether are true then move on
  } else {
    next();
  }

})

// set the root to index.mustache
app.get('/', function(req, res) {
  res.render('index')
})


app.post('/login', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  console.log('username input = ' + username);
  console.log('password input = ' + password);
  for (var i = 0; i < profiles.length; i++) {
    if (username === profiles[i].username && password === profiles[i].password) {
      req.session.login = true;
    }
  }
  if (req.session.login === true) {
    res.render('index');
  } else {
    res.render('login', {
      error: "incorrect username or password"
    });
  }


})
app.listen(3000, function() {
  console.log('YOUR SERVER IS RUNNING ,BOSS')
})
