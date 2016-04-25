var express = require('express');
var router = express.Router();
var path = require('path');
var toDo = require('./toDo');

router.get('/', function(require, response){
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.use('/toDo', toDo);

module.exports = router;
