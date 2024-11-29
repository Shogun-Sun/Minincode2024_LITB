const path = require("path");

function checkRoleOrganization(req, res, next) {
  if (req.session.organization && req.session.organization.role === "organization") {
    return next();
  } else{
    return res.redirect("/");
  }
}
  

module.exports = { checkRoleOrganization };
