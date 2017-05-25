var express = require('express')
var controller = require('../controllers/featuredwiki.server.controller.js') 
var router = express.Router()

router.get('/', controller.showTitleForm)
router.get('/getLatest', controller.getLatest)
module.exports = router