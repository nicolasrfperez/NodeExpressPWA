const mongoose = require("../bin/mongodb");
const bcrypt = require('bcrypt');
const { isGoodPassword } = require("../utils/validators");
const { validateUser } = require("../app");
const validators = ("../utils/validators");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    user: {
        type:String,
        required: true,
        unique: true,
        validate:{
                validator: async function(v){
                    const document = await this.model("usersAdmin").findOne({user:v})
                    if(document){ 
                        return false;
                    }
                    return true;
        
            },
            message: "el {VALUE} ya existe",
        },
        
    },
    password: {
        type:String,
        required: true,
/*Minimo 8 caracteres
Maximo 15
Al menos una letra mayúscula
Al menos una letra minucula
Al menos un dígito
No espacios en blanco
Al menos 1 caracter especial
---- is good password (para validar expresion regular)regexp_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
*/
        validate:{
            
                validator: async function(v){
                    return isGoodPassword(v);
                },
                message: "el Password no cumple las condiciones"            
        },
        

    }
})
userSchema.statics.validateUser = async function(user,password){
    const userAdmin = await this.findOne({user:user});
    if(userAdmin){
        if(bcrypt.compareSync(password,userAdmin.password)){
            //User y password ok, generar token
            
            return {error:false,message:"usuario ok",userAdmin:userAdmin};
        }else{
            return {error:true,message:"password incorrecto"};
        }
    }else{
        return {error:true,message:"usuario incorrecto"};
    }


}
userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})
module.exports = mongoose.model("usersAdmin",userSchema);