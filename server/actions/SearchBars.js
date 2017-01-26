const validateSearchBarsForm = require('../validators/ValidateSearchBarsForm');
const mongo = require('mongodb').MongoClient;
const requestYelp = require('../yelp');

const dbUrl = process.env.DATABASE_URL;

module.exports = {
  post: function (req, res) {
    var validationErrors = validateSearchBarsForm(req.body);

    if (validationErrors.length !== 0) {
      console.log(validationErrors);
      res.status(400).end({
        errors: validationErrors
      });
      return;
    }

    req.session.location = req.body.location;

    findBars(req.body.location, res);
  }
};

function extractRelevantInfoFromBar(bar) {
  return {
    id: bar.id,
    name: bar.name,
    image_url: bar.image_url,
    snippet_text: bar.snippet_text,
    url: bar.url
  }
}

function Responder(db, res, totalBars) {
  var db = db;
  var res = res;
  var totalBars = totalBars;
  var bars = [];
  this.success = function (bar) {
    bars.push(bar);
    totalBars--;
    if (totalBars === 0) {
      this.sendListOfBarsToUI();
    }
  };

  this.sendListOfBarsToUI = function () {
    db.close();
    res.json({
      bars: bars
    });
  };

  this.failure = function (err) {
    db.close();
    err = err || {errors: ["Some Error Happened"]};
    res.status(500).end(err);
  };
}

function yelpGaveNewBar(responder, barsCollection, yelpBar) {
  var bar = extractRelevantInfoFromBar(yelpBar);
  bar.numberOfGoers = 0;
  barsCollection.insert({id: bar.id, goers: []}, function (err, data) {
    if (!err) {
      responder.success(bar);
    } else if (err.code === 11000) {
      console.log("Bar exists");
      responder.failure(err);
    } else {
      console.log("Weird Situation");
      responder.failure();
    }
  });
}

function yelpGaveOldBar(responder, yelpBar, dbBarInfo) {
  var bar = extractRelevantInfoFromBar(yelpBar);
  bar.numberOfGoers = dbBarInfo.goers.length;
  responder.success(bar);
}

function yelpSuccessCallBack(res, yelpBars) {
  mongo.connect(dbUrl, function (err, db) {
    const barsCollection = db.collection("bars");
    var responder = new Responder(db, res, yelpBars.length);
    yelpBars.forEach(function (yelpBar) {
      barsCollection.find({id: yelpBar.id}).toArray(function (err, results) {
        if (results.length === 0) {
          yelpGaveNewBar(responder, barsCollection, yelpBar);
        } else {
          yelpGaveOldBar(responder, yelpBar, results[0]);
        }
      });
    });
  });
}

function yelpFailureCallBack(res, err) {
  var errorObj = JSON.parse(err.data);
  var error = errorObj.error.text;
  res.status(err.statusCode).send({
    errors: [error]
  });
}


function findBars(location, res) {
  requestYelp(location, yelpSuccessCallBack.bind(null, res), yelpFailureCallBack.bind(null, res));
}
