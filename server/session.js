const session = require("express-session");  // Подключаем модуль для работы с сессиями в Express
const FileStore = require("session-file-store")(session);  // Подключаем хранилище сессий, использующее файлы для сохранения данных сессий

// Настройка сессии
const sessionData = session({
    secret: "0d2f999767cd77da792fab7105d2fdebc760472dfc3587d4ee98e33b8ab6081b",  // Секретный ключ для шифрования идентификаторов сессий
    store: new FileStore(),  // Используем хранилище сессий на основе файлов
    resave: false,  
    saveUninitialized: false,
    cookie: {
        secure: false, 
    }
});

module.exports = sessionData;  