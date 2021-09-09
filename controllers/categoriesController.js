const categoriesModel = require("../models/categoriesModels");
 
module.exports = {
    getAll: async function(req, res, next) {
        
        const category =  await categoriesModel.find({})

       // res.send('GET PRODUCT');
        res.json(category)
    },


    create: function(req, res, next) {
        console.log(req.body)
        const category = new categoriesModel({
            name:req.body.name,
        })
        console.log(" paso por aca"+ req.body)
        category.save();
        res.json(category);
    },
 }