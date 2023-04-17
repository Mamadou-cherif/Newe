'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var actionSchema = Schema({
    libelle: {type: String},
    documentId :  {type: Schema.ObjectId, ref:  'document'},
    estActif:  Number,
    creationUserId :  {type: Schema.ObjectId, ref:  'user'},
    creationDate :  {type: String},
    modifUserId : {type: Schema.ObjectId, ref:  'user'},
    modifDate: {type: String}
});

module.exports = mongoose.model('action', actionSchema);