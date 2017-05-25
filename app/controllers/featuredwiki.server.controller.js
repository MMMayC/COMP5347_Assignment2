var Featuredwiki = require("../models/featuredwiki.js")
var async = require('async')

module.exports.showIndex=function(req,res){
	var mostRevisions, leastRevisions, mostEdits, leastEdits;
	async.series([
	           function(callback){
	          	Featuredwiki.findMostRevisions(function(err,result){
	        		if (err){
	        			console.log("Error")
	        		}else{
	        			console.log(result)
	        			mostRevisions = result
	        			console.log(mostRevisions[0]._id)
	                    callback();
	        		}	
	        	})},
		        function(callback){
	        	Featuredwiki.findLeastRevisions(function(err,result){
	        		if (err){
	        			console.log("Error")
	        		}else{
	        			console.log(result)
	        			leastRevisions = result
	        			console.log(leastRevisions[0]._id)
	                    callback();
	        		}	
	        	})},
	        	function(callback){
		        	Featuredwiki.findMostEdits(function(err,result){
		        		if (err){
		        			console.log("Error")
		        		}else{
		        			console.log(result)
		        			mostEdits = result
		        			console.log(mostEdits[0]._id)
		                    callback();
		        		}	
		        	})},
		        	function(callback){
			        	Featuredwiki.findLeastEdits(function(err,result){
			        		if (err){
			        			console.log("Error")
			        		}else{
			        			console.log(result)
			        			leastEdits = result
			        			console.log(leastEdits[0]._id)
			                    callback();
			        		}	
			        	})},
			        	function(callback){
				        	Featuredwiki.findMostEdits(function(err,result){
				        		if (err){
				        			console.log("Error")
				        		}else{
				        			console.log(result)
				        			mostEdits = result
				        			console.log(mostEdits[0]._id)
				                    callback();
				        		}	
				        	})},
				        	function(callback){
					        	Featuredwiki.findMostEdits(function(err,result){
					        		if (err){
					        			console.log("Error")
					        		}else{
					        			console.log(result)
					        			mostEdits = result
					        			console.log(mostEdits[0]._id)
					                    callback();
					        		}	
					        	})},
	],function(err,result){ 
		res.render("featuredwiki.pug", {mostRevisions:mostRevisions[0]._id,leastRevisions:leastRevisions[0]._id});
    });

	
	
}
