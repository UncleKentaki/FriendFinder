// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "home.html"));
});


app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "view-tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "make-reservation.html"));
});

app.get("/api/tables")

// Create New Characters - takes in JSON input
app.post("/api/tables", function(req, res) {
  var newReservation = req.body;
  newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  reservations.push(newReservation);

  res.json(newReservation);
});