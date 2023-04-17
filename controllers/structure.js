const express= require("express")
var Structure= require("../models/structure")
const user = require("../models/user")
const Service= require("../models/service")
const Document= require("../models/document")
const Archive= require("../models/archive")

const app= express()

function ajoutStructure(req, res, next){
     var structure= new Structure({
         ...req.body
     })
     structure.save()
         .then(()=> res.status(201).json({succes: "l'ajout a bien réussi!"}))
         .catch(()=> res.status(400).json({error: "l'ajout a echoué!"}))
}

function modifStructure(req, res, next){
    Structure.updateOne({_id:req.body.id},{...req.body}, {_id:req.body.id})
        .then(()=> res.status(200).json({succes: "La modification a bien réussi!"}))
       .catch(()=> res.status(400).json({error: "La modification a echoué!"}))
}



function deleteStructure(req, res, next){
    Structure.deleteOne({_id: req.params.id})
    .then(()=> res.status(200).json({succes: "La suppression a bien réussi!"}))
    .catch(()=> res.status(400).json({error: "La suppression a echoué!"}))
}


function getOneStructure(req, res, next){
   
    Structure.findOne({_id: req.params.id, estActif: {$eq: 1}})
    .then(structure=> {
        if(!structure){
            structure=[] 
        }
        res.status(200).json(structure)
    })
    .catch(error=> res.status(400).json(error))


}

function disableStructure(req, res, next){
    Structure.updateOne({_id:req.body.id},{estActif: 0}, {_id:req.body.id})
        .then(()=> res.status(200).json({succes: "La suppression logique de cette structure a réussi!"}))
       .catch(()=> res.status(400).json({error: "La modification a echoué!"}))
}

function counterNbOfServiceInStructure(req, res, next){
    Service.count({structureId: req.body.structureId,estActif: {$eq: 1}})
        .then(numberOfService=> res.status(200).json(numberOfService))
        .catch(error=> res.status(400).json(error))
}

function counterNbOfArchiveByStructure(req, res, next){
    Archive.count({structureId: req.body.structureId,estActif: {$eq: 1}})
        .then(numberOfArchive=> res.status(200).json(numberOfArchive))
        .catch(error=> res.status(400).json(error))
}




function counterNbOfDocumentInStructure(req, res, next){
    let compteurDoc=0
    Document.find({estActif: {$eq: 1}}).populate('serviceId')
        .then(doc=> {
            for (let i = 0; i < doc.length; i++) {
                if(doc[i].serviceId.structureId== req.body.structureId){
                    compteurDoc= compteurDoc+1
                }
            }
            res.status(200).json(compteurDoc)
        })
        .catch(error=> res.status(400).json(error))
}

function getAllStructure(req, res, next){
    Structure.find({})
    .then(structure=> {
        if(!structure){
            structure=[]
        }
        res.status(200).json(structure)
    })
    .catch(error=> res.status(400).json(error))
}




module.exports={
    ajoutStructure,
    counterNbOfServiceInStructure,
    counterNbOfDocumentInStructure,
    counterNbOfArchiveByStructure,
    disableStructure,
    modifStructure,
    deleteStructure,
    getOneStructure,
    getAllStructure,
}

