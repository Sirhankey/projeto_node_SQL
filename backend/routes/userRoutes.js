const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { can } = require('../middleware/permissions')

router.get(
    '/',
    can(["Admin"]),
    userController.get
)
router.post(
    '/',
    can(["Admin"]),
    userController.post
)
router.put(
    '/',
    can(["Admin"]),
    userController.put
)

module.exports = router;



