'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var archiveSchema = Schema({
    structureId: {type: Schema.ObjectId, ref:  'structure'},
    documentId: {type: Schema.ObjectId, ref:  'document'},
    dateArchivage: {type: String},
    estActif:  Number,
    creationUserId :  {type: Schema.ObjectId, ref:  'user'},
    creationDate :  {type: String},
    modifUserId : {type: Schema.ObjectId, ref:  'user'},
    modifDate: {type: String}
});

module.exports = mongoose.model('archive', archiveSchema);