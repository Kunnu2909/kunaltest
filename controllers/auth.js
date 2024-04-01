const express = require('express');
const router = express.Router();
const db = require('../helpers/Connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const getUserData = require('../helpers/UserInfo');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const authOperations = {};
const dbops = require('../helpers/SqlOps');
const { validationResult } = require('express-validator');
const { getData } = require('../helpers/SqlOps');

authOperations.signup = async (req, res) => {
  console.log(req.body);
  const result = await validationResult(req);
  //console.log(result);
  if (!result.isEmpty()) {
    console.log(result);
  }
  let { username, email, password } = req.body;
  console.log(email)
  //   dbops.getData('user', 'email', email, (results) => {
  //     res.json(results);
  //   });

  //check if email exists;
  getUserData(email, (results) => {
    // console.log(results);
    if (result.length == 0) {
      return res
        .status(501)
        .json({ error: 'Email already in use', status_code: 501 });
    }
    bcrypt.hash(password, 10).then(async function (hash) {
      //  add to db;
      const data = { username, email, password: hash };
      let sql = `INSERT INTO users SET ?`;
      db.query(sql, data, (err, result) => {
        // console.log(result);

        if (err)
          return res
            .status(500)
            .json({ error: 'Could not signup', status_code: 500 });

        getData('users', 'email', email, ([result]) => {
          res.json({
            status: 'Admin account created successfully!',
            status_code: 200,
            user_id: result.uid,
          });
        });
      });
    });
  });
};

authOperations.login = (req, res) => {
  let { username, password } = req.body;

  //    verify token and password

  getUserData(username, ([result]) => {
    console.log(result);
    const { username, email } = req.body;
    //  check pass
    bcrypt.compare(password, result.password).then(async function (valid) {
      if (!valid)
        res.status(401).json({
          status: 'Incorrect Password',
          status_code: 401,
        });
      else {
        const token = jwt.sign({ username, email }, JWT_SECRET, {
          expiresIn: '10d',
        });
        res.json({
          result: 'Successfully Logged In',
          status_code: 200,
          user_id: result.id,
          access_token: token,
        });
      }
      
    });
  });
};

module.exports = authOperations;
