var Featuredwiki = require("../models/featuredwiki.js")
var async = require('async')

module.exports.showIndex=function(req,res){
	var mostRevisions, leastRevisions, mostEdits, leastEdits, longestHis, shortestHis, distribution, userTypes;
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
                    					userTypes = result
                    					console.log(userTypes[0]._id)
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
			leastEdits: leastEdits[0]._id.title,
			longestHis: longestHis[0]._id,
			shortestHis: shortestHis[0]._id,
            distribution: distribution[0]._id,
            userType: userType[0]._id
		});
    });
	
	
}

module.exports.getIndividual = function (req, res) {

    var articleTitle, revisions, regularUsers, distribution, userTypesIndi, distributionByRegUsers

    async.series([

        function(callback){
            Featuredwiki.findTitle(function(err,result){
                if (err){
                    console.log("Error")
                }else{
                    console.log(result)
                    articleTitle = result
                    console.log(articleTitle[0]._id)
                    callback();
                }
            })}
        ,
        function(callback){
            Featuredwiki.findNumOfRevisions(function(err,result){
                if (err){
                    console.log("Error")
                }else{
                    console.log(result)
                    revisions = result
                    console.log(revisions[0]._id)
                    callback();
                }
            })}
        ,
        function(callback){
            Featuredwiki.findRegularUsers(function(err,result){
                if (err){
                    console.log("Error")
                }else{
                    console.log(result)
                    regularUsers = result
                    console.log(regularUsers[0]._id)
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
                    console.log(distribution[0]._id.title)
                    callback();
                }
            })}
        ,
        function(callback){
            Featuredwiki.findUserTypesIndi(function(err,result){
                if (err){
                    console.log("Error")
                }else{
                    console.log(result)
                    userTypesIndi = result
                    console.log(userTypesIndi[0]._id)
                    callback();
                }
            })}
        ,
        function(callback){
            Featuredwiki.findDistributionByRegUsers(function(err,result){
                if (err){
                    console.log("Error")
                }else{
                    console.log(result)
                    distributionByRegUsers = result
                    console.log(distributionByRegUsers[0]._id)
                    callback();
                }
            })}

    ],function(err,result){
        res.render("featuredwiki.pug", {
            articleTitle: articleTitle[0]._id,
            revisions: revisions[0]._id,
            regularUsers: regularUsers[0]._id.title,
            distribution: distribution[0]._id.title,
            userTypesIndi: userTypesIndi[0]._id,
            distributionByRegUsers: distributionByRegUsers[0]._id,
        })
    })


}

module.exports.selectDistriByUsers = function (req, res) {
    user = req.query.user
    Featuredwiki.findDistributionByRegUsers(user, function(err,result){
        if (err){
            console.log("Error")
        }else{
            console.log(result)
            distributionByRegUsers = result
            console.log(distributionByRegUsers[0]._id)
            res.render('featuredwiki.pug', {
                distributionByRegUsers: distributionByRegUsers[0]._id
            })
        }
    })
}