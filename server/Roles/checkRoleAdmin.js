const path = require("path");

function checkRoleAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  } else{
    return res.redirect("/");
  }
}
  

module.exports = { checkRoleAdmin };
