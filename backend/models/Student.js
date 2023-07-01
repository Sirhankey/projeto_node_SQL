const { DataTypes } = require('sequelize');
const db = require('../database/conn')

const Student = db.define('Students', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    registration: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  })

  module.exports = Student