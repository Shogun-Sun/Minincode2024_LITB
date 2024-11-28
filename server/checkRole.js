const path = require("path");

function checkRole(req, res, next) {
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }

//   if (req.session.user && req.session.user.role === "user") {
   
//     const allowedPathsForUser = ["/user/profile", "/user/settings"];
//     if (allowedPathsForUser.includes(req.originalUrl)) {
//       return next();  // Доступ разрешен
//     }
//   }

  if (req.session.user && req.session.user.role === "organization") {
    const allowedPathsForOrg = ["/organization/profile", "/organization/dashboard"]; 
    if (allowedPathsForOrg.includes(req.originalUrl)) {
      return next();  
    }
  }

  // Для гостей: разрешаем доступ только к определенным страницам
  if (!req.session.user) {
    const allowedPathsForGuest = ["/", "/user/log/page", "/user/reg/page"];
    if (allowedPathsForGuest.includes(req.originalUrl)) {
      return next();  // Доступ разрешен
    }
  }

  // Если путь не разрешен для текущей роли, показываем страницу отказа в доступе
  res.status(403).sendFile(path.join(__dirname, "../pages", "permissiondenied.html"));
}

module.exports = { checkRole };
