const path = require("path");

function checkRole(req, res, next) {
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }

  if (req.session.user && req.session.user.role === "user") {
   
    const allowedPathsForUser = ["/user/profile", "/user/settings"];
    if (allowedPathsForUser.includes(req.originalUrl)) {
      return next();  
    }
  }

  if (req.session.user && req.session.user.role === "organization") {
    const allowedPathsForOrg = ["/organization/profile", "/organization/dashboard"]; 
    if (allowedPathsForOrg.includes(req.originalUrl)) {
      return next();  
    }
  }

  if (!req.session.user) {
    const allowedPathsForGuest = ["/", "/user/reg/page"];
    if (allowedPathsForGuest.includes(req.originalUrl)) {
      return next();  
    }
  }


  res.status(403).sendFile(path.join(__dirname, "../pages", "permissiondenied.html"));
}

module.exports = { checkRole };
