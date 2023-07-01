const courseModel = require('../models/Course')

async function getCourse(id) {
    if (id) {
        const course = await courseModel.findByPk(id);
        return course;
    }
    const courses = await courseModel.findAll()
    return courses;
}

async function addCourse(request) {

    const { name, description } = request

    // Verifica se o curso existe a partir do name
    const course = await courseModel.findOne({ where: { name } });
    if (course)
        throw new Error('Curso já cadastrado!');

    // Cria curso
    const status = 1
    const enrolled_students = 0
    const newCourse = await courseModel.create({
        name, description, status, enrolled_students
    })

    return { newCourse }
}

async function updateCourse(request) {
    const { id } = request.query
    const body = request.body
    const course = await courseModel.findByPk(id);
    if (!course)
        throw new Error('Curso não cadastrado!');
    await course.update(body)
    await course.save()
    return { course }
}

async function deactivateCourse(request) {
    const { id } = request.query
    const course = await courseModel.findByPk(id);
    if (!course)
        throw new Error('Curso não cadastrado!');

    if (course.status == false)
        return { message: 'Curso já está desativado!' };

    course.status = 0;
    course.update(course)
    await course.save()
    return { course }
}

async function activateCourse(request) {
    const { id } = request.query
    const course = await courseModel.findByPk(id);
    if (!course)
        throw new Error('Curso não cadastrado!');

    if (course.status == true)
        return { message: 'Curso já está ativo!' };

    course.status = 1;
    course.update(course)
    await course.save()
    return { course }
}

module.exports = { getCourse, addCourse, updateCourse, deactivateCourse, activateCourse }