const express= require("express")
var CategorieDoc= require("../models/categoriedoc")
const user = require("../models/user")
const app= express()


function ajoutCategorieDoc(req, res, next){
    
     var categoriedoc= new CategorieDoc({
         ...req.body
     })
     categoriedoc.save()
         .then(()=> res.status(201).json({succes: "l'ajout a bien réussi!"}))
         .catch(()=> res.status(400).json({error: "l'ajout a echoué!"}))
}


function modifCategorieDoc(req, res, next){
    CategorieDoc.updateOne({_id:req.body.id},{...req.body}, {_id:req.body.id})
        .then(()=> res.status(200).json({succes: "La modification a bien réussi!"}))
       .catch(()=> res.status(400).json({error: "La modification a echoué!"}))
}



function deleteCategorieDoc(req, res, next){
    CategorieDoc.deleteOne({_id: req.params.id})
    .then(()=> res.status(200).json({succes: "La suppression a bien réussi!"}))
    .catch(()=> res.status(400).json({error: "La suppression a echoué!"}))
}


function getOneCategorieDoc(req, res, next){
   
    CategorieDoc.findOne({_id: req.params.id, estActif: {$eq: 1}}).populate('')
    .then(categoriedoc=> {
        if(!categoriedoc){
            categoriedoc=[] 
        }
        res.status(200).json(categoriedoc)
    })
    .catch(error=> res.status(400).json(error))


}

function getCategorieDocByService(req, res, next){
   
    CategorieDoc.find({serviceId: req.body.serviceId, estActif: {$eq: 1}})
    .then(categoriedoc=> {
        if(!categoriedoc){
            categoriedoc=[] 
        }
        res.status(200).json(categoriedoc)
    })
    .catch(error=> res.status(400).json(error))


}


function disableCategorieDoc(req, res, next){
    CategorieDoc.updateOne({_id:req.body.id},{estActif: 0}, {_id:req.body.id})
        .then(()=> res.status(200).json({succes: "La suppression logique de cette cette categorie de document a réussi!"}))
       .catch(()=> res.status(400).json({error: "La modification a echoué!"}))
}

function getAllCategorieDoc(req, res, next){
    CategorieDoc.find({estActif: 1})
    .then(categoriedoc=> {
        if(!categoriedoc){
            categoriedoc=[]
        }
        res.status(200).json(categoriedoc)
    })
    .catch(error=> res.status(400).json(error))
}




module.exports={
    ajoutCategorieDoc,
    disableCategorieDoc,
    modifCategorieDoc,
    deleteCategorieDoc,
    getOneCategorieDoc,
    getAllCategorieDoc,
    getCategorieDocByService,
}

