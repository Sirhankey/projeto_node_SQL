const registrationModel = require('../models/Registration')
const userModel = require('../models/User')
const courseModel = require('../models/Course');
const { STUDENTS, REGISTRATION_STATUS } = require('../helper/constantes');

async function getRegistration(id) {
    if (id) {
        const registration = await registrationModel.findByPk(id);
        return registration;
    }
    const registrations = await registrationModel.findAll()
    return registrations;
}

async function addRegistration(request) {

    const { student_id, course_id } = request

    // Verifica se a inscriçãao já foi feita
    const registration = await registrationModel.findOne({
        where: {
            student_id,
            course_id
        }
    });
    if (registration)
        throw new Error('Inscrição já realizada!');

    // Verifica se user existe
    const user = await userModel.findOne({
        where: { student_id }
    });
    if (!user)
        throw new Error('Usuário não cadastrado!');

    // Verifica se course existe
    const course = await courseModel.findOne({
        where: { id: course_id }
    });
    if (!course)
        throw new Error('Curso não cadastrado!');

    // Cria Inscrição
    const status = REGISTRATION_STATUS.ACTIVE

    // Número máximo de alunos por turma
    if (course.dataValues.enrolled_students === STUDENTS.MAX) {
        return res.status(400).json({ message: 'Vagas esgotadas!' })
    }

    course.increment('enrolled_students')
    await course.save()

    const newRegistration = await registrationModel.create({
        student_id, course_id, status
    })

    return { newRegistration }
}

// Consulta findOne com cláusula where usando variável
const findRegistration = async (fieldName, value) => {
    try {
        const whereClause = {};
        whereClause[fieldName] = value;

        const registration = await registrationModel.findAll({
            where: whereClause
        });

        return { registration }

    } catch (error) {
        console.error('Erro ao consultar o registro:', error);
    }
};

async function deactivateRegistration(request) {
    const { id } = request.query
    const registration = await registrationModel.findByPk(id);
    if (!registration)
        throw new Error('Inscrição não cadastrada!');

    if (registration.status == false)
        return { message: 'Inscrição já está desativada!' };

    const course = await courseModel.findOne({
        where: {
            id: registration.course_id
        }
    });
    if (!course)
        throw new Error('Curso não cadastrado!');

    course.decrement('enrolled_students')
    await course.save()

    registration.status = REGISTRATION_STATUS.DEACTIVE;
    registration.update(registration)
    await registration.save()

    return { registration }
}

async function activateRegistration(request) {
    const { id } = request.query
    const registration = await registrationModel.findByPk(id);
    if (!registration)
        throw new Error('Inscrição não cadastrado!');

    if (registration.status == true)
        return { message: 'Inscrição já está ativo!' };

    // Verifica se course existe
    const course = await courseModel.findOne({
        where: { id: registration.course_id }
    });
    if (!course)
        throw new Error('Curso não cadastrado!');

    // Número máximo de alunos por turma
    if (course.dataValues.enrolled_students === STUDENTS.MAX) {
        return res.status(400).json({ message: 'Vagas esgotadas!' })
    }

    course.increment('enrolled_students')
    await course.save()

    registration.status = REGISTRATION_STATUS.ACTIVE;
    registration.update(registration)
    await registration.save()
    return { registration }
}

module.exports = { getRegistration, addRegistration, deactivateRegistration, activateRegistration, findRegistration }