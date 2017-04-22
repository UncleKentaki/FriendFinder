var express = require('express');
var router = express.Router();
var fs = require('fs');
var friends = require('../data/friends');
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
});

//route for api link
router.get("/friends", function (req, res) {
    res.json(friends);
});


// Create new friend - takes in JSON input
router.post("/friends", function (req, res) {

    var newFriend = req.body;
    var newFriendScore = newFriend.score;
    var scoreDiff = 0;


    var bestMatch = {
        name: "",
        image: "",
        matchDiff: ""
    }

    //loop trhough friends array
    for (var i = 0; i < friends.length; i++) {

        scoreDiff = 0;

        //for each friend check difference in user score against current index
        for (var n = 0; n < 10; n++) {

            scoreDiff += Math.abs(parseInt(newFriendScore[n]) - parseInt(friends[i].score[n]));

            if (scoreDiff <= bestMatch.matchDiff) {
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.matchDiff = scoreDiff;
            }

        }

    }

    fs.appendFile('friends.js', newFriend, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    res.json(bestMatch);
});

module.exports = router;
