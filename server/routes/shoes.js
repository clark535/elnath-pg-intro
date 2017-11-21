var express = require('express');
var router = express.Router();
var pg = require('pg');

var pool = require('../modules/pool');

router.get('/', function(req, res) {
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

router.post('/', function(req, res){
    //attempt to connect to the database
    pool.connect(function(errorConnectingToDatabase, client, done){
        if (errorConnectingToDatabase) {
            //there was an error connecting to the database
            console.log('error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            //we connected to the database
            //now, we are going to get things from the database
            client.query(`INSERT INTO shoes (name, cost) 
            VALUES ($1, $2);`, [req.body.name, req.body.cost], function(errorMakingQuery, result){
                done();//have to write it with the VALUES ($1, $2, $3, ect..)', [req.body.--, req.body.--]
                if (errorMakingQuery) {
                    //query failed, did you test in postico?
                    console.log('error making query', errorMakingQuery);
                    res.send(500);
                } else {
                    res.sendStatus(201);//201 is created.
                }
            });//copy and paste form database.js
        }
    });
});

module.exports = router;