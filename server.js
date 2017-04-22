// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000

var htmlRoutes = require('./app/routing/htmlRoutes');
var apiRoutes = require('./app/routing/apiRoutes');
var friends = require('./app/data/friends');

app.use('/', htmlRoutes);
app.use('/api', apiRoutes);
app.use(express.static(path.join(__dirname, '/app/public')));
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

// Create new friend - takes in JSON input
app.post("/api/friends", function (req, res) {
  console.log(req.body);
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

    scoreDiff = 0;

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

  fs.appendFile('friends.js', bestMatch, function (err) {
  if (err) throw err;
  console.log('Saved!');
});

  res.json(bestMatch);
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});