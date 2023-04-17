const express= require("express")
var Archive= require("../models/archive")
const user = require("../models/user")
const Document = require("../models/document")
const app= express()


function ajoutArchive(req, res, next){
     var archive= new Archive({
         ...req.body
     })
     archive.save()
         .then(()=> res.status(201).json({succes: "l'ajout a bien réussi!"}))
         .catch(error=> res.status(400).json(error))
}



function modifArchive(req, res, next){
    Archive.updateOne({_id:req.body.id},{...req.body}, {_id:req.body.id})
        .then(()=> res.status(200).json({succes: "La modification a bien réussi!"}))
       .catch(()=> res.status(400).json({error: "La modification a echoué!"}))
}



function deleteArchive(req, res, next){
    Archive.deleteOne({_id: req.params.id})
    .then(()=> res.status(200).json({succes: "La suppression a bien réussi!"}))
    .catch(()=> res.status(400).json({error: "La suppression a echoué!"}))
}


function getOneArchive(req, res, next){
   
    Archive.findOne({_id: req.params.id, estActif: {$eq: 1}})
    .then(archive=> {
        if(!archive){
            archive=[] 
        }
        res.status(200).json(archive)
    })
    .catch(error=> res.status(400).json(error))


}

function getArchiveByStructure(req, res, next){
   
    Archive.find({structureId: req.body.structureId, estActif: {$eq: 1}}).populate('documentId').sort({dateArchivage: -1})
    .then(archive=> {
        if(!archive){
            archive=[] 
        }
        res.status(200).json(archive)
    })
    .catch(error=> res.status(400).json(error))


}


function documentByServiceOrCategorie(req, res, next){
   let documentArray=[]
    Archive.find({estActif: {$eq: 1}, structureId: req.body.structureId}).populate('documentId').sort({dateArchivage: -1})
    .then(archive=> {
        if (!archive){
            documentArray=[] 
        }
        if(req.body.serviceId == ''){
           return res.status(200).json(archive)
        }
        else if(req.body.serviceId != '' && req.body.categorieId== ''){
            for (let index = 0; index < archive.length; index++) {
                if(archive[index].documentId.serviceId== req.body.serviceId){
                    documentArray[index]= archive[index]
                }
            }
        }
        else if(req.body.categorieId != ''){
            for (let index = 0; index < archive.length; index++) {
                if(archive[index].documentId.serviceId== req.body.serviceId && archive[index].documentId.categoriedocId== req.body.categorieId){
                    documentArray[index]= archive[index]
                }
            }
        }
        


       return res.status(200).json(documentArray)
    })
    .catch(error=> res.status(400).json(error))


}

function disableArchive(req, res, next){
    Archive.updateOne({_id:req.body.id},{estActif: 0}, {_id:req.body.id})
        .then(()=> res.status(200).json({succes: "La suppression logique de cette archive a réussi!"}))
       .catch(()=> res.status(400).json({error: "La modification a echoué!"}))
}

function getAllArchive(req, res, next){
    Archive.find({estActif: 1})
    .then(archive=> {
        if(!archive){
            archive=[]
        }
        res.status(200).json(archive)
    })
    .catch(error=> res.status(400).json(error))
}




module.exports={
    ajoutArchive,
    disableArchive,
    getArchiveByStructure,
    documentByServiceOrCategorie,
    modifArchive,
    deleteArchive,
    getOneArchive,
    getAllArchive,
}

