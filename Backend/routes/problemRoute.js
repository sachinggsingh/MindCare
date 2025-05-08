const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const problemCTRL = require('../controllers/problemCTRL')

router.post('/create',auth, problemCTRL.createProblem)
router.get('/get-all',authAdmin, problemCTRL.getAllProblems)
router.get('/get/:userId', authAdmin, problemCTRL.getProblemById)

module.exports = router