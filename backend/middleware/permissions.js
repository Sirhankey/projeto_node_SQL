const { ROLES } = require('../helper/constantes');
const userModel = require('../models/User')

function can(permissionsRoutes) {
    return async (request, response, next) => {
        const { login_id } = request.user;

        if (!login_id)
            return response.status(401).end();

        const user = await userModel.findOne({
            where: { login_id }
        });;

        if (!user) {
            return response.status(400).json('Usuário não existe!');
        }

        if (!permissionsRoutes.includes(user.role)) {
            return response.status(401).end().json('Usuário não tem permissão!');
        }

        return next();
    };
}

function isAdmin() {
    return async (request, response, next) => {
        const { login_id } = request.user;

        if (!login_id)
            return response.status(401).end();

        const user = await userModel.findOne({
            where: { login_id: login_id }
        });;

        if (!user) {
            return response.status(400).json('Usuário não existe!');
        }

        request.user.isAdmin = user.role === ROLES.ADMIN
        request.user.user_id = user.id
        request.user.student_id = user.student_id

        return next();
    };
}


module.exports = { can, isAdmin };
