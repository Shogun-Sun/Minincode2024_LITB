const { Sequelize, DataTypes, STRING } = require("sequelize");

// Подключение к базе данных PostgreSQL
const sequelize = new Sequelize(
  "postgres://minincode:minincode@193.233.114.248:5434/minincode"
);

// Определение модели User
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    surname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    middle_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "user",
      validate: {
        isIn: [["guest", "user", "organization", "admin"]],
      }
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

//Определении модели Организаций
const Organization = sequelize.define(
  "Organization",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ogrn: {
      type: DataTypes.STRING(24),
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    organization_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, 
    },
    work_time: {
      type: DataTypes.STRING(255),
      allowNull: false,

    }
  },
  {
    tableName: "organizations",
    timestamps: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Подключение успешно");
    User.sync();
    Organization.sync();
  })
  .catch((error) => {
    console.log("Ошибка при подключении:", error);
  });

module.exports = { User, Organization, sequelize };
