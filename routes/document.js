'use strict';

var express = require('express');
var documentController = require('../controllers/document');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
//var multipart = require('connect-multiparty');


api.post('/ajoutDocument', documentController.ajoutDocument);
api.get('/getDocumentByConnectedUser/:id', documentController.getDocumentByConnectedUser);
api.post("/documents", documentController.files)
api.get("/getfile/:File", documentController.getImageFile)
api.post('/getDocumentByServiceId', documentController.getDocumentByServiceId);
api.post('/getDocumentByCategoriedocId', documentController.getDocumentByCategoriedocId);
api.put('/modifDocument', documentController.modifDocument);
api.put('/disableDocument', documentController.disableDocument);
api.delete('/deleteDocument/:id', documentController.deleteDocument);
api.get('/getOneDocument/:id', documentController.getOneDocument);
api.get('/getAllDocument', documentController.getAllDocument);


module.exports = api;