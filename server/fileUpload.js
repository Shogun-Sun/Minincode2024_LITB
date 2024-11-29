const multer = require("multer");  // Подключаем библиотеку multer для обработки загрузки файлов
const path = require("path");  // Подключаем модуль path для работы с путями файлов
const fs = require("fs");  // Подключаем модуль fs для работы с файловой системой

/**
 * Настройка хранилища для файлов
 * Здесь мы указываем, куда будут сохраняться загруженные файлы и как они будут называться.
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Указываем путь, куда будут сохраняться файлы
    const dataSavePath = path.join(__dirname, "../users_data/");

    // Используем callback для передачи пути сохранения файла
    cb(null, dataSavePath); 
  },
  filename: (req, file, cb) => {
    // Проверяем, есть ли сессия пользователя, если нет, выводим ошибку
    if (!req.session || !req.session.user) {
      return cb(new Error("Сессия не определена. Пожалуйста, выполните вход."));
    }

    // Получаем идентификатор пользователя из сессии
    const userId = req.session.user.id;

    // Устанавливаем имя файла как идентификатор пользователя и расширение .jpg
    cb(null, `${userId}.jpg`);
  },
});

/**
 * Фильтрация типов файлов
 * Мы проверяем, что тип загружаемого файла соответствует разрешенным.
 */
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  
  // Проверяем, если тип файла разрешен, то пропускаем его, иначе выдаем ошибку
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);  
  } else {
    cb(new Error("Недопустимый тип файла. Разрешены только изображения (JPEG, PNG, GIF)."), false);  
  }
};

/**
 * Настройка multer
 * Здесь мы объединяем хранилище, фильтрацию и лимит на размер файла.
 */
const upload = multer({ 
  storage: storage,  
  fileFilter: fileFilter, 
  limits: {
    fileSize: 1 * 1024 * 1024,  // Ограничиваем размер файла до 1 МБ
  },
});

module.exports = upload;  
