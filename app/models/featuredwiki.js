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

RevisionSchema.statics.findLongestHistory = function(callback) {
    return this.aggregate(
            {$group:{_id:"$title",timestamp:{$min:"$timestamp"}}},
            {$sort:{timestamp:1}},
            {$limit:1}
    )
        .exec(callback)
}

RevisionSchema.statics.findShortestHistory = function(callback) {
        return this.aggregate(

                {$group:{_id:"$title",timestamp:{$min:"$timestamp"}}},
                {$sort:{timestamp:-1}},
                {$limit:1}
        )
            .exec(callback)
}

RevisionSchema.statics.findUserType = function (callback) {
    return this.aggregate([
        {$group:{_id:{usertype:"$userType"}, numOfUsers: {$sum:1}}}
    ])
        .exec(callback)
}

RevisionSchema.statics.findDistribution = function (callback) {
    return this.aggregate([
        {$group:{_id:{ year:{"$substr": ["$timestamp", 0, 4 ]}, usertype:"$userType"},numOfUsers: {$sum:1}}},
        {$sort:{'_id.year': 1}}
    ])
        .exec(callback)
}

RevisionSchema.statics.findArticleTitles = function (callback) {
    return this.aggregate([
        {$group:{_id:'$title'}},
        {$sort:{'_id': 1}}
    ])
        .exec(callback)
}


RevisionSchema.statics.findNumOfRevisions = function (title, callback) {
    return this.aggregate([
        {$match: {'title': title}},
        {$group: {_id: null, count: {$sum: 1}}}
    ])
        .exec(callback)
}

RevisionSchema.statics.findRegularUsers = function (title, callback) {
    return this.aggregate([
        {$match: {'title':title, 'userType':'regular'}},
        {$group: {_id: '$user',numOfRevs: {$sum: 1}}},
        {$sort: {numOfRevs:-1}},
        {$limit: 5}
    ])
        .exec(callback)
}

RevisionSchema.statics.findDistributionIndi = function (title, callback) {
    return this.aggregate([
		{$match:{'title':title}}
        {$group:{_id:{ year:{"$substr": ["$timestamp", 0, 4 ]}, usertype:"$userType"},numOfUsers: {$sum:1}}},
        {$sort:{'_id.year': 1}}
    ])
        .exec(callback)
}

RevisionSchema.statics.findUserTypeIndi = function (title, callback) {
    return this.aggregate([
		{$match:{'title': title}},
        {$group:{_id:{usertype:"$userType"}, numOfUsers: {$sum:1}}}
    ])
        .exec(callback)
}

RevisionSchema.statics.findDistributionByRegUsers = function (title, user, callback) {
    return this.aggregate([
        {$match: {'title':title, 'user': user}}
        {$group:{_id: '$timestamp', revsByYear: "$substr": [ "$timestamp", 0, 4 ]}}
    ])
    .exec(callback)
}


var Revision = mongoose.model('Revision', RevisionSchema, 'revisions')

module.exports = Revision