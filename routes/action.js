'use strict';

var express = require('express');
var actionController = require('../controllers/action');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
//var multipart = require('connect-multiparty');

api.post('/ajoutAction', actionController.ajoutAction);
api.put('/disableAction', actionController.disableAction);
api.put('/modifAction', actionController.modifAction);
api.delete('/deleteAction/:id', actionController.deleteAction);
api.get('/getOneAction/:id', actionController.getOneAction);
api.get('/getAllAction', actionController.getAllAction);


module.exports = api;