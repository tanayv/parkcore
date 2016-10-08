
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


app.listen(port);
console.log('Server started! At http://localhost:' + port);