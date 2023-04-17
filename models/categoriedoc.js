'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var categoriedocSchema = Schema({
    serviceId: {type: Schema.ObjectId, ref:  'service'},
    libelle: {type: String, unique: true},
    estActif:  Number,
    creationUserId :  {type: Schema.ObjectId, ref:  'user'},
    creationDate :  {type: String},
    modifUserId : {type: Schema.ObjectId, ref:  'user'},
    modifDate: {type: String}
});

module.exports = mongoose.model('categoriedoc', categoriedocSchema);
