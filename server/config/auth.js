// expose our config directly to our application using module.exports

let {TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, TWITTER_CALLBACK_URL} = process.env;

module.exports = {
  'twitterAuth': {
    'consumerKey': TWITTER_CONSUMER_KEY,
    'consumerSecret': TWITTER_CONSUMER_SECRET,
    'callbackURL':  TWITTER_CALLBACK_URL
  }
};
