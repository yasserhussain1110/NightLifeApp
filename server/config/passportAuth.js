var configAuth = require('./auth');
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function (passport) {

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    done(err, user);
  });

  passport.use(new TwitterStrategy({
      consumerKey: configAuth.twitterAuth.consumerKey,
      consumerSecret: configAuth.twitterAuth.consumerSecret,
      callbackURL: configAuth.twitterAuth.callbackURL
    },
    function (token, tokenSecret, profile, done) {
      done(null, profile);
    }));

};
