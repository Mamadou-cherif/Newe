'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var structureSchema = Schema({
    name: {type: String, unique: true},
    presonneResponsable: {type: String, unique: true},
    email:  String,
    telephone: Number,
    estActif:  Number,
    creationUserId :  {type: Schema.ObjectId, ref:  'user'},
    creationDate :  {type: String},
    modifUserId : {type: Schema.ObjectId, ref:  'user'},
    modifDate: {type: String}
});

module.exports = mongoose.model('structure', structureSchema);
