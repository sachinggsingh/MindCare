const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const problemCTRL = require('../controllers/problemCTRL')

router.post('/create',auth, problemCTRL.createProblem)
router.get('/get-all', problemCTRL.getAllProblems)
router.get('/get/:userId', problemCTRL.getProblemById)

module.exports = router