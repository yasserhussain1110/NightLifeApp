function validate(form) {
  errors = [];
  if (!form.barId || !form.barId.trim()) {
    errors.push('Bar ID cannot be empty');
  }

  return errors;
}

module.exports = validate;
