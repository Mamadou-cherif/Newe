const express= require("express")
var Service= require("../models/service")
const user = require("../models/user")
const Document= require("../models/document")
const Archive= require("../models/archive")
const app= express()


function ajoutService(req, res, next){
     var service= new Service({
         ...req.body
     })
     service.save()
         .then(()=> res.status(201).json({succes: "l'ajout a bien réussi!"}))
         .catch(error=> {console.log(error)})
}



function modifService(req, res, next){
    Service.updateOne({_id:req.body.id},{...req.body}, {_id:req.body.id})
        .then(()=> res.status(200).json({succes: "La modification a bien réussi!"}))
       .catch(()=> res.status(400).json({error: "La modification a echoué!"}))
}



function deleteService(req, res, next){
    Service.deleteOne({_id: req.params.id})
    .then(()=> res.status(200).json({succes: "La suppression a bien réussi!"}))
    .catch(()=> res.status(400).json({error: "La suppression a echoué!"}))
}


function getOneService(req, res, next){
   
    Service.findOne({_id: req.params.id, estActif: {$eq: 1}})
    .then(service=> {
        if(!service){
            service=[] 
        }
        res.status(200).json(service)
    })
    .catch(error=> res.status(400).json(error))


}

function getServiceByStrucuture(req, res, next){
    
    Service.find({structureId: req.body.structureId, estActif: {$eq: 1}}).populate('structureId')
    .then(service=> {
        if(!service){
            service=[] 
        }
        res.status(200).json(service)
    })
    .catch(error=> res.status(400).json(error))


}

function disableService(req, res, next){
    Service.updateOne({_id:req.body.id},{estActif: 0}, {_id:req.body.id})
        .then(()=> res.status(200).json({succes: "La suppression logique de cette service a réussi!"}))
       .catch(()=> res.status(400).json({error: "La modification a echoué!"}))
}

function counterNbOfDocumentInService(req, res, next) {
    Document.count({'serviceId': req.body.serviceId, 'estActif': 1})
        .then(numberDocInService=> {
            console.log(numberDocInService)
            res.status(200).json(numberDocInService)
        })
        .catch(error=> res.status(400).json(error))
}

function counterNbOfArchiveInService(req, res, next){
    let compteurDoc=0

    Archive.find({estActif: 1}).populate('documentId')
        .then(doc=> {
            for (let i = 0; i < doc.length; i++) {
                if(doc[i].documentId.serviceId== req.body.serviceId){
                    compteurDoc = compteurDoc+1
                }
            }
            res.status(200).json(compteurDoc)
        })
        .catch(error=> res.status(400).json(error))
}
function getAllService(req, res, next){
    Service.find({estActif: 1})
    .then(service=> {
        if(!service){
            service=[]
        }
        res.status(200).json(service)
    })
    .catch(error=> res.status(400).json(error))
}




module.exports={
    getServiceByStrucuture,
    counterNbOfArchiveInService,
    counterNbOfDocumentInService,
    ajoutService,
    disableService,
    modifService,
    deleteService,
    getOneService,
    getAllService,
}

