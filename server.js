const express = require("express");
const path = require("path"); 
const app = express();
const router = require("./public/pageRouter");
const bodyparser = require("body-parser");
const {sequelize, User} = require("./server/database");

const hash = require("bcrypt");
const salt = hash.genSaltSync(13);

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(router);



app.post("/user/reg/data", async (req,res) => {
    const {name, surname, middle_name, email, password} = req.body;
    if (name, surname, email, password) {
        const hash_password = hash.hashSync(password, salt);
        try {
          const email_in_table = await User.findOne({
            where: {
              email: email,
            },
          });
    
          if (!email_in_table) {
            await User.create({
              surname: surname,
              name: name,
              middle_name: middle_name,
              email: email,
              password: hash_password,
            });
          } else {
            return res.status(400).json({
              status: "error",
              message: "Пользователь ",
            });
          }
    
          const id = await User.findOne({ where: { username: username }});
          const avatar_img_path = path.join(__dirname, "users_data", "avatar.jpg");
          const img_user_path = path.join(
            __dirname,
            "users_data",
            `${id.id}.jpg`
          );
          fs.copyFileSync(avatar_img_path, img_user_path);
          res
            .status(200)
            .json({ status: "ok", message: "Вы успешно зарегистрированы" });
        } catch (err) {
          console.log(err);
          if (err.name === "SequelizeValidationError") {
            res.status(400).json({
              status: "error",
              message: "Ошибка валидации: Проверьте введенные данные",
            });
          } else if (err.name === "SequelizeDatabaseError") {
            res.status(400).json({
              status: "error",
              message: "значение превышает максимально допустимую длину",
            });
          } else {
            res
              .status(500)
              .json({ status: "error", message: "Произошла неизвестная ошибка" });
          }
        }
      } else {
        res
          .status(400)
          .json({ status: "error", message: "Вы ввели не все данные" });
      }

})

app.listen(3000, () => {
    console.log("Server запущен");
});
