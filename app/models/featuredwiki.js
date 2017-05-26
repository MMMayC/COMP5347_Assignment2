var mongoose = require('./db.js')

var RevisionSchema = new mongoose.Schema(
		{title: String, 
		 timestamp:String, 
		 user:String, 
		 anon:String},
		 {
			    versionKey: false 
		})

RevisionSchema.statics.findMostRevisions = function(callback){
	
	return this.aggregate(
			{$group: {_id: "$title", numOfRevs: {$sum: 1}}},
			{$sort: {numOfRevs: -1}},
			{$limit: 1}
			)
	.exec(callback)
}

RevisionSchema.statics.findLeastRevisions = function(callback){
	
	return this.aggregate(
			{$group: {_id: "$title", numOfRevs: {$sum: 1}}},
			{$sort: {numOfRevs: 1}},
			{$limit: 1}
			)
	.exec(callback)
}

RevisionSchema.statics.findMostEdits = function(callback){
	
	return this.aggregate(
        {$match:{"anon":{$exists: false}}},
        {$group:{_id:{title:"$title"}, uniqueCount: {$addToSet: "$user"},numOfEdits: {$sum:1}}},
        {$project:{"title":1,uniqueUserCount:{$size:"$uniqueCount"}}},
        {$sort:{uniqueUserCount:-1}},
        {$limit:1}
	)
	.exec(callback)
}

RevisionSchema.statics.findLeastEdits = function(callback){
	
	return this.aggregate(
        {$match:{"anon":{$exists: false}}},
        {$group:{_id:{title:"$title"}, uniqueCount: {$addToSet: "$user"},numOfEdits: {$sum:1}}},
        {$project:{"title":1,uniqueUserCount:{$size:"$uniqueCount"}}},
        {$sort:{uniqueUserCount:1}},
        {$limit:1}
			)
	.exec(callback)
}

RevisionSchema.statics.findLongestHistory = function(callback){

}

RevisionSchema.statics.findShortestHistory = function(callback){

}

var Revision = mongoose.model('Revision', RevisionSchema, 'revisions')

module.exports = Revision