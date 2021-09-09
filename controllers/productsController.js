const productsModel = require("../models/productsModels");
 
module.exports = {
    getAll: async function(req, res, next) {
        try{
            console.log(req.body.tokenData);
            const products =  await productsModel.find({}).populate("category")
    
           // res.send('GET PRODUCT');
            res.status(200).json(products)

        }
       catch(err) {
           next(err);
       }
    },

    getById: async function(req, res, next) {
        try{
            
        const product =  await productsModel.findById(req.params.id)
        if(!product){
            res.status(200).json({msg:"no existe el producto"})
            return;
        }
    res.status(200).json(product)
    res.send('GET PRODUCT ID');
    console.log(req.params.id)

        }
        catch(err){
            next(err)
        }
    },
    create: async function(req, res, next) {
        console.log(req.body.tokenData)
        try{
            const product = new productsModel({
                name:req.body.name,
                sku:req.body.sku,
                description:req.body.description,
                price :req.body.price,
                quantity:req.body.quantity,
                category:req.body.category,
                tags:req.body.tags
            })
            console.log(" paso por aca"+ req.body.price)
            const document = await
            product.save();
        
            res.status(201).json(document);
        }
        catch (err) {
            console.log(err)
            next(err);
        }
       
    },
    
   
    update: async function(req, res, next) {
        try{
            console.log(req.params.id, req.body);
            const  product = await productsModel.update({_id: req.params.id}, req.body, {multi:false})
            res.send('PUT PRODUCT');
            res.json(product)
        }
        catch(err){
            next(err)
        }
    },
    delete: async function(req, res, next) {
        try{
            const product = await productsModel.deleteOne({_id: req.params.id})
        console.log(req.params.id)
        res.json({product})
        res.send('GET PRODUCT');
        res.status(200).json(product)

        }
        catch(err){
            next(err);
        }
    },
}