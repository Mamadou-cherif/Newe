'use strict';

var express = require('express');
var categoriedocController = require('../controllers/categoriedoc');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
//var multipart = require('connect-multiparty');

api.post('/getCategorieDocByService', categoriedocController.getCategorieDocByService);
api.post('/ajoutCategorieDoc', categoriedocController.ajoutCategorieDoc);
api.put('/disableCategorieDoc', categoriedocController.disableCategorieDoc);
api.put('/modifCategorieDoc', categoriedocController.modifCategorieDoc);
api.delete('/deleteCategorieDoc/:id', categoriedocController.deleteCategorieDoc);
api.get('/getOneCategorieDoc/:id', categoriedocController.getOneCategorieDoc);
api.get('/getAllCategorieDoc', categoriedocController.getAllCategorieDoc);


module.exports = api;