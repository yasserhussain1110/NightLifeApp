const validateSearchBarsForm = require('../validators/ValidateSearchBarsForm');

module.exports = {
  post: function(req, res) {
    var validationErrors = validateSearchBarsForm(req.body);
    if (validationErrors.length == 0) {
      console.log("Proceed");
    } else {
      console.log("nothing doin");
    }

    res.end();
  }
};
