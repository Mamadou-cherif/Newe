'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var serviceSchema = Schema({
    structureId: {type: Schema.ObjectId, ref:  'structure'},
    name: {type: String, unique: true},
    presonneResponsable: {type: String},
    email: {type: String, unique: true},
    telephone: {type: Number, unique: true},
    estActif:  Number,
    creationUserId :  {type: Schema.ObjectId, ref:  'user'},
    creationDate :  {type: String},
    modifUserId : {type: Schema.ObjectId, ref:  'user'},
    modifDate: {type: String}
});

module.exports = mongoose.model('service', serviceSchema);
