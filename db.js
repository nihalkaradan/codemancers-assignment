const mysql = require("mysql");
const HOST = process.env.HOST || "mysql";
const PASSWORD = process.env.PASSWORD || "password";
var con = mysql.createConnection({
    host: HOST,
    user: "root",
    password: PASSWORD,
    database: "mydb"
  });


  module.exports = con;