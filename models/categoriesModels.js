const mongoose = require("../bin/mongodb");



const categoriesSchema = new mongoose.Schema({
    name:String,

})
module.exports = mongoose.model("categories", categoriesSchema)