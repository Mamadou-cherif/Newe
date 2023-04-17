'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var documentSchema = Schema({
    serviceId: {type: Schema.ObjectId, ref:  'service'},
    categoriedocId: {type: Schema.ObjectId, ref:  'categoriedoc'},
    reference: String,
    link: String,
    debut: String,
    fin: String,
    estActif:  Number,
    creationUserId :  {type: Schema.ObjectId, ref:  'user'},
    creationDate :  {type: String},
    modifUserId : {type: Schema.ObjectId, ref:  'user'},
    modifDate: {type: String}
});
module.exports = mongoose.model('document', documentSchema);
