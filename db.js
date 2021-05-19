const mysql = require("mysql");

var con = mysql.createConnection({
    host: process.env.HOST|"127.0.0.1",
    user: "root",
    password: process.env.PASSWORD|"my-secret-pw",
    database: "mydb"
  });


  module.exports = con;