module.exports = function (app) {

    //Bring MySQL into the app
    var mysql = require("mysql");
    
    // First you need to create a connection to the db
    var con = mysql.createConnection({
      host: "localhost",
      user: "tanayv",
      password: "",
      database: "c9"
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
    
    app.get('/', function (req, res) {
          res.render('index', { title: 'Hey', message: 'rows'});
    });

    
}