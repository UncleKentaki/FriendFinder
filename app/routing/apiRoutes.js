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


// Create new friend - takes in JSON input
router.post("/friends", function (req, res) {

    var newFriend = req.body;
    var newFriendScores = newFriend.scores;
    var scoreDiff = 0;


    var bestMatch = {
        name: "",
        image: "",
        matchDiff: ""
    }

    //loop trhough friends array
    for (var i = 0; i < friends.length; i++) {

        scoresDiff = 0;

        //for each friend check difference in user score against current index
        for (var n = 0; n < 10; n++) {

            scoreDiff += Math.abs(parseInt(newFriendScores[n]) - parseInt(friends[i].scores[n]));

            if (scoreDiff <= bestMatch.matchDiff) {
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.matchDiff = scoreDiff;
            }

        }

    }

   friends.push(newFriend);

    res.json(bestMatch);
});

module.exports = router;
