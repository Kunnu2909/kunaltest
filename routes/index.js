var express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const trainRoutes = require('./train');
const teamRoutes = require('./teams');
const teamOps = require('../controllers/teams');
const authOperations = require('../controllers/auth');

router.get('/players/:player_id/stats', teamOps.getPlayerStats);
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
router.use('/teams', teamRoutes);

module.exports = router;
