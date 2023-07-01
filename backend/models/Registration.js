const { DataTypes } = require('sequelize');
const db = require('../database/conn')

const Student = require('./Student')
const Course = require('./Course')

const Registration = db.define('Registrations', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Students',
            key: 'id',
        },
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Courses',
            key: 'id',
        },
    },
    status: {
        type: DataTypes.CHAR(1),
        allowNull: false,
    },
})

Registration.belongsTo(Student, { foreignKey: 'student_id' })
Registration.belongsTo(Course, { foreignKey: 'course_id' })

module.exports = Registration