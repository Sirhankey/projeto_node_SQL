const { getRegistration, addRegistration, findRegistration, deactivateRegistration, activateRegistration } = require('../services/registrationService')

// GET
async function get(req, res) {
    try {
        const { user } = req
        const { id } = req.query
        const { student_id, course_id } = req.query
        let registrations = null

        if (user.isAdmin) {
            if (student_id && !registrations)
                registrations = await findRegistration('student_id', student_id);
            if (course_id && !registrations)
                registrations = await findRegistration('course_id', course_id);
            if (!id && !registrations)
                registrations = await getRegistration()
            if (!registrations)
                registrations = await getRegistration(id)
        } else {
            registrations = await findRegistration('student_id', user.student_id);
        }
        return res.status(200).json(registrations)
    }
    catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Server Error' })
    }
}

// POST
async function post(req, res) {
    const { user } = req
    const body = { ...req.body }
    try {
        if (user.isAdmin) {
            const registration = await addRegistration(body)
            return res.status(200).json(registration)
        } else {
            body.student_id = user.student_id
            const registration = await addRegistration(body)
            return res.status(200).json(registration)
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message ?? 'Server Error!' })
    }
}

// PUT
async function put(req, res) {
    try {

        let updatedRegistration = {}
        const { id, x_action } = req.query
        if (id && x_action) {
            switch (x_action) {
                // case 'update_registration':
                //     updatedRegistration = await updateRegistration(req)
                //     return res.status(200).json(updatedRegistration)

                case 'deactivate_registration':
                    updatedRegistration = await deactivateRegistration(req)
                    return res.status(200).json(updatedRegistration)

                case 'activate_registration':
                    updatedRegistration = await activateRegistration(req)
                    return res.status(200).json(updatedRegistration)


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