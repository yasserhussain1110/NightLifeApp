// expose our config directly to our application using module.exports

module.exports = {
  'twitterAuth': {
    'consumerKey': 'jqtCewu5Ys03Nq8jB8M8ZGrfb',
    'consumerSecret': 'lJAhyC3GxL61gn4Yd4eZt7eMJ50Qt0SZ97Xw2UZE4pqTX6CVLS',
    'callbackURL':  process.env.NODE_ENV === "production" ?
      'https://yasser-nightlife-app.herokuapp.com/auth/twitter/callback' :
      'http://localhost:8080/auth/twitter/callback'
  }
};
