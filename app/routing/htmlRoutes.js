// Routes
// =============================================================
var express = require('express');
var router = express.Router();
var path = require('path');



// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
});

// Basic route that sends the user first to the AJAX Page
router.get("/", function (req, res) {
  
  res.sendFile("home.html", { "root": "./app/public" });
});


router.get("/survey", function (req, res) {
  res.sendFile("survey.html", { "root": "./app/public" });
});

module.exports = router;


