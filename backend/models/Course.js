const { DataTypes } = require('sequelize');
const db = require('../database/conn')

const Course = db.define('Courses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    enrolled_students: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

module.exports = Course