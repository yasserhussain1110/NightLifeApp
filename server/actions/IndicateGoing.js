const ValidateIndicateGoingForm = require('../validators/ValidateIndicateGoingForm');

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
      res.status(400).end({
        errors: ["Not Logged In"]
      });
      return;
    }

    console.log(req.body);
    console.log(req.session.passport.user);
  }
};
