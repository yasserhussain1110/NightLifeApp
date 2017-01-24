// Request API access: http://www.yelp.com/developers/getting_started/api_access
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'uujnzoPtSBi2dvAnPe_TrQ',
  consumer_secret: 'dQ9eKSQWuMw_56hc6rMqfNzwGw0',
  token: 'A1ZnJ16JozmwX0_Fg2DRg9I2fdGv1gR-',
  token_secret: 'qvGmbeADlTMmiuevP86I6mWp5to',
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
