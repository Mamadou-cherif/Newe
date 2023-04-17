
'use strict';

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var user_routes = require('./routes/user');
var document_routes = require('./routes/document');
var structure_routes = require('./routes/structure');
var service_routes = require('./routes/service');
var categoriedoc_routes = require('./routes/categoriedoc');
var archive_routes = require('./routes/archive');
var action_routes = require('./routes/action');



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

// app.use('/', default_routes);
app.use('/api', user_routes);
app.use('/api', document_routes);
app.use('/api', structure_routes);
app.use('/api', service_routes);
app.use('/api', categoriedoc_routes);
app.use('/api', archive_routes);
app.use('/api', action_routes);


module.exports = app;
