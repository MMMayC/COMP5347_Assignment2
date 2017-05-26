var express = require('express')
var controller = require('../controllers/featuredwiki.server.controller.js') 
var router = express.Router()

router.get('/', controller.showIndex)
router.get('/getIndividual', controller.getIndividual)
router.get('/selectDistriByUsers', controller.selectDistriByUsers)
module.exports = router