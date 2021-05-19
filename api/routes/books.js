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
    console.log("1 record inserted");
  });
});

router.patch("/:id", (req, res, next) => {
  res.json({
    "hello world": "123",
  });
});

router.get("/", (req, res, next) => {
  res.json({
    "hello world": "123",
  });
});
router.get("/:id", (req, res, next) => {
  res.json({
    "hello world": "123",
  });
});
router.delete("/:id", (req, res, next) => {
  res.json({
    "hello world": "123",
  });
});

module.exports = router;
