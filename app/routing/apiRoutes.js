var express = require('express');
var router = express.Router();
var friends = require('../data/friends');
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
});

router.get("/friends", function(req, res) {
    res.json(friends);
});


// Create New Characters - takes in JSON input
router.post("/friends", function (req, res) {
    var newFriend = req.body;
    newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

    console.log(newFriend);

    friends.push(newFriend);

    res.json(newFriend);
});

module.exports = router;
