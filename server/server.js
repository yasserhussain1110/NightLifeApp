const express = require('express');
const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static('build'));
} else {
  require('dotenv').config();
  require('../tools/DevSetup').setupDev(app);
}

const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportAuth = require('./config/passportAuth');
passportAuth(passport);

const SearchBars = require('./actions/SearchBars');
const IndicateGoing = require('./actions/IndicateGoing');


app.use(passport.initialize());
app.use(passport.session());

app.use(cookieSession({
  name: 'session',
  keys: ['abracadabra'],
  // Cookie Options
  maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
}));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/lastSearchedLocation', function (req, res) {
  if (req.session.location) {
    res.json({
      location: req.session.location
    });
  } else {
    res.status(404).json({
      errors: ["Not Found"]
    });
  }
});

app.get('/isLoggedIn', function (req, res) {
  res.json({
    loggedIn: req.session.passport && req.session.passport.user
  });
});

app.post('/api/searchBars', SearchBars.post);

app.post('/api/indicateGoing', IndicateGoing.post);

app.get('/login', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', {failureRedirect: '/'}),
  function (req, res) {
    res.redirect('/');
  });

app.listen(process.env.PORT || 8080);


