// Request API access: http://www.yelp.com/developers/getting_started/api_access
var Yelp = require('yelp');

let {YELP_CONSUMER_KEY, YELP_CONSUMER_SECRET, YELP_TOKEN, YELP_TOKEN_SECRET} = process.env;

var yelp = new Yelp({
  consumer_key: YELP_CONSUMER_KEY,
  consumer_secret: YELP_CONSUMER_SECRET,
  token: YELP_TOKEN,
  token_secret: YELP_TOKEN_SECRET,
});

function requestYelp(location, success, failure) {
  yelp.search({category_filter: 'bars', location: location})
    .then(function (data) {
      var bars = data.businesses;
      success(bars);
    })
    .catch(function (err) {
      failure(err);
    });
}

// See http://www.yelp.com/developers/documentation/v2/search_api

module.exports = requestYelp;
