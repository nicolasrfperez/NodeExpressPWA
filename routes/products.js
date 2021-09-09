var express = require('express');
var router = express.Router();
var productsController = require('../controllers/productsController');


    router.get('/', productsController.getAll );
    router.get('/:id', productsController.getById);
//    router.post('/',(req,res,next)=>{req.app.validateUser(req,res,next)}, productsController.create);
    router.post('/', productsController.create);

    router.put('/', productsController.update);
    router.delete('/:id', productsController.delete);
    
    

    module.exports = router