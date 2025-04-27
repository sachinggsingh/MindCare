const express = require('express')
const router = express.Router()

const userCTRL = require('../controllers/userCTRL')

router.post('/register', userCTRL.register)
router.post('/login', userCTRL.login)
router.post('/logout', userCTRL.logout)

router.put('/edit/:id', userCTRL.editProfile)

module.exports = router;