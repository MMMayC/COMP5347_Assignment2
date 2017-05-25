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

var Revision = mongoose.model('Revision', RevisionSchema, 'revisions')

module.exports = Revision