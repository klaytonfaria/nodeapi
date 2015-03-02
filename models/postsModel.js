module.exports = function(app) {
	var db = app.custom.utils.mongoConnect(app),
			Schema = db.Schema,
			postsSchema = new Schema({
				"type"		 : String,
				"slug"		 : String,
				"url"		 : String,
				"title"		 : String,
				"content"	 : String,
				"excerpt"	 : String,
				"date"		 : Date,
				"modified"	 : Date,
				"categories" : [String],
				"tags"		 : [String],
				"published"	 : Boolean
			}),
			posts = db.model('posts', postsSchema),
			fn = {
				insert: function(data, callback) {
					var newPost = new posts(data);
					newPost.save(callback || function() { });
				},
				update: function(id, data, callback) {
						posts.findByIdAndUpdate(id, { $set: data}, callback || function() { });
				},
				select: function(query, callback) {
					posts.find(query, callback || function() { });
				},
				remove: function(id, callback) {
					posts.findByIdAndRemove(id, callback || function(){});
				}
			};
	return fn;
};
