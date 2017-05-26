var express = require('express')
var controller = require('../controllers/featuredwiki.server.controller.js') 
var router = express.Router()

router.get('/', controller.showIndex)
router.get('/getIndividual', controller.getIndividual)
router.get('/getDistriByUsers', controller.getDistriByUsers)
module.exports = router