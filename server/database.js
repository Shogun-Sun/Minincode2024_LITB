const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize("postgres://minincode:minincode@193.233.114.248:5434/minincode");


const User = sequelize.define(
    'User',
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
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log("Подключение успешно");
        return User.sync({alter: true});
    })
    .catch((error) => {
        console.log(error);
    })