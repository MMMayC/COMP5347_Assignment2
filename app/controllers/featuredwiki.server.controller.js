var Featuredwiki = require("../models/featuredwiki.js")

module.exports.showIndex=function(req,res){
	res.render("featuredwiki.pug")
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
