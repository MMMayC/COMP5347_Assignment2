var Featuredwiki = require("../models/featuredwiki.js")
var async = require('async')

module.exports.showIndex=function(req,res){
	var mostRevisions, leastRevisions, mostEdits, leastEdits, longestHis, shortestHis, distribution, userType, articleTitles;
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
			        			console.log(leastEdits[0]._id)
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
					        	Featuredwiki.findShortestHistory(function(err,result){
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
        ,
                    function(callback){
                        Featuredwiki.findArticleTitles(function(err,result){
                            if (err){
                                console.log("Error")
                            }else{
                                console.log(result)
                                articleTitles = result
                                console.log(articleTitles[0]._id)
                                callback();
                            }
                        })}

	],function(err,result){
		res.render("featuredwiki.pug", {
			mostRevisions:mostRevisions[0]._id,
			leastRevisions:leastRevisions[0]._id,
			mostEdits: mostEdits[0]._id.title,
			leastEdits: leastEdits[0]._id.title
            ,
            longestHis: longestHis[0]._id
            ,
            shortestHis: shortestHis[0]._id
            ,
            distribution: distribution
            ,
            userType: userType
            ,
            articleTitles: articleTitles
		});
    });
	
	
}

module.exports.getIndividual = function (req, res) {

    var revisions, regularUsers, distribution, userTypesIndi;

    title = req.query.title;

    async.series([

        function(callback){
            Featuredwiki.findNumOfRevisions(title, function(err,result){
                if (err){
                    console.log("Error")
                }else{
                    console.log(result)
                    revisions = result
                    callback();
                }
            })}
        ,
        function(callback){
            Featuredwiki.findRegularUsers(title, function(err,result){
                if (err){
                    console.log("Error")
                }else{
                    console.log(result)
                    regularUsers = result
                    callback();
                }
            })}
        ,
        function(callback){
            Featuredwiki.findDistributionIndi(title, function(err,result){
                if (err){
                    console.log("Error")
                }else{
                    console.log(result)
                    distribution = result
                    callback();
                }
            })}
        ,
        function(callback){
            Featuredwiki.findUserTypeIndi(title, function(err,result){
                if (err){
                    console.log("Error")
                }else{
                    console.log(result)
                    userTypesIndi = result
                    callback();
                }
            })}
    ],function(err,result){
        res.json({
                rev:revisions,
                reg:regularUsers,
                dis:distribution,
                userT:userTypesIndi
            }
        )
    })


}

module.exports.selectDistriByUsers = function (req, res) {
    var distributionByRegUsers;
    user = req.query.user;
    title = req.query.title;
    Featuredwiki.findDistributionByRegUsers(title, user, function(err,result){
        if (err){
            console.log("Error")
        }else{
            console.log(result);
            distributionByRegUsers = result;
            res.json(distributionByRegUsers)
        }
    })
}