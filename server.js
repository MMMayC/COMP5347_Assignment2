/**
 * The file to start a server
 *
 */

var express = require('express');
var path = require('path')

var fwroutes = require('./app/routes/featuredwiki.server.routes.js')

var app = express()

app.set('views', path.join(__dirname,'app','views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/',fwroutes)
app.listen(3000, function () {
	  console.log('Revision app listening on port 3000!')
	})
	
module.exports = app;