const { DataTypes } = require('sequelize');
const db = require('../database/conn')
const bcrypt = require('bcrypt')

const Login = db.define('Login', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  })

  Login.beforeCreate(async (login) => {    
    const passwordHash = await bcrypt.hash(login.password, 10)  
    login.password = passwordHash
  })

  module.exports = Login