const express = require('express');
const router = express.Router();
const authOperations = require('../controllers/auth');
const trainOps = require('../controllers/train');
const ValidationErrorHandler = require('../helpers/ValidationErrorHandler');
const { check, checkSchema, validationResult } = require('express-validator');
const AuthChecker = require('../helpers/AuthChecker');
const ApiAuthentication=require('../helpers/ApiAuthentication');

// router.get('/get', trainOps.getMatches);
// router.get('/:match_id', matchOps.getMatchDetails);
router.post('/create',ApiAuthentication , trainOps.createTrain);
router.get('/availability',trainOps.getTrainDetails);

module.exports = router;