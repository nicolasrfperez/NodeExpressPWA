const mongoose = require("../bin/mongodb");


const tagsSchema = new mongoose.Schema({
    name :{
        type : String,
        required: true
    },
});
const productsSchema = new mongoose.Schema({
    name:{
        type: String,
        index:true,
        minlength:[1,"se debe colocolar al menos un caracter"],
        maxlength:255,
        trim:true,
        required:[true, "el campo name es obligatorio"]
        },
    sku:{
        type:String,
        minlength:1,
        maxlength:255,
        trim:true,
        required:true

    },
    description:{
        type:String,
        trim:true
    },
    status:{
        type:String,
        enum: ["pendiente","en_stock","activo"]
    },
    category:{
        type: mongoose.Schema.ObjectId,   
        ref: "categories"   
    },
    price :{
        type:String,
        min:1,
        required:true,
        get: function (masIva) {
            return masIva * 1.21;
        },
    },
    
    quantity:Number,

    tags: [tagsSchema],
});
productsSchema.virtual("price_currency").get(function (){
    return "$ " + this.price;
})
productsSchema.set("toJSON",{setters:true , getters:true, virtuals: true});
module.exports = mongoose.model ("products" , productsSchema);