'use strict';

var express = require('express');
var structureController = require('../controllers/structure');
var api = express.Router();
//var multipart = require('connect-multiparty');

api.post('/ajoutStructure', structureController.ajoutStructure);
api.post('/counterNbOfArchiveByStructure', structureController.counterNbOfArchiveByStructure);
api.post('/counterNbOfServiceInStructure', structureController.counterNbOfServiceInStructure);
api.post('/counterNbOfDocumentInStructure', structureController.counterNbOfDocumentInStructure);
api.put('/disableStructure', structureController.disableStructure);
api.put('/modifStructure', structureController.modifStructure);
api.delete('/deleteStructure/:id', structureController.deleteStructure);
api.get('/getOneStructure/:id', structureController.getOneStructure);
api.get('/getAllStructure', structureController.getAllStructure);


module.exports = api;