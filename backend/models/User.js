const { DataTypes } = require('sequelize');
const db = require('../database/conn')

const Login = require('./Login')
const Student = require('./Student')

const User = db.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    login_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'Login',
            key: 'id',
        },
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
        references: {
            model: 'Students',
            key: 'id',
        },
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birth_date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
})

User.belongsTo(Login, { foreignKey: 'login_id' })
User.belongsTo(Student, { foreignKey: 'student_id' })

module.exports = User