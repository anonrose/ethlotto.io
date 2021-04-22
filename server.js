const express = require('express')
var logger = require('morgan');
var path = require('path');
var app = express();

// log requests
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(3000);
