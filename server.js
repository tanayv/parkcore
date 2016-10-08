
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;


//RouterBoy
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});

app.get('/', function (req, res) {
  res.send('Starboy');
});

//SeequlBoy
var mysql = require("mysql");

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "localhost",
  user: "tanayv",
  password: ""
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

con.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});


app.listen(port);
console.log('Server started! At http://localhost:' + port);