const { getUser, addUser, updateUser, deactivateUser, activateUser } = require('../services/userService')

// GET
async function get(req, res) {
    try {
        const { id } = req.query
        if (!id) {
            const users = await getUser()
            if (users.length > 0)
                return res.status(200).json(users)
            return res.status(204).json({ message: 'User not found!' })
        }
        const user = await getUser(id)
        if (user)
            return res.status(200).json(user)
        return res.status(200).json({ message: 'User not found!' })
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
        const user = await addUser(body)
        return res.status(200).json(user)
    }
    catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message ?? 'Server Error!' })
    }
}

// PUT
async function put(req, res) {
    try {

        let updatedUser = {}
        const { id, x_action } = req.query
        if (id && x_action) {
            switch (x_action) {
                case 'update_user':
                    updatedUser = await updateUser(req)
                    return res.status(200).json(updatedUser)

                case 'deactivate_user':
                    updatedUser = await deactivateUser(req)
                    return res.status(200).json(updatedUser)

                case 'activate_user':
                    updatedUser = await activateUser(req)
                    return res.status(200).json(updatedUser)


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