const fs = require('fs');
const express = require('express');
const router = express.Router();
const path = require('path');

/* GET home page. */
router.get("/", (req, res) => {
  let files = fs.readdirSync(`${process.cwd()}/tracks`).filter( f => !f.includes("DS_Store"))

  res.send(files)
})

router.get("/path", (req, res) => {
  res.send(`${process.cwd()}/tracks`)
})

module.exports = router;
