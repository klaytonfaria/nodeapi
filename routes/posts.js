module.exports = function(app) {
  var posts = require("../controllers/posts")(app);

  app.get(app.custom.paths.posts.default,   posts.getAll)
     .get(app.custom.paths.posts.single,    posts.getById)
     .post(app.custom.paths.posts.new,      posts.insert)
     .put(app.custom.paths.posts.update,    posts.update)
     .delete(app.custom.paths.posts.remove, posts.remove);
}
