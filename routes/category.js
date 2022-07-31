var express = require('express');
var router = express.Router();
const categoryController = require('../controller/category.controller');


router.get('/category', categoryController.getListCategory)
router.get('/roles', categoryController.getListRoles)


module.exports = router;
