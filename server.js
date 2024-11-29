const express = require("express");
const path = require("path");
const app = express();
const router = require("./public/pageRouter");
const bodyparser = require("body-parser");
const { sequelize, User, Organization, Section } = require("./server/database");
const session = require("./server/session");
const fs = require("fs");
const upload = require("./server/fileUpload");

const hash = require("bcrypt");
const salt = hash.genSaltSync(13);

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(session);
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

      const id = await User.findOne({ where: { email: email }});
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
});

app.post("/user/log/data", async (req, res) => {
  const { email, password } = req.body;
  if (req.session.user || req.session.organization) {
    return res
      .status(400)
      .json({ status: "error", message: "Пользователь уже авторизован" });
  }
  if (email && password) {
    try {
      const user = await User.findOne({
        where: { email: email },
      });

      console.log(user.id);

      if (!user) {
        return res
          .status(400)
          .json({ status: "error", message: "Неверный email или пароль" });
      }

      const isMath = hash.compareSync(password, user.password);
      if (isMath) {
        req.session.user = {
          id: user.id,
          surname: user.surname,
          name: user.name,
          middle_name: user.middle_name,
          email: user.email,
          role: user.role,
        };
        res.status(200).json({ status: "ok", message: "Успешный вход" });
      } else {
        return res
          .status(400)
          .json({ status: "error", message: "Неверный email или пароль" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "error", message: "Произошла неизвестная ошибка" });
    }
  } else {
    res
      .status(400)
      .json({ status: "error", message: "Вы ввели не все данные" });
  }
});

app.post("/organization/log/data", async (req, res) => {
    const {email, password} = req.body;
    if (req.session.organization || req.session.user) {
        return res
          .status(400)
          .json({ status: "error", message: "Организация уже авторизована" });
      }
    if(email && password){
        try {
            const organization = await Organization.findOne({
              where: { email: email,  confirmed: true},
            });
      
            if (!organization) {
              return res
                .status(400)
                .json({ status: "error", message: "Неверный email или пароль" });
            }
      
            const isMath = hash.compareSync(password, organization.password);
            if (isMath) {
              req.session.organization = {
                ogrn: organization.ogrn,
                address: organization.address,
                email: organization.email,
                phone: organization.phone,
                organization_name: organization.organization_name,       
                role: organization.role,         
              }
              res.status(200).json({ status: "ok", message: "Успешный вход" });
            } else {
              return res
                .status(400)
                .json({ status: "error", message: "Неверный email или пароль" });
            }
          } catch (error) {
            console.error(error);
            res
              .status(500)
              .json({ status: "error", message: "Произошла неизвестная ошибка" });
          }
    } else{
        res.status(400).json({status: "error", message: "Вы ввели не все данные"});
    }
})

app.post("/organization/reg/data", async (req, res) => {
  const { name, email, phone, address, ogrn, password } = req.body;
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

      res.status(200).json({
        status: "ok",
        message: "Организация успешно зарегестрирована",
      });
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

app.get("/organization/getunverified/data", async (req, res) => {
  const data = await Organization.findAll({
    where: {
      confirmed: false,
    },
  });
  res.status(200).json({ status: "ok", data: data });
});
app.put("/organization/getunverified/update", async (req, res) => {
  const { ogrn } = req.body;

  try {
    const organization = await Organization.update(
      { confirmed: true },
      {
        where: { ogrn: ogrn },
      }
    );

    if (organization[0] === 0) {
      return res.status(400).json({ message: "Организация не найдена" });
    }

    res.status(200).json({ message: "Статус обновлен" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при обновлении" });
  }
});
app.delete("/organization/getverified/delete", async (req, res) => {
  const { ogrn } = req.body;

  try {
    const organization = await Organization.destroy({
      where: {
        ogrn: ogrn,
      },
    });

    if (organization) {
      return res.status(200).json({ message: "Организация успешно удалена" });
    } else {
      return res.status(400).json({ message: "Организация не найдена" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Произошла неизвестная ошибка" });
  }
});
app.get("/organization/getverified/data", async (req, res) => {
  const data = await Organization.findAll({
    where: {
      confirmed: true,
    },
  });
  res.status(200).json({ status: "ok", data: data });
});


app.post("/profile/upload/avatar", upload.single("avatar"), (req, res) => {
    if (req.file) {
      res.status(200).json({ status: "ok", message: "аватар успешно загружен!" });
    } else {
      res.status(400).json({
        status: "error",
        message: "Ошибка загрузки аватара, попробуйте еще раз",
      });
    }
  });
app.get("/user/get/data", (req, res) => {
  if (req.session.user) {
    const avatar = path.join(
        __dirname,
        "users_data",
        `${req.session.user.id}.jpg`
      );
      const data_avatar = fs.readFileSync(avatar);
      const avatarbase64 = `data:image/jpeg;base64,${data_avatar.toString("base64")}`;
    const data = {
      surname: req.session.user.surname,
      name: req.session.user.name,
      middle_name: req.session.user.middle_name,
      email: req.session.user.email,
      role: req.session.user.role,
      avatar: avatarbase64,
    };
    res.status(200).json({ data: data });
  } else {
    res.status(400).json({ status: "error", message: "Вы не авторизовались" });
  }
});
app.get("/organization/get/data", (req, res) => {
    if(req.session.organization){
        const data = {
                ogrn: req.session.organization.ogrn,
                address: req.session.organization.address,
                email: req.session.organization.email,
                phone: req.session.organization.phone,
                organization_name: req.session.organization.organization_name,     
                role: req.session.organization.role           
          };
          res.status(200).json({ data: data });
    } else {
      res.status(400).json({ status: "error", message: "Вы не авторизовались" });
    }
})

app.post("/sections/create", async (req, res) => {
  const { name, description, days, times, organization_id} = req.body;
  console.log(name, description, days, times, organization_id);
  
  try {
    await Section.create({
      section_name: name,
      description: description,
      days: days,
      time: times,
      organization_id: organization_id,
      
    })
  } catch(err) {
    console.log(err);
  }
})

app.listen(3000, () => {
  console.log("Server запущен");
});