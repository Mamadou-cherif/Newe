const express= require("express")
var Document= require("../models/document")
const app= express()

const crypto = require('crypto');
const multersd = require('multer')
const path = require('path');
const fs = require("fs");
const user = require("../models/user");

let documentUrl = '';

const storage = multersd.diskStorage({
  destination: './uploads/documents/',
  filename: function (req, file, callback) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return callback(err);
      let derniereImage = raw.toString('hex') + path.extname(file.originalname);
      callback(null, derniereImage);
    })
  }
})

const upload = multersd({ storage: storage });

const singleUpload = upload.single('image');

function files(req, res, next) {
  try {
    singleUpload(req, res, function (err) {
      if (err) {
        return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] });
      }
      if (!req.file.originalname.match(/\.(docx|pdf|ppt|xlsx)$/)) {
        return res.status(400).json({ error: 'only  autorized' })
      }
      documentUrl = req.file.filename;
      return res.json({ 'imageUrl': documentUrl });
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err)
  }
}


function getImageFile(req, res) {

  var image_file = req.params.File;
  var path_file = './uploads/documents/' + image_file;
  fs.exists(path_file, (exists) => {
    if (exists) {
      res.sendFile(path.resolve(path_file));
    }
  });
}


function ajoutDocument(req, res, next){
     var document= new Document()
     document.serviceId= req.body.serviceId
     document.reference= req.body.reference
     document.categoriedocId= req.body.categoriedocId
     document.link= req.body.link
     document.debut= req.body.debut
     document.fin= req.body.fin
     document.estActif=1
     document.link= documentUrl
      document.creationDate= req.body.creationDate
      document.creationUserId= req.body.creationUserId
     document.save()
         .then(()=> res.status(201).json({succes: "l'ajout a bien réussi!"}))
         .catch(()=> res.status(400).json({error: "l'ajout a echoué!"}))
}


function getDocumentByConnectedUser(req, res, next) {
  Document.find({'creationUserId': req.params.id, estActif:1}).populate('serviceId').populate('categoriedocId')
    .then(document=> {
      res.status(200).json(document)
    })
    .catch(error=> res.status(400).json(error))
}

function modifDocument(req, res, next){
  req.body.link=documentUrl
  Document.updateOne({_id:req.body.id},{...req.body}, {_id:req.body.id})
        .then(()=> res.status(200).json({succes: "La modification a bien réussi!"}))
       .catch(()=> res.status(400).json({error: "La modification a echoué!"}))
}



function deleteDocument(req, res, next){
    Document.deleteOne({_id: req.params.id})
    .then(()=> res.status(200).json({succes: "La suppression a bien réussi!"}))
    .catch(()=> res.status(400).json({error: "La suppression a echoué!"}))
}


function getOneDocument(req, res, next){
    Document.findOne({_id: req.params.id})
    .then(document=> res.status(200).json(document))
    .catch(error=> res.status(400).json(error))
}


function disableDocument(req, res, next){
    Document.updateOne({_id:req.body.id},{estActif: 0}, {_id:req.body.id})
        .then(()=> res.status(200).json({succes: "La suppression logique de cette structure a réussi!"}))
       .catch(()=> res.status(400).json({error: "La modification a echoué!"}))
}

function getAllDocument(req, res, next){
    Document.find({estActif: 1})
    .then(document=> {
        if(!document){
            document=[]
        }
        res.status(200).json(document)
    })
    .catch(error=> res.status(400).json(error))
}

function getOneDocument(req, res, next){
   
    Document.findOne({_id: req.params.id, estActif: {$eq: 1}})
    .then(document=> {
        if(!document){
            document=[] 
        }
        res.status(200).json(document)
    })
    .catch(error=> res.status(400).json(error))
}


function getDocumentByServiceId(req, res, next){
    Document.find({ serviceId:req.body.serviceId , estActif: {$eq: 1}}).populate('categoriedocId').populate('serviceId').sort({creationDate: -1})
    .then(document=>{
      if(!document){
        document=[] 
      }
      res.status(200).json(document)
    })
    .catch(error=> res.status(400).json(error))
}

function getDocumentByCategoriedocId(req, res, next){
  Document.find({categoriedocId:req.body.categoriedocId , estActif: {$eq: 1}}).populate('categoriedocId').populate('serviceId').sort({creationDate: -1})
  .then(document=>{
    if(!document){
      document=[] 
    }
    res.status(200).json(document)
  })
  .catch(error=> res.status(400).json(error))
}

module.exports={
    files,
    ajoutDocument,
    disableDocument,
    modifDocument,
    deleteDocument,
    getOneDocument,
    disableDocument,
    getAllDocument,
    getDocumentByServiceId,
    getImageFile,
    getDocumentByCategoriedocId,
    getDocumentByConnectedUser
}

