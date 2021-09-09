const usersAdminModel = require("../models/usersAdminModels");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 
module.exports = {
   /* 
    validate: async (req, res, next) => {

        try{  console.warn(req.query);
            //console.warn(userAdmin);
            const userAdmin = await usersAdminModel.findOne({user:req.body.user});         
            //console.warn(userAdmin);
            if(userAdmin){
                //console.warn(userAdmin);
    
                if(bcrypt.compareSync(req.body.password,userAdmin.password)){
                        //user y pass ok
                     const token = jwt.sign({userId: userAdmin._id}, req.app.get("secretKey"));
                     res.json({message: "usuario y pass ok " , token:token });
                    }else{
                        res.json({message: "el password es incorrecto"});
                    }
                }else{
                    res.json({message: "usuario incorrecto"});
                }
    

            }
        catch(err){
                next(err);
            }
    },
*/
validate: async (req, res, next) => {
    try{
        console.log(req.query)
        const userAdmin = await usersAdminModel.findOne({user:req.body.user});
        if(userAdmin){
            if(bcrypt.compareSync(req.body.password,userAdmin.password)){
                //User y password ok, generar token
                const token = jwt.sign({userId:userAdmin._id},req.app.get("secretKey"),{expiresIn:"1h"});
                res.json({message:"usuario ok",token:token});
            }else{
                res.json({message:"password incorrecto"});
            }
        }else{
            res.json({message:"usuario incorrecto"});
        }
    }catch(e){
        next(e)
    }
    
},

    create: async function(req, res, next) {
        try{
            console.log(req.body)
            const userAdmin = new usersAdminModel({
                name:req.body.name,
                user:req.body.user,
                password:req.body.password
            })
    
           const document = await userAdmin.save();
            res.json(document);
        }catch(err){ 
            next(err)
        }
       
    },
 }