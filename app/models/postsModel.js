const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostsSchema = new Schema({
		"type": String,
		"slug": String,
		"url": String,
		"title": String,
		"content": String,
		"excerpt": String,
		"date": Date,
		"modified": Date,
		"categories": [String],
		"tags": [String],
		"published": Boolean
	});

module.exports = mongoose.model('Posts', PostsSchema);
