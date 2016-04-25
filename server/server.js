//node modules
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//dev modules
var connection = require('./db/connection');
var index = require('./routes/index');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('server/public'));
app.use(bodyParser.json());

//routers
app.use('/', index);

connection.initializeDB();

var server = app.listen(port, function(){
  console.log('Listening on port: ', port);
})
