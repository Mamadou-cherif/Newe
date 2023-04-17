'use strict';

var express = require('express');
var archiveController = require('../controllers/archive');
var api = express.Router();
//var multipart = require('connect-multiparty');

api.post('/documentByServiceOrCategorie', archiveController.documentByServiceOrCategorie);
api.post('/ajoutArchive', archiveController.ajoutArchive);
api.post('/getArchiveByStructure', archiveController.getArchiveByStructure);
api.put('/disableArchive', archiveController.disableArchive);
api.put('/modifArchive', archiveController.modifArchive);
api.delete('/deleteArchive/:id', archiveController.deleteArchive);
api.get('/getOneArchive/:id', archiveController.getOneArchive);
api.get('/getAllArchive', archiveController.getAllArchive);


module.exports = api;