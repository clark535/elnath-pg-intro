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

router.delete('/:id', function(req, res){
    var shoeIdToRemove = req.params.id;
    //attempt to connect to the database
    pool.connect(function(errorConnectingToDatabase, client, done){//connects to the database
        if (errorConnectingToDatabase) {
            //there was an error connecting to the database
            console.log('error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            //we connected to the database
            //now, we are going to get things from the database
            client.query(`DELETE FROM shoes WHERE id=$1;`, [shoeIdToRemove], function(errorMakingQuery, result){
                done();
                if (errorMakingQuery) {
                    //query failed, did you test in postico?
                    console.log('error making query', errorMakingQuery);
                    res.send(500);
                } else {
                    res.sendStatus(200);//200 is all good.
                }
            });//copy and paste form database.js
        }
    });
});

router.put('/:id', function(req, res){
    var shoeIdToSave = req.params.id;
    var shoeNameToSave = req.params.name;
    //attempt to connect to the database
    pool.connect(function(errorConnectingToDatabase, client, done){//connects to the database
        if (errorConnectingToDatabase) {
            //there was an error connecting to the database
            console.log('error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            //we connected to the database
            //now, we are going to get things from the database
            client.query(`UPDATE shoes SET name=$1 WHERE id=$2;`, [shoeIdToSave, shoeNameToSave], function(errorMakingQuery, result){
                done();
                if (errorMakingQuery) {
                    //query failed, did you test in postico?
                    console.log('error making query', errorMakingQuery);
                    res.send(500);
                } else {
                    res.sendStatus(200);//200 is all good.
                }
            });//copy and paste form database.js
        }
    });
});

module.exports = router;