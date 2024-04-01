const express = require('express');
const router = express.Router();
const authOperations = require('../controllers/auth');
const ValidationErrorHandler = require('../helpers/ValidationErrorHandler');
const { check, checkSchema, validationResult } = require('express-validator');

router.post(
  '/signup',
  
  authOperations.signup
);
router.post(
  '/login',
  
  authOperations.login
);

module.exports = router;
