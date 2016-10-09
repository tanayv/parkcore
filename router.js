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
        
        /*con.query("INSERT INTO users (fullName, email) VALUES ('Bharat Kashyap', 'bbw@ghm.com')", function (err,rows) {
        console.log("Query Executed");
        });*/
        res.send('Query was Exectued (0.110220202 ms)');
    });
    
    app.post('/addSpot', function (req, res) {
        var lat = req.body.lat;
        var lng = req.body.lng;
        var post  = { Lat: lat, Lng : lng };
        con.query("INSERT INTO spots SET ?", post, function (err, rows) {
          if(err)
          console.log(err.message);
        else
          console.log("Success!");
        /*res.send('' + lat + ', ' + lng);*/
        res.send('');
    });
    });
    
    app.post('/findSpot', function (req, res) 
    { 
          var lat = req.body.lat;
          var lng = req.body.lng;
          var dataset = [];
          var dataset2 = [];
          var finalrray = [];
          var delta = {};
          con.query('SELECT Lat, Lng, Time FROM spots', 
          function(err,rows) 
          {
            if(err) throw err;
            console.log('Data received from Db:\n');
            
            var origin = lat + "," + lng;

      //var destinations = ['Chicago, United States of America', 'Denver, United States of America', 'Vancouver, Canada', 'Michigan, United States of America'];
            var seconds = ((new Date).getTime())/1000;
      //var times = [(seconds-1475936281)/60, (seconds-1475936282)/60, (seconds-1475936281)/60, (seconds-1475936281)/60
          
      
            var longlats =  new Array();
      
            
        
            for(var i=0; i<rows.length; i++)
            {
              var something = rows[i].Lat + "," + rows[i].Lng;
              longlats.push(something);
            }
           
            var data;
            var to = new Array();
      
            for(var i=0; i<rows.length; i++)
            { 
              var something = (seconds-(rows[i].Time/1000))/60;
              to.push(something);
            }

            
            for(var k = 0; k<rows.length; k++){
              var distServ = require('google-distance');
            var x = distServ.get(
              {
                origins : [origin],
                destinations : [longlats[k]], //To do : Figure out way to insert number of elements equal to number of SQL Table rows
                mode : 'driving'
              },
            function(err, data)
              { 
                if(err)
                  console.log("Error");
              dataset.push([data[0].destination, data[0].durationValue/60]);
              if(dataset.length==rows.length-1){
              for(var bo = 0; bo<rows.length-1; bo++){
                dataset2.push([dataset[bo][0], dataset[bo][1], to[bo], 3*to[bo]+dataset[bo][1]]);
              }
               function sortFunction(a, b) {
              if (a[3] === b[3]) {
               return 0;
                }
                else {
                 return (a[3] < b[3]) ? -1 : 1;
                  }}
              var sorted_dataset = dataset2.sort(sortFunction);              res.send(sorted_dataset);
              //res.render('index', { msg1: '' + dataset2, msg2: ''+to});
              }
              }); 
            }
            
            
               /*  function sortFunction(a, b)
              {
                if (a[2] === b[2]) 
                  return 0;
                else
                  return (a[2] < b[2]) ? -1 : 1;
              }
              var sorted_dataset = dataset.sort(sortFunction);
               */
               
            
            
            
            });
     });
};