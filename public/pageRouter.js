const express = require("express");  // Импортируем библиотеку express для работы с веб-сервером
const path = require("path");  // Импортируем модуль path для работы с путями
const router = express.Router();  // Создаем роутер для обработки маршрутов
const {checkRoleAdmin} = require("../server/Roles/checkRoleAdmin");  // Импортируем функцию для проверки роли администратора
const {checkRoleUser} = require("../server/Roles/checkRoleUser");  // Импортируем функцию для проверки роли пользователя
const {checkRoleOrganization} = require("../server/Roles/checkRoleOrganization");  // Импортируем функцию для проверки роли организации

// Главная страница
router.get("/",  (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "home.html"));  
});

// Страница регистрации пользователя
router.get("/user/reg/page",  (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "reguser.html"));  
});

// Страница входа пользователя
router.get("/user/log/page",   (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "loginuser.html"));  
});

// Страница регистрации организации (только для администраторов)
router.get("/organization/reg/page", checkRoleAdmin,  (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "regorg.html"));  
});

// Страница организации (доступна только для пользователей)
router.get("/organization/page", checkRoleUser, (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "orgpages.html"));  
});

// Страница модерации организаций (только для администраторов)
router.get("/moderationorg", checkRoleAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "moderationorg.html"));  
});

// Страница профиля пользователя (только для пользователей)
router.get("/user/profile", checkRoleUser,  (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "profile.html"));  
})

// Страница создания секции для организации (только для организаций)
router.get("/organization/createsection", checkRoleOrganization, (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "createsection.html"));  
})

// Экспортируем роутер для использования в основном приложении
module.exports = router;
