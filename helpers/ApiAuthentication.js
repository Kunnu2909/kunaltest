require('dotenv').config();
const API_KEY = process.env.API_KEY;
module.exports = (req, res, next) => {
    const apikey = req.header("x-api-key");
    console.log(apikey);
    console.log(API_KEY);
    
    if (apikey!=API_KEY) {
      return res.status(401).json({ error: 'Api-key not valid. Unauthorised!' });
    } else next();
  };