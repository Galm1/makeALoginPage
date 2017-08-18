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

let profiles = [{
  username: 'courtney',
  password: 'isbadatcoding'
}, {
  username: 'sorry',
  password: 'notsorry'
}];

app.use(function(req, res, next) {

  if (req.url === '/login') {
    next();
  } else if (!req.session.login) {
    res.render('login');
  } else {
    next();
  }

})

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
