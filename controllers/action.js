const express= require("express")
var Action= require("../models/action")
const user = require("../models/user")
const app= express()

function ajoutAction(req, res, next){
     var action= new Action({
         ...req.body
     })
     action.save()
         .then(()=> res.status(201).json({succes: "l'ajout a bien réussi!"}))
         .catch(()=> res.status(400).json({error: "l'ajout a echoué!"}))
}


function modifAction(req, res, next){
    Action.updateOne({_id:req.body.id},{...req.body}, {_id:req.body.id})
        .then(()=> res.status(200).json({succes: "La modification a bien réussi!"}))
       .catch(()=> res.status(400).json({error: "La modification a echoué!"}))
}



function deleteAction(req, res, next){
    Action.deleteOne({_id: req.params.id})
    .then(()=> res.status(200).json({succes: "La suppression a bien réussi!"}))
    .catch(()=> res.status(400).json({error: "La suppression a echoué!"}))
}


function getOneAction(req, res, next){
   
    Action.findOne({_id: req.params.id, estActif: {$eq: 1}}).populate('')
    .then(action=> {
        if(!action){
            action=[] 
        }
        res.status(200).json(action)
    })
    .catch(error=> res.status(400).json(error))


}



function disableAction(req, res, next){
    Action.updateOne({_id:req.body.id},{estActif: 0}, {_id:req.body.id})
        .then(()=> res.status(200).json({succes: "La suppression logique de cette cette categorie de document a réussi!"}))
       .catch(()=> res.status(400).json({error: "La modification a echoué!"}))
}

function getAllAction(req, res, next){
    Action.find({estActif: 1})
    .then(action=> {
        if(!action){
            action=[]
        }
        res.status(200).json(action)
    })
    .catch(error=> res.status(400).json(error))
}




module.exports={
    ajoutAction,
    disableAction,
    modifAction,
    deleteAction,
    getOneAction,
    getAllAction,
}

