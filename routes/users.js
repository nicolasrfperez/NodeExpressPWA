var express = require('express');
var router = express.Router();
var usersAdminController = require("../controllers/usersAdminController")

/* GET users listing. */

router.post('/register', usersAdminController.create)
router.post('/login', usersAdminController.validate)



module.exports = router;
