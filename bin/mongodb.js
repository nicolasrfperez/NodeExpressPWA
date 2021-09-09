const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pwa20202C', {useNewUrlParser: true, useUnifiedTopology: true}, function (error){
    if (error){
        throw error;
    }else{console.log('conectado a MongoDB')
    }
});
module.exports = mongoose;