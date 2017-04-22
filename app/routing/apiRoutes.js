var express = require('express');
var router = express.Router();
var fs = require('fs');
var friends = require('../data/friends');
var bodyParser = require('body-parser')
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
});

//route for api link
router.get("/friends", function (req, res) {
    res.json(friends);
});




module.exports = router;
