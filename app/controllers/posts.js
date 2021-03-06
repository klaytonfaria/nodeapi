module.exports = function(app) {
  var model = require("../models/postsModel")(app),
      slugfy = require("slug"),
      slugs = require("../models/slugsModel")(app);

  return {
    name: "posts",

    // Get all posts
    getAll: function(req, res) {
      model.select({}, function(err, data) {
        if(err) {
          app.custom.utils.responseJSON(500, res, err);
        } else {
          app.custom.utils.responseJSON(200, res, {posts : data});
        }
      });
    },

    // Get one post
    getById: function(req, res) {
      var filter;
      if (req.params && req.params.id) {
        filter = {_id:req.params.id};
      }
      model.select(filter, function(err, data) {
        if(err) {
          app.custom.utils.responseJSON(500, res, err);
        } else {
          app.custom.utils.responseJSON(200, res, {posts : data});
        }
      });
    },

    // Remove post
    remove: function(req, res) {
      model.remove(req.params.id,
        function(err, data) {
          if(err) {
            app.custom.utils.responseJSON(500, res, err);
          } else {
            app.custom.utils.responseJSON(200, res, {message: 'deleted'});
          }
        }
      );
    },

    // Create post
    insert: function(req, res) {
      var doc = {
            "type": "post",
            "slug": slugfy(req.param("title")),
            "url": "/posts/" + slugfy(req.param("title")),
            "title": req.param("title") || "",
            "content": req.param("content") || "",
            "excerpt": req.param("excerpt") || "",
            "date": new Date(),
            "modified": new Date(),
            "categories": ["category"] || [],
            "tags": ["tag"] || []
          };

      model.insert(doc,
        function(err, data) {
          if(err) {
            app.custom.utils.responseJSON(500, res, err);
          } else {

            slugs.insert(doc);

            app.custom.utils.responseJSON(200, res, {message: 'created'});
          }
        }
      );
    },

    // Update post
    update: function(req, res) {
      var id = req.params.id,
          doc = {
            "title": req.param('name'),
            "modified": new Date()
          };
      model.update(id, doc, function(err, data) {
        if(err) {
          app.custom.utils.responseJSON(500, res, err);
        } else {
          app.custom.utils.responseJSON(200, res, {message: 'updated'});
        }
      });
    }

  }
};
