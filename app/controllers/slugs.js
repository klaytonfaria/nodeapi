module.exports = function(app) {
  var model = require("../models/slugsModel")(app);

  return {
    name: "slugs",

    // Get all slugs
    getAll: function(req, res) {
      model.select({}, function(err, data) {
        if(err) {
          app.custom.utils.responseJSON(500, res, err);
        } else {
          app.custom.utils.responseJSON(200, res, {slugs : data});
        }
      });
    },

    // Get one slug
    getById: function(req, res) {
      var filter;
      if (req.params && req.params.id) {
        filter = {_id:req.params.id};
      }
      model.select(filter, function(err, data) {
        if(err) {
          app.custom.utils.responseJSON(500, res, err);
        } else {
          app.custom.utils.responseJSON(200, res, {slugs : data});
        }
      });
    },

    // Remove slug
    remove: function(req, res) {
      model.remove(req.params.id,
        function(err, data) {
          if(err) {
            app.custom.utils.responseJSON(500, res, err);
          } else {
            app.custom.utils.responseJSON(200, res, {message: "deleted"});
          }
        }
      );
    },

    // Create slug
    insert: function(req, res) {
      var doc = {
            "slug": slugfy(req.param("slug")),
            "url": "/slugs/#slugId",
            "date": new Date(),
            "modified": new Date()
          };
      model.insert(doc,
        function(err, data) {
          if(err) {
            app.custom.utils.responseJSON(500, res, err);
          } else {
            app.custom.utils.responseJSON(200, res, {message: "created"});
          }
        }
      );
    },

    // Update slug
    update: function(req, res) {
      var id = req.params.id,
          doc = {
            "slug": slugfy(req.param("slug")),
            "url": req.param("url"),
            "modified": new Date()
          };
      model.update(id, doc, function(err, data) {
        if(err) {
          app.custom.utils.responseJSON(500, res, err);
        } else {
          app.custom.utils.responseJSON(200, res, {message: "updated"});
        }
      });
    }

  }
};
