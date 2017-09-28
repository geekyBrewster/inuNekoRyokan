var express = require('express');
var router = express.Router();  //Need .Router() to handle this router
var pg = require('pg');

var poolModule = require('../modules/pool.js');
var pool = poolModule;

// Send all customers to client from DB using GET request


//Add NEW CUSTOMER to the database w/ POST request


// DELETE owner from DB (Deleting owner from pulldown menu


// Update owner in DB




module.exports = router;
