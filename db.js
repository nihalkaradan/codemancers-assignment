const mysql = require("mysql");

var con = mysql.createConnection({
    host: "mysql",
    user: "root",
    password: "password",
    database: "mydb"
  });


  module.exports = con;