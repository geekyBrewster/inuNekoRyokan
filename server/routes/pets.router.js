var express = require('express');
var router = express.Router();  //Need .Router() to handle this router
var pg = require('pg');

var poolModule = require('../modules/pool.js');
var pool = poolModule;

// Send all pets to client from DB using GET request


//Add NEW PET to the database w/ POST request


// DELETE pet from DB (Deleting pet from visits table and pets table)


// Update pet in DB


// Mark pet as CHECKED IN completed in DB


// Mark pet as CHECKED OUT in DB








module.exports = router;
