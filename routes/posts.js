module.exports = function(app) {
  var posts = require("../controllers/posts")(app);

  // Get all posts
  app.get(app.custom.paths.posts.default, function(req, res) {
    posts.getAll(req, res);
  });

  // Get single post
  app.get(app.custom.paths.posts.single, function(req, res) {
    posts.getOne(req, res);
  });

  // Remove post
  app.delete(app.custom.paths.posts.remove, function(req, res) {
    posts.remove(req, res);
  });

  // Create post
  app.post(app.custom.paths.posts.new, function(req, res) {
    posts.insert(req, res);
  });

  // Update post
  app.put(app.custom.paths.posts.update, function(req, res) {
    posts.update(req, res);
  });

}
