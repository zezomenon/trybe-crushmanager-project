const hasAuthorization = require('./tokenAuthorization');
const validateDateAndRate = require('./validateDateAndRate');
const validateNameAndAge = require('./validateNameAndAge');

module.exports = {
  hasAuthorization,
  validateDateAndRate,
  validateNameAndAge,
};
