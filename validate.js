// validate.js
function validateName(name) {
  return name.trim() !== "" && !/^\d+$/.test(name);
}

function validatePassword(pw) {
  return /^(?=.*[a-zA-Z])(?=.*[0-9]).{10,}$/.test(pw);
}

function validateID(id) {
  return /^\d{3}-?\d{3}-?\d{3}-?\d{3}$/.test(id);
}

module.exports = { validateName, validatePassword, validateID };
