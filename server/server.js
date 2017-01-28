const express = require('express');
const app = express();

if (process.env.NODE_ENV === "production") {
  console.log("Running In Production");
  app.use(express.static('build'));
} else {
  console.log("Running In Development");
  require('dotenv').config();
  require('../tools/DevSetup').setupDev(app);
}

const bodyParser = require('body-parser');
const passport = require('passport');
const passportAuth = require('./config/passportAuth');
passportAuth(passport);

const SearchBars = require('./actions/SearchBars');
const IndicateGoing = require('./actions/IndicateGoing');

app.use(require('express-session')({ secret: 'abracadabra', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/lastSearchedLocation', function (req, res) {
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
    loggedIn: !!req.user
  });
});

app.post('/api/searchBars', SearchBars.post);

app.post('/api/indicateGoing', IndicateGoing.post);

app.get('/login', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', {failureRedirect: '/'}),
  function (req, res) {
    console.log("Authentication Successful");
    res.redirect('/');
  });

app.listen(process.env.PORT || 8080);


