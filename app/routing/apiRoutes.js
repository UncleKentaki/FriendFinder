var express = require('express');
var router = express.Router();
var users = require('../data/friends')
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
});

router.get("/friends", function(req, res) {
    res.json(users);
});

// Create New Characters - takes in JSON input
router.post("/friends", function (req, res) {
    var newUser = req.body;
    newUser.routeName = newUser.name.replace(/\s+/g, "").toLowerCase();

    console.log(newUser);

    reservations.push(newUser);

    res.json(newUser);
});

module.exports = router;
