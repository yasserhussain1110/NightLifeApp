const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const SearchBars = require('./actions/SearchBars');

if (process.env.NODE_ENV === "production") {
  app.use(express.static('build'));
} else {
  require('dotenv').config();
  require('../tools/DevSetup').setupDev(app);
}

app.use(bodyParser.urlencoded({
  extended: true
}));


app.post('/api/searchBars', SearchBars.post);


app.listen(process.env.PORT || 8080);


