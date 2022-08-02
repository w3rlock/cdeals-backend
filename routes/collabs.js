var express = require('express');
var router = express.Router();

const upload = require('../uploadMiddleware');

const collabController = require('../controller/collab.controller');

const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'portfile', maxCount: 8 }])


router.get('/collabs', collabController.getCollabs)
router.get('/collabs/:id', collabController.getCollabByUser)
router.post('/collabs', cpUpload, collabController.createCollab)
router.get('/collabid/', collabController.getCollabById)
router.put('/changestatus', collabController.changeStatus)




module.exports = router;
