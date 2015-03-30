var appPath = process.cwd() + "/",
    fs = require('fs'),
    path = require("path"),
    dataSources = require("../config/data_sources.json"),
    mongo = require('mongoose');


// Register all routes dinamically
exports.requireRecursive = function (app, folderName) {
  fs.readdirSync(folderName).forEach(function(file) {
    var fullName = path.join(folderName, file),
        stat = fs.lstatSync(fullName);
    if(file.substr(-3) == ".js") {
      if ( stat.isDirectory() ) {
        requireRecursive(fullName);
      } else if ( file.toLowerCase().indexOf('.js') ) {
        require(appPath + fullName)(app);
      }
    }
  });
}

// Utils
exports.responseJSON = function (status, res, content) {
  res
  .status(status)
  .header("Access-Control-Allow-Origin", "*")
  .header("Access-Control-Allow-Headers", "X-Requested-With")
  .end(JSON.stringify(content));
}

// Connect to dataSource
exports.dataSource = function (app) {
var ds = dataSources;
  return function (dbName) {
    mongo.createConnection(ds[dbName].host + ds[dbName].database, function (error) {
      if (error) {
        console.log('\x1b[31m'+error);
      }
    });
    return mongo;
  }
}
