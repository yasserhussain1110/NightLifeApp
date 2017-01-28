var configAuth = require('./auth');
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function (passport) {

  // used to serialize the user for the session
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  // used to deserialize the user
  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });

  passport.use(new TwitterStrategy({
      consumerKey: configAuth.twitterAuth.consumerKey,
      consumerSecret: configAuth.twitterAuth.consumerSecret,
      callbackURL: configAuth.twitterAuth.callbackURL
    },
    function (token, tokenSecret, profile, cb) {
      cb(null, profile);
    }));

};
