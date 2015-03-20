module.exports = function(app) {
	var db = app.custom.utils.dataSource(app)("mongo"),
			Schema = db.Schema,
			slugsSchema = new Schema({
				"slug"	: String,
				"url"		: String,
				"date"		 : Date,
				"modified"	 : Date,
			}),
			slugs = db.model('slugs', slugsSchema),
			fn = {
				insert: function(data, callback) {
					var newPost = new slugs(data);
					newPost.save(callback || function() { });
				},
				update: function(id, data, callback) {
						slugs.findByIdAndUpdate(id, { $set: data}, callback || function() { });
				},
				select: function(query, callback) {
					slugs.find(query, callback || function() { });
				},
				remove: function(id, callback) {
					slugs.findByIdAndRemove(id, callback || function(){});
				}
			};
	return fn;
};
