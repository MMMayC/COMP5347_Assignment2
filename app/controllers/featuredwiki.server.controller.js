var Featuredwiki = require("../models/featuredwiki.js")
var Async = require('async')

module.exports.showIndex=function(req,res){
	var mostRevisions, leastRevisions, mostUsers, leastUsers;
	Featuredwiki.findMostRevisions(function(err,result){
		if (err){
			console.log("Error")
		}else{
			console.log(result)
			mostRevisions = result
			console.log(mostRevisions[0]._id)
			res.render("featuredwiki.pug", {mostRevisions:mostRevisions[0]._id})
		}	
	})
	Featuredwiki.findLeastRevisions(function(err,result){
		if (err){
			console.log("Error")
		}else{
			console.log(result)
			leastRevisions = result
			console.log(leastRevisions[0]._id)
			res.render("featuredwiki.pug", {mostRevisions:mostRevisions[0]._id})
		}	
	})
	
	
}



module.exports.getLatest=function(req,res){
	title = req.query.title

	Featuredwiki.findTitleLatestRev(title, function(err,result){
		
		if (err){
			console.log("Cannot find " + title + ",s latest revision!")
		}else{
			console.log(result)
			revision = result[0]
			res.render('revision.pug',{title: title, revision:revision})
		}	
	})	

}
