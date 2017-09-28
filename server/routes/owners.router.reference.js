var express = require('express');
var router = express.Router();  //Need .Router() to handle this router
var pg = require('pg');

var poolModule = require('../modules/pool.js');
var pool = poolModule;

// Send all customers to client from DB using GET request
router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {

      var queryText = 'SELECT ("last_name", "first_name") FROM owners;';
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          console.log(queryText);
          res.send({customers: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of GET

//Add NEW CUSTOMER to the database w/ POST request
router.post('/addOwner', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {

      var customer = req.body;
      var first_name = customer.first_name;
      var last_name = customer.last_name;

      var queryText = "INSERT INTO owners ('first_name', 'last_name') VAULES ($1, $2);";
      db.query(queryText,[first_name, last_name], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
            // console.log(queryText);
          res.send({customers: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of POST

// DELETE owner from DB (Deleting owner from pulldown menu
router.delete('/:id', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var id = req.params.id;
      // DELETE PET FROM THE VISITS TABLE
      var queryText = 'DELETE FROM owners WHERE "owner_id" = $1;';
      db.query(queryText,[id], function(errorMakingQuery, result){
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
         res.sendStatus(200);
          } // end of second if else
        }); // end of db query
      } // end if else
  }); // end pool
}); // end of DELETE

// Update owner in DB
router.put('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {

      var ownerId = req.params.id;
      var updatedOwner = req.body;
      var first_name = updatedOwner.first_name;
      var last_name = updatedOwner.last_name;

      var queryText = 'UPDATE pets SET ("first_name", "last_name") = VALUES($1, $2) WHERE "owner_id" = $3;';
      db.query(queryText,[first_name, last_name, ownerId], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
            // console.log(queryText);
          res.send({owners: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of PUT



module.exports = router;
