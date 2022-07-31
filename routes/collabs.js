var express = require('express');
var router = express.Router();
const collabController = require('../controller/collab.controller');

router.get('/collabs', collabController.getCollabs)
router.get('/collabs/:id', collabController.getCollabByUser)
router.post('/collabs', collabController.createCollab)
router.get('/collabid/', collabController.getCollabById)
router.put('/changestatus', collabController.changeStatus)




module.exports = router;
