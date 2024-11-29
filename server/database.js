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
        isIn: [["user", "admin"]],
      }
    },
    session: {
      type: DataTypes.STRING(255), 
      allowNull: true, 
      defaultValue: null, 
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
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'organization',
    },
  },
  {
    tableName: "organizations",
    timestamps: false,
  }
);

const Section = sequelize.define('Section', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  section_name: {
    type: DataTypes.STRING(255), 
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT, 
    allowNull: true, 
  },
  days: {
    type: DataTypes.STRING(255), 
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  organization_id: {
    type: DataTypes.INTEGER, 
    allowNull: false,
  },
  registered_users: {
    type: DataTypes.JSONB, 
    allowNull: true, 
    defaultValue: []
  },
}, {
  tableName: 'sections', 
  timestamps: false, 
});

// Устанавливаем соединение с базой данных и синхронизируем модели
sequelize
  .authenticate()
  .then(() => {
    console.log("Подключение успешно");
    User.sync();
    Organization.sync();
    Section.sync();
  })
  .catch((error) => {
    console.log("Ошибка при подключении:", error);
  });

module.exports = { User, Organization, Section, sequelize };
