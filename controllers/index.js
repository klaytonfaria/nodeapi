module.exports = function(app, mongojs) {
  appData = mongojs(app.custom.settings.DATABASE_NAME).collection("dumbPhrases");

  // Get all posts
  app.get(app.custom.paths.home.default, function(req, res) {
    var filter;
    if (req.params && req.params.id) {
      filter = {_id:mongojs.ObjectId(req.params.id)};
    }
    appData.find(filter, function (err, phrases) {
      if (err) {
          app.custom.utils.responseJSON(500, res, err);
        } else {
          app.custom.utils.responseJSON(200, res, {posts : phrases});
      }
    });
  });

}