var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');

var app = express();
var port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

var config = {
    database: 'shoe_store', //name of our database
    host: 'localhost', //where is your datebase - which computer
    port: 5432, //the port number for your database - 5432 is default
    max: 10, // how many connections at one time
    idleTimeoutMillies: 30000 // 30 secdons to try to connect to our database
};

var pool = new pg.Pool(config);

//for localhost::5000/shoes should return an array of shoe obects
// var shoes = [{name: 'nike', cost: '75'}];

app.get('/shoes', function(req, res) {
    //attempt to connect to database
    pool.connect(function(errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase) {
            //there was an error connecting to the database
            console.log('error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            //we connected to the database
            //now, we are going to get things from the database
            client.query('SELECT * FROM shoes;', function(errorMakingQuery, result){
                done();
                if(errorMakingQuery) {
                    //query failed, did you test in postico?
                    console.log('error making query', errorMakingQuery);
                    res.send(500);
                } else {
                    res.send(result.rows);
                }
            })//copy and paste form database.js
        }
    });
    // res.send(shoes); to test
});

app.listen(port, function(){
    console.log('server is listening on port 5000');
});