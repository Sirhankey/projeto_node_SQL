const express = require('express')
const router = express.Router()

const courseController = require('../controllers/courseController')
const { can, isAdmin } = require('../middleware/permissions')

router.get(
    '/',
    isAdmin(),
    courseController.get
)

router.post(
    '/',
    isAdmin(),
    can(["Admin"]),
    courseController.post
)

router.put(
    '/',
    isAdmin(),
    can(["Admin"]),
    courseController.put
)

module.exports = router;



