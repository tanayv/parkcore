module.exports = function (app) {

    //Bring MySQL into the app
    var mysql = require("mysql");
    
    // First you need to create a connection to the db
    var con = mysql.createConnection({
      host: "localhost",
      user: "tanayv",
      password: "",
      database: "c9",
    });
    
    con.connect(function(err){
      if(err){
        console.log('Error connecting to Db');
        return;
      }
      console.log('Connection established');
    });
    
    
    app.get('/', function (req, res) {
        
        con.query("INSERT INTO users (fullName, email) VALUES ('Bharat Kashyap', 'bbw@ghm.com')", function (err,rows) {
        console.log("Query Executed");
        });
        res.send('Query was Exectued (0.110220202 ms)');
    });
    
    app.post('/addSpot', function (req, res) {
        var lat = req.body.lat;
        var lng = req.body.lng;
        res.send('' + lat + ', ' + lng);
    });
    
    

    
    
    
    

    
}