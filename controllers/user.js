
const express= require("express")
// const bcrypt= require("bcrypt-nodejs")
const bcrypt= require("bcrypt")
const User= require("../models/user")
const app= express()
var jwt = require('../services/jwt');

 function ajoutUser(req, res, next){
    if(req.body.name && req.body.prenoms && req.body.telephone && req.body.type_user){
        bcrypt.hash(req.body.password,8)
            .then(hash=>{
                var user= new User()
                user.structureId= req.body.structureId || null,
                user.serviceId= req.body.serviceId || null,
                user.name= req.body.name
                user.prenoms= req.body.prenoms
                user.privilege= req.body.privilege
                user.telephone= req.body.telephone
                user.modifiedPwd= false
                user.password= hash
                user.type_user = req.body.type_user
                user.image= ""
                user.estActif=1,
                user.creationUserId= req.body.creationUserId,
                user.creationDate= req.body.creationDate,
                user.modifUserId= req.body.modifUserId,
                user.modifDate= req.body.modifDate,
                user.save()
                    .then(()=> res.status(201).json({succes: "l'ajout a bien réussi!"}))
                    .catch(error=>  res.status(500).json({error}))
            })
      
    }
    else{
        return res.status(500).json({error:"des champs vides"})
    }
     
}

function getUserByService(req, res, next){
    User.find({serviceId: req.body.serviceId, estActif: 1})
        .then(user=> res.status(200).json(user))
        .catch(error=> res.status(400).json(error))

}

function getUserByStructure(req, res, next){
    User.find({structureId: req.body.structureId ,estActif: 1})
        .then(user=> res.status(200).json(user))
        .catch(error=> res.status(400).json(error))
}

function modifUserPassword(req, res, next){
    User.findOne({telephone: req.body.telephone}, {estActif: 1})    
    .then(user=>{
        if(!user){
            return res.status(500).json({error: "cet utilisateur saisi n'existe pas dans notre système"})
        }
        else{
            bcrypt.hash(req.body.password, 8)
            .then(hash=>{
                User.updateOne({_id:req.body.id},{password: hash, modifiedPwd: true}, {_id:req.body.id})
                .then(()=> res.status(200).json({succes: "La modification du mot de passe a bien réussi!"}))
               .catch(()=> res.status(400).json({error: "La modification a echoué!"}))
            })  
        }
    })
    .catch(error=> res.status(200).send(error))
}


function modifUser(req, res, next){
    if(req.body.name && req.body.prenoms && req.body.telephone && req.body.type_user){

    User.updateOne({_id:req.body.id},{...req.body}, {_id:req.body.id})
        .then(()=> res.status(200).json({succes: "La modification a bien réussi!"}))
       .catch(()=> res.status(400).json({error: "La modification a echoué!"}))
    }
    else{
        return res.status(500).json({error:"des champs vides"})
    }
    }

 function disableUser(req, res, next){
    User.updateOne({_id:req.body.id},{estActif: 0}, {_id:req.body.id})
        .then(()=> res.status(200).json({succes: "La suppression logique de cet utilisateur a réussi!"}))
       .catch(()=> res.status(400).json({error: "La modification a echoué!"}))
}


function deleteUser(req, res, next){
    User.deleteOne({_id: req.params.id})
    .then(()=> res.status(200).json({succes: "La suppression a bien réussi!"}))
    .catch(()=> res.status(400).json({error: "La suppression a echoué!"}))

 
}

function disableUser(req, res, next){
    User.updateOne({_id:req.params.id},{estActif: 0}, {_id:req.params.id})
        .then(()=> res.status(200).json({succes: "La suppression logique de cet utilisateur a réussi!"}))
       .catch(()=> res.status(400).json({error: "La modification a echoué!"}))
}

function login(req, res, next){
    User.findOne({telephone: req.body.telephone, estActif: 1})    
        .then(user=>{
            if(!user){
                return res.status(500).json({error: "cet utilisateur saisi n'existe pas dans notre système"})
            }
             else if(user && user.estActif==0){
                 return res.status(500).json({error: "cet utilisateur est desactivé, contactez l'administrateur"})
             }

             else{
                bcrypt.compare(req.body.password, user.password)
                    .then(valid=>{
                        if(!valid){
                            return res.status(500).json({error: "le mot de passe saisi est incorrect"})
                        }
                        user.password= undefined
                        return res.status(200).json({
                            user: user,
                            token: jwt.createtoken(user)
                        })
                    })
             }
            
        })
        .catch(error=> res.status(200).send(error))
}

function getOneUser(req, res, next){
    User.findOne({_id: req.params.id, estActif: {$eq: 1}})
    .then((user)=> {
        if(user){
            user.password=undefined
        }
        else{
           user=[]
        }
        
        res.status(200).json(user)
    })
    .catch(error=> {console.log(error)})
}

function getAllUser(req, res, next){
    User.find({estActif: 1}).populate('structureId').populate('serviceId')
    .then(user=> {
        if(user){
            user.map(data=> data.password=undefined) 
        }
        else{
            user= []
        }
        res.status(200).json(user)
    })
    .catch(error=> res.status(400).json(error))
}

module.exports={
    ajoutUser,
    getUserByStructure,
    getUserByService,
    disableUser,
    login,
    modifUser,
    deleteUser,
    getOneUser,
    getAllUser,
    modifUserPassword
}

