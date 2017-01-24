function validate(form) {
  errors = [];
  if (!form.term || !form.term.trim()) {
    errors.push('Search Term cannot be empty');
  }

  return errors;
}

module.exports = validate;
