const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const patientCTRL = require('../controllers/patientProblem');
const authAdmin = require('../middleware/authAdmin');
router.post('/create',auth,  patientCTRL.createPatientProblem);
router.get('/get-all', authAdmin, patientCTRL.getPatientProblem);

module.exports = router;