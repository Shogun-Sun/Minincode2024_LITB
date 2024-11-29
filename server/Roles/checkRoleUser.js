const path = require("path");

function checkRoleUser(req, res, next) {
  if (req.session.user && req.session.user.role === "user") {
    return next();
  } else{
    return res.redirect("/");
  }
}
module.exports = { checkRoleUser };
