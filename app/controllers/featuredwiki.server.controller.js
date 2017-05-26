var Featuredwiki = require("../models/featuredwiki.js")
var async = require('async')

module.exports.showIndex=function(req,res){
	var mostRevisions, leastRevisions, mostEdits, leastEdits, longestHis, shortestHis, distribution, userType;
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
	        	})}
	        	,
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
	        		})}
	        	,
	        	function(callback){
		        	Featuredwiki.findMostEdits(function(err,result){
		        		if (err){
		        			console.log("Error")
		        		}else{
		        			console.log(result)
		        			mostEdits = result
		        			console.log(mostEdits[0]._id.title)
		                    callback();
		        		}
		        	})}
				,
		        	function(callback){
			        	Featuredwiki.findLeastEdits(function(err,result){
			        		if (err){
			        			console.log("Error")
			        		}else{
			        			console.log(result)
			        			leastEdits = result
			        			console.log(leastEdits[0]._id.title)
			                    callback();
			        		}
			        	})}
				,
			        	function(callback){
				        	Featuredwiki.findLongestHistory(function(err,result){
				        		if (err){
				        			console.log("Error")
				        		}else{
				        			console.log(result)
				        			longestHis = result
				        			console.log(longestHis[0]._id)
				                    callback();
				        		}
				        	})}
				,
				        	function(callback){
					        	Featuredwiki.findShortHistory(function(err,result){
					        		if (err){
					        			console.log("Error")
					        		}else{
					        			console.log(result)
					        			shortestHis = result
					        			console.log(shortestHis[0]._id)
					                    callback();
					        		}
					        	})}
        		,
        					function(callback){
            					Featuredwiki.findUserType(function(err,result){
                					if (err){
										console.log("Error")
               					 	}else{
                    					console.log(result)
                    					userType = result
                    					console.log(userType[0]._id)
                    					callback();
                					}
								})}
                ,
                            function(callback){
                                Featuredwiki.findDistribution(function(err,result){
                                    if (err){
                                        console.log("Error")
                                    }else{
                                        console.log(result)
                                        distribution = result
                                        console.log(distribution[0]._id)
                                        callback();
                                    }
                                })}

	],function(err,result){ 
		res.render("featuredwiki.pug", {
			mostRevisions:mostRevisions[0]._id,
			leastRevisions:leastRevisions[0]._id,
			mostEdits: mostEdits[0]._id.title,
			leastEdits: leastEdits[0]._id.title
			longestHis: longestHis[0]._id,
			shortestHis: shortestHis[0]._id,
            distribution: distribution[0]._id,
            userType: userType[0]._id
		});
    });

	
	
}
