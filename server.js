// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
 var path = require('path');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

var htmlRoutes = require('./app/routing/htmlRoutes');
var apiRoutes = require('./app/routing/apiRoutes');

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



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});