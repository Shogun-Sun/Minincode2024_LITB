const express = require("express");
const path = require("path");
const app = express();
const router = require("./public/pageRouter");
const bodyparser = require("body-parser");
const { sequelize, User, Organization } = require("./server/database");

const hash = require("bcrypt");
const salt = hash.genSaltSync(13);

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(router);

app.post("/user/reg/data", async (req, res) => {
  const { name, surname, middle_name, email, password } = req.body;
  if (name && surname && email && password) {
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
          message: "Пользователь с такой почтой уже существует",
        });
      }

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
});

app.post("/organization/reg/data", async (req, res) => {
  const { name, email, phone, address, ogrn, password} = req.body;
  if (name && email && phone && address && ogrn && password) {
    const hash_password = hash.hashSync(password, salt);
    try {
      const email_in_table = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!email_in_table) {
        await Organization.create({
            ogrn: ogrn,
            address: address,
            email: email,
            phone: phone,
            organization_name: name,
            password: hash_password,

          });
      } else {
        return res.status(400).json({
          status: "error",
          message: "Организация уже существует",
        });
      }

      res
        .status(200)
        .json({ status: "ok", message: "Организация успешно зарегестрирована" });
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
});


app.get("/organization/get/data", async (req, res) => {
    const data = await Organization.findAll({
        where: {
            confirmed: false,
        }
    });
    res.status(200).json({status: "ok", data: data});
})

app.listen(3000, () => {
  console.log("Server запущен");
});
