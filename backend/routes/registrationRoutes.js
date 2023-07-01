const express = require('express')
const router = express.Router()

const registrationController = require('../controllers/registrationController')
const { isAdmin } = require('../middleware/permissions')

router.get(
    '/',
    isAdmin(),
    registrationController.get
)

router.post(
    '/',
    isAdmin(),
    registrationController.post
)

router.put(
    '/',
    isAdmin(),
    registrationController.put
)


module.exports = router;



