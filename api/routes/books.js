const express = require("express");
const router = express.Router();
const con = require("../../db");
const bodyParser = require("body-parser");

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

router.post("/", (req, res, next) => {
  var sql = `INSERT INTO shop (name, active) VALUES ("${req.body.name}", true)`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    // console.log("1 record inserted");
    res.json({ result: "record inserted" });
  });
});

router.patch("/:id", (req, res, next) => {
    con.query(`update shop set name="${req.body.name}" where id=${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        let string = JSON.stringify(result);
        let json = JSON.parse(string);
        res.json(json);
        // console.log(result);
      });
});

router.get("/", (req, res, next) => {
  con.query("SELECT * FROM shop", function (err, result, fields) {
    if (err) throw err;
    let string = JSON.stringify(result);
    let json = JSON.parse(string);
    res.json(json);
    // console.log(result);
  });
});
router.get("/:id", (req, res, next) => {
  con.query(
    `SELECT * FROM shop where id=${req.params.id} `,
    function (err, result, fields) {
      if (err) throw err;
      let string = JSON.stringify(result);
      let json = JSON.parse(string);
      res.json(json);
      // console.log(result);
    }
  );
});
router.delete("/:id", (req, res, next) => {
    con.query(
        `delete FROM shop where id=${req.params.id} `,
        function (err, result, fields) {
          if (err) throw err;
          let string = JSON.stringify(result);
          let json = JSON.parse(string);
          res.json(json);
          // console.log(result);
        }
      );
});

module.exports = router;
