
var mysql = require('mysql2');
var db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'Singapore123#',
   database: 'demo',
});

db.connect(function (err) {
   if (err) throw err;
   console.log('Connected!');
});

module.exports = db;
