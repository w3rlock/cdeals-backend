var express = require('express');
var router = express.Router();
const userController = require('../controller/user.controller');


router.post('/user', userController.createUser)
router.post('/user/login', userController.login)
router.get('/user', userController.getUser)
router.get('/user/:id', userController.getOneUser)
router.put('/user', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)
router.get('/userportfolio/', userController.getUserWithPortfolio)
router.get('/userlistportfolio', userController.getListUserWithPortfolio)
router.put('/userpoints', userController.updatePoints)


module.exports = router;
