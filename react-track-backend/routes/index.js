const fs = require('fs');
var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get("/", (req, res) => {
  let files = fs.readdirSync("./tracks")

  res.send(files)
})

module.exports = router;
