const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const patientCTRL = require('../controllers/patientProblem');

router.post('/create',auth,  patientCTRL.createPatientProblem);
router.get('/get-all',  patientCTRL.getPatientProblem);

module.exports = router;