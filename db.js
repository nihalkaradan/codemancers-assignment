const mysql = require("mysql");

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "my-secret-pw",
    database: "mydb"
  });


  module.exports = con;