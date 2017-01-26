const ValidateIndicateGoingForm = require('../validators/ValidateIndicateGoingForm');
const mongo = require('mongodb').MongoClient;

const dbUrl = process.env.DATABASE_URL;

module.exports = {
  post: function (req, res) {
    var validationErrors = ValidateIndicateGoingForm(req.body);
    if (validationErrors.length !== 0) {
      console.log(validationErrors);
      res.status(400).json({
        errors: validationErrors
      });
      return;
    }

    if (!req.session.passport.user) {
      req.session.barId = req.body.barId;
      res.status(400).json({
        errors: ["Not Logged In"]
      });
      return;
    }
    indicateGoing(res, req.body.barId, req.session.passport.user);
  }
};

function insertUserIfNotAlreadyGoing(bar, barsCollection, userId) {
  let goers = bar.goers;
  if (goers.indexOf(userId) === -1) {
    let newGoersList = [...goers, userId];
    let newNumberOfGoers = newGoersList.length;
    barsCollection.update(
      {id: bar.id},
      {
        $set: {
          goers: newGoersList
        }
      });
    return newNumberOfGoers;
  } else {
    return goers.length;
  }
}

function indicateGoing(res, barId, userId) {
  mongo.connect(dbUrl, function (err, db) {
    const barsCollection = db.collection("bars");
    barsCollection.find({id: barId}).toArray(function (err, results) {
      if (results.length === 0) {
        res.status(404).json({
          errors: ["No such bar"]
        });
        db.close();
        return;
      }
      let bar = results[0];
      let newNumberOfGoers = insertUserIfNotAlreadyGoing(bar, barsCollection, userId);
      sendNewNumberOfGoers(res, newNumberOfGoers);
      db.close();
    });
  });
}

function sendNewNumberOfGoers(res, newNumberOfGoers) {
  res.json({
    numberOfGoers: newNumberOfGoers
  });
}
