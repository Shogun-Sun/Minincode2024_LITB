const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * Настройка хранилища для файлов
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dataSavePath = path.join(__dirname, "../../users_data/");
    cb(null, dataSavePath); 
  },
  filename: (req, file, cb) => {

    if (!req.session || !req.session.user) {
      return cb(new Error("Сессия не определена. Пожалуйста, выполните вход."));
    }

    const userId = req.session.user.id;

    cb(null, `${userId}.jpg`);
  },
});

/**
 * Фильтрация типов файлов
 */
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(new Error("Недопустимый тип файла. Разрешены только изображения (JPEG, PNG, GIF)."), false);
  }
};

/**
 * Настройка multer
 */
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1 * 1024 * 1024, 
  },
});

module.exports = upload;