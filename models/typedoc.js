'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var typedocSchema = Schema({
    libelle: {type: String, unique: true},
    observations: {type: String},
    estActif:  Number,
    creationUserId :  {type: Schema.ObjectId, ref:  'User'},
    creationDate :  {type: String},
    modifUserId : {type: Schema.ObjectId, ref:  'User'},
    modifDate: {type: String}
});

module.exports = mongoose.model('typedoc', typedocSchema);
