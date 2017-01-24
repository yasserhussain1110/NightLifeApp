function validate(form) {
  errors = [];
  if (!form.location || !form.location.trim()) {
    errors.push('Search Term cannot be empty');
  }

  return errors;
}

module.exports = validate;
