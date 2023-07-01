const userModel = require('../models/User')
const loginModel = require('../models/Login')
const studentModel = require('../models/Student')
const sequelize = require('../database/conn');
const { ROLES } = require('../helper/constantes');


async function getUser(id) {
    if (id) {
        const user = await userModel.findByPk(id);
        const { student_id } = user.dataValues
        if (student_id) {
            const student = await studentModel.findOne({ where: { student_id } });
            user.registration = student.registration
        }
        return user;
    }
    const users = await userModel.findAll()
    return users;
}

async function addUser(user) {
    const t = await sequelize.transaction();

    try {
        const { role, name, birth_date, phoneNumber, adress, email, password } = user

        // Verifica se login existe a partir do email
        const login = await loginModel.findOne({ where: { email } });
        if (login)
            throw new Error('Usuário já cadastrado!');

        // Cria login
        const newLogin = await loginModel.create({
            email, password
        }, { transaction: t })
        const login_id = newLogin.id

        // Cria student
        let student_id = null
        if (role === ROLES.STUDENT) {
            const count = await studentModel.count()
            const registration = await generateRegistration(count)
            const newStudent = await studentModel.create({
                registration
            }, { transaction: t })
            student_id = newStudent.id
        }

        // Cria usuario
        const status = 1
        const newUser = await userModel.create({
            login_id, student_id, role, name, birth_date, phoneNumber, adress, status, email, password
        }, { transaction: t })

        // Commit da transação
        await t.commit();

        return { newUser }

    } catch (error) {
        // Rollback da transação em caso de erro
        await t.rollback();
        throw error;
    }

}

async function updateUser(request) {
    const { id } = request.query
    const body = request.body
    const user = await userModel.findByPk(id);
    if (!user)
        throw new Error('Usuário não cadastrado!');
    await user.update(body)
    await user.save()
    return { user }
}

async function deactivateUser(request) {
    const { id } = request.query
    const user = await userModel.findByPk(id);
    if (!user)
        throw new Error('Usuário não cadastrado!');

    if (user.status == false)
        return { message: 'Usuário já está desativado!' };

    user.status = 0;
    user.update(user)
    await user.save()
    return { user }
}

async function activateUser(request) {
    const { id } = request.query
    const user = await userModel.findByPk(id);
    if (!user)
        throw new Error('Usuário não cadastrado!');

    if (user.status == true)
        return { message: 'Usuário já está ativo!' };

    user.status = 1;
    user.update(user)
    await user.save()
    return { user }
}


async function generateRegistration(count) {
    // registration = 2025020001
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const semester = currentMonth < 6 ? '01' : '02';
    const count_ = count.toString().padStart(4, '0');
    return `${currentYear}${semester}${count_}`;
}

module.exports = { getUser, addUser, updateUser, deactivateUser, activateUser }


