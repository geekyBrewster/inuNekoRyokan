var express = require('express');
var router = express.Router();  //Need .Router() to handle this router
var pg = require('pg');

var poolModule = require('../modules/pool.js');
var pool = poolModule;

// Send all pets to client from DB using GET request
router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {

      var queryText = '"pets"."color", "visits"."check_in_status" FROM owners' +
      ' JOIN pets ON "owners"."id" = "pets"."owner_id"' +
      ' JOIN visits ON "pets"."owner_id" = "visits"."pets_id";';
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          console.log(queryText);
          res.send({pets: result.rows});
          // ***** DOUBLE CHECK ORDER OF ITEMS IN THE OBJECT *****
          // owner, name, breed, color
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of GET


//Add NEW PET to the database w/ POST request
router.post('/addPet', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {

      var pet = req.body;
      var ownerID = pet.owner;  //Need the owner ID -- NOT name here
      var name = pet.name;
      var breed = pet.breed;
      var color = pet.color;

      // adding a new pet, but we must make sure we link owner_id
      var queryText = 'INSERT INTO pets ("name", "breed", "color", "owner_id" ) VALUES ($1, $2, $3, $4);';
      db.query(queryText,[name, breed, color, owner], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
            // console.log(queryText);
          res.send({pets: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of POST


// DELETE pet from DB (Deleting pet from visits table and pets table)
router.delete('/:id', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var id = req.params.id;
      // DELETE PET FROM THE VISITS TABLE
      var queryText = 'DELETE FROM visits WHERE "pets_id" = $1;';
      db.query(queryText,[id], function(errorMakingQuery, result){
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // THEN DELETE PET FROM THE PETS TABLE
          queryText = 'DELETE FROM pets WHERE "id" = $1;';
          db.query(queryText,[id], function(errorMakingQuery, result){
            done();
            if(errorMakingQuery) {
              console.log('Attempted to query with', queryText);
              console.log('Error making query');
              res.sendStatus(500);
            } else {
                // console.log(queryText);
              res.send({pets: result.rows});
              }
            }); // end of second db query
          } // end of second if else
        }); // end of first db query
      } // end first if else
  }); // end pool
}); // end of DELETE

// Update pet in DB
router.put('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {

      var ownerId = req.params.id;
      var updatedPet = req.body;
      var name = updatedPet.name;
      var breed = updatedPet.breed;
      var color = updatedPet.color;

      var queryText = 'UPDATE pets SET ("name", "breed", "color") = VALUES($1, $2, $3) WHERE "owner_id" = $4;';
      db.query(queryText,[name, breed, color, ownerId], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
            // console.log(queryText);
          res.send({pets: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of PUT

// Mark pet as CHECKED IN completed in DB
router.put('/checkin/:id', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var id = req.params.id;

      var queryText = 'UPDATE visits SET "check_out_status" = TRUE WHERE "pets_id" = $1;';
      db.query(queryText,[id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
            // console.log(queryText);
          res.send({pets: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of PUT

// Mark pet as CHECKED OUT in DB
router.put('/checkout/:id', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var id = req.params.id;

      var queryText = 'UPDATE visits SET "check_in_status" = FALSE WHERE "pets_id" = $1;';
      db.query(queryText,[id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
            // console.log(queryText);
          res.send({pets: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of PUT












module.exports = router;
