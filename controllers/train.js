const express = require('express');
const router = express.Router();
const db = require('../helpers/Connection');
const { getData } = require('../helpers/SqlOps');

const trainOps = {};

trainOps.createTrain = async (req, res) => {
  console.log(req.body);
  const { train_name, source, destination, seat_capacity,arrival_time_at_source,arrival_time_at_destination } = req.body;
  const sql = 'INSERT INTO trains set ?';
  const data={ train_name, source, destination, seat_capacity,arrival_time_at_source,arrival_time_at_destination }

  //   console.log(data);

 
      console.log(data);
      
      db.query(sql, data, (err, result) => {
        console.log(result);
        res.json({
          status: 'train added successfully',
          match_id:result.insertId
        });
      });
   
};


trainOps.getTrainDetails = async (req, res) => {
    const source=req.param('source');
    const destination=req.param('destination');
    console.log(req.param('source'));
    console.log(req.param('destination'));

  
    const sql_train = `select * from trains where source = '${source}' AND destination ='${destination}'`;
    db.query(sql_train, (err, results) => {
        if(err){
            console.log(err)
        }
      console.log(results);
      
      data={
        train_id:results.train_id,
        train_name:results.train_name,
        seat_capacity:results.seat_capacity
      }
  
      // const response = {};
      res.json(results);
    });
}
module.exports = trainOps;