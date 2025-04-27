const express = require('express')
const router = express.Router()

const recoveryCTRL = require('../controllers/recoveryCTRL')
const auth = require('../middleware/auth')
router.get('/progress/:problemId',auth, recoveryCTRL.getRecoveryProgress)
router.put('/update/:problemId', recoveryCTRL.updateRecoveryProgress)

module.exports = router