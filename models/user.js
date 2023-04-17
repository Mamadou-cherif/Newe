'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = Schema({
    structureId: {type: Schema.ObjectId, ref:  'structure'},
    serviceId: {type: Schema.ObjectId, ref:  'service'},
    name: String,
    prenoms: String,
    privilege: Number,
    telephone: {type:String, unique: true},
    password: String,
    type_user: String,  
    modifiedPwd: Boolean,
    image: String,
    estActif:  Number,
    creationUserId :  {type: Schema.ObjectId, ref:  'user'},
    creationDate :  {type: String},
    modifUserId : {type: Schema.ObjectId, ref:  'user'},
    modifDate: {type: String}
});

module.exports = mongoose.model('user', userSchema);
