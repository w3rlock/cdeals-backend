var express = require('express');
var router = express.Router();


const upload = require('../uploadMiddleware');

const portfolioController = require('../controller/portfolio.controller');

const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'portfile', maxCount: 8 }])

router.post('/portfolio', cpUpload, portfolioController.createPortfolio)
router.get('/portfolio', portfolioController.getPortfolioByUser)
router.get('/portfolio/:filename', portfolioController.getAvatar)
router.get('/links/:id', portfolioController.getLinks)
router.put('/links', portfolioController.updateLinks)
router.get('/files', portfolioController.getFiles)
router.put('/portfolio', cpUpload, portfolioController.updatePortfolio)


module.exports = router;
