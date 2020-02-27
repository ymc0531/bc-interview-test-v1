const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createPool({
  connectionLimit: 10,
  host: "us-cdbr-iron-east-05.cleardb.net",
  user: "ba86af823f7358",
  password: "dbd548d5",
  database: "heroku_f26458339fa712c"
});


module.exports = connection;
