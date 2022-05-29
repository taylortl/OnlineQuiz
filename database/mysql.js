require('dotenv').config()
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.HOST, 
  user: process.env.USER,     
  password: process.env.PASSWORD,     
  database: process.env.DATABSE
}); 
 
connection.connect(err => {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = connection;