const express = require("express");
const router = express.Router();
const con = require("../../db");
const bodyParser = require("body-parser");

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

router.post("/", (req, res, next) => {
  var sql = `INSERT INTO books (name, active) VALUES ("${req.body.name}", true)`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("record inserted");
    res.json({ result: "record inserted" });
  });
});

router.patch("/:id", (req, res, next) => {
    con.query(`update books set name="${req.body.name}" where id=${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        let string = JSON.stringify(result);
        let json = JSON.parse(string);
        console.log(json);
        res.json(json);
        // console.log(result);
      });
});

router.get("/", (req, res, next) => {
  con.query("SELECT * FROM books", function (err, result, fields) {
    if (err) throw err;
    let string = JSON.stringify(result);
    let json = JSON.parse(string);
    console.log(json);
    res.json(json);
    
  });
});
router.get("/:id", (req, res, next) => {
  con.query(
    `SELECT * FROM books where id=${req.params.id} `,
    function (err, result, fields) {
      if (err) throw err;
      let string = JSON.stringify(result);
      let json = JSON.parse(string);
      console.log(json);
      res.json(json);
      // console.log(result);
    }
  );
});
router.delete("/:id", (req, res, next) => {
    con.query(
        `delete FROM books where id=${req.params.id} `,
        function (err, result, fields) {
          if (err) throw err;
          let string = JSON.stringify(result);
          let json = JSON.parse(string);
          console.log(json);
          res.json(json);
          // console.log(result);
        }
      );
});

module.exports = router;
