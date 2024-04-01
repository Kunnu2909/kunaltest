var express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const trainRoutes = require('./train');
const authOperations = require('../controllers/auth');


router.post(
    '/signup',
    
    authOperations.signup
  );
router.post(
    '/login',
    
    authOperations.login
);
//router.use('/admin', authRoutes);

router.use('/trains', trainRoutes);


module.exports = router;
