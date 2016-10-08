
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/views'));

require('./config.js')(app)
require('./router.js')(app)


app.listen(port);
console.log('Server started! At http://localhost:' + port);