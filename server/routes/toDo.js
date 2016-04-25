var express = require('express');
var router = express.Router();
var pg = require('pg');

var connection = require('../db/connection');

var connectionString = connection.connectionString;

router.post('/', function(request, response){
  console.log(request.body);
  pg.connect(connectionString, function(err, client, done){
    if(err) {
      console.log(err);
      response.sendStatus(500);
    }else {
      console.log('The items are here');
      var toDoItem = request.body.toDoItem;
      var completed = request.body.completed;
      var results = [];

      var query = client.query('INSERT INTO toDo(toDoItem, completed)' +
      ' VALUES ($1, $2) RETURNING id, toDoItem, completed',
      [toDoItem, completed]);

      query.on('error', function(error){
        console.log(error);
        response.sendStatus(500);
      });

      query.on('row', function(rowData){
        results.push(rowData);
      });

      query.on('end', function(){
        response.send(results);
        done();
      });
    }
  });
});

router.get('/', function(request, response){
  pg.connect(connectionString, function(err, client, done){
    if(err) {
      console.log(err);
      response.sendStatus(500);
    } else{
      var query = client.query('SELECT * FROM toDo');
      var results = [];

      query.on('error', function(error){
        console.log(error);
        response.sendStatus(500);
      });

      query.on('row', function(rowData){
        results.push(rowData);
      });

      query.on('end', function(){
        response.send(results);
        done();
      });
    }
  });
});

router.put('/', function(request, response){
  console.log(request.body);
  pg.connect(connectionString, function(err, client, done){
    if(err) {
      console.log(err);
      response.sendStatus(500);
    }else {
      var query = client.query('UPDATE toDo SET completed = true WHERE toDoItem = request.body.toDoItem');
      var results = [];

      query.on('error', function(error){
        console.log(error);
        response.sendStatus(500);
      });

      query.on('row', function(rowData){
        results.push(rowData);
      });

      query.on('end', function(){
        response.send(results);
        done();
      });
    }
  });
});


module.exports = router;
