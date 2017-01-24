// Request API access: http://www.yelp.com/developers/getting_started/api_access
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'uujnzoPtSBi2dvAnPe_TrQ',
  consumer_secret: 'dQ9eKSQWuMw_56hc6rMqfNzwGw0',
  token: 'A1ZnJ16JozmwX0_Fg2DRg9I2fdGv1gR-',
  token_secret: 'qvGmbeADlTMmiuevP86I6mWp5to',
});

// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({ category_filter:'nightlife', location: 'Montreal' })
.then(function (data) {
  var outcome = data.businesses.map(function(business) {
    return {
      name: business.name,
      image_url: business.image_url,
      snippet_text: business.snippet_text,
      url: business.url
    }
  });
  console.log(JSON.stringify(outcome));
})
.catch(function (err) {
  console.error(err);
});
