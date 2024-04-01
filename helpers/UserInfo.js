const db = require('../helpers/Connection');

module.exports = getUserData = async (username, callback) => {
  const inserts = [username];
  //   const sql = `select * from user where email = ` + db.escape(email);
  let sql = 'select * from users where username = ?';
  sql = db.format(sql, inserts);

  //   console.log(sql);

  db.query(sql, (err, results) => {
    if (err) throw err;
    callback(results);
  });
};
