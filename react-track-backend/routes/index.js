const fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  let files = fs.readdirSync("./tracks")
  res.send(files)
})

module.exports = router;
