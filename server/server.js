var express = require('express');
//var pg = require('pg');
var bodyParser = require('body-parser');

var shoes = require('./routes/shoes');

var app = express();
var port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));


//for localhost::5000/shoes should return an array of shoe obects

app.use('/shoes', shoes);





app.listen(port, function(){
    console.log('server is listening on port 5000');
});