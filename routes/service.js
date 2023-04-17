'use strict';

var express = require('express');
var serviceController = require('../controllers/service');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
//var multipart = require('connect-multiparty');

api.post('/ajoutService', serviceController.ajoutService);
api.post('/counterNbOfArchiveInService', serviceController.counterNbOfArchiveInService);
api.post('/counterNbOfDocumentInService', serviceController.counterNbOfDocumentInService);
api.post('/getServiceByStrucuture', serviceController.getServiceByStrucuture);
api.put('/disableService', serviceController.disableService);
api.put('/modifService', serviceController.modifService);
api.delete('/deleteService/:id', serviceController.deleteService);
api.get('/getOneService/:id', serviceController.getOneService);
api.get('/getAllService', serviceController.getAllService);


module.exports = api;