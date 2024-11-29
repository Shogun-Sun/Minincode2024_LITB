const path = require("path");

function checkRoleGuest(req, res, next) {
  if (req.session.user) {
    return next();
  } 
}
module.exports = { checkRoleGuest };
