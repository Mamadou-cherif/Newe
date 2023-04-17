'use strict';

var express = require('express');
var userController = require('../controllers/user');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
//var multipart = require('connect-multiparty');
api.post('/addUser', userController.ajoutUser);
api.post('/getUserByStructure', userController.getUserByStructure);
api.post('/getUserByService', userController.getUserByService);
api.get('/disableUser/:id', userController.disableUser);
api.put('/modifUserPassword', userController.modifUserPassword);
api.post('/login', userController.login);
api.put('/modifUser', userController.modifUser);
api.delete('/deleteUser/:id', userController.deleteUser);
api.get('/getOneUser/:id', userController.getOneUser);
api.get('/getAllUser', userController.getAllUser);


module.exports = api;