// const path = require("path");
// function checkRole(req, res, next) {
//     if (req.session.user && req.session.user.role === "admin") {
//       return next();
//     } else {
//       return res.status(403).sendFile(path.join(__dirname, "../pages", "access_denied.html"));
//     }
//   }

//   module.exports = {checkRole};