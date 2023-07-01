const { getCourse, addCourse, updateCourse, deactivateCourse, activateCourse } = require('../services/courseService')
const { STUDENTS, REGISTRATION_STATUS } = require('../helper/constantes')
// GET
async function get(req, res) {
    try {
        const { user } = req
        const { id } = req.query

        if (!user.isAdmin) {
            const courses = await getCourse()
            const filteredCourses = courses.filter(
                course =>
                    course.enrolled_students <= STUDENTS.MAX &&
                    course.status === true
            );
            return res.status(200).json(filteredCourses)
        }

        if (!id) {
            const courses = await getCourse()
            return res.status(200).json(courses)
        }
        const course = await getCourse(id)
        return res.status(200).json(course)
    }
    catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Server Error' })
    }
}

// POST
async function post(req, res) {
    try {
        const body = { ...req.body }
        const course = await addCourse(body)
        return res.status(200).json(course)
    }
    catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message ?? 'Server Error!' })
    }
}

// PUT
async function put(req, res) {
    try {

        let updatedCourse = {}
        const { id, x_action } = req.query
        if (id && x_action) {
            switch (x_action) {
                case 'update_course':
                    updatedCourse = await updateCourse(req)
                    return res.status(200).json(updatedCourse)

                case 'deactivate_course':
                    updatedCourse = await deactivateCourse(req)
                    return res.status(200).json(updatedCourse)

                case 'activate_course':
                    updatedCourse = await activateCourse(req)
                    return res.status(200).json(updatedCourse)


                default:
                    return res.status(400).json({ "message": "X_ACTION inválido" });
            }

        }
        return res.status(400).json({ "message": "X_ACTION não informado!" });
    }
    catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message ?? 'Server Error!' })
    }
}


module.exports = {
    get, post, put
};