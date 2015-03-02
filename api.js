// Module dependencies
var express = require("express"),
    PrettyError = require('pretty-error'),
    app = express(),
    fs = require('fs'),
    http = require("http"),
    path = require("path"),
    mongo = require('mongoose'),
    utils = require("./extend/utils"),
    paths = require("./config/paths").paths,
    settings = require("./config/settings").constants;

// Pretty errors
var pe = new PrettyError();
pe.start();

// Configurations
app.configure(function() {
  app.use(express.logger('dev'));
  app.use(app.router);
  app.set('port', settings.SERVICES_PORT);
  // Custom app tools
  app.custom = app.custom || {};
  app.custom.utils = utils;
  app.custom.paths = paths;
  app.custom.settings = settings;
  app.custom.db = mongo;
});

// Routes
app.custom.utils.requireRecursive(app, "./routes/");

// Create and listen server application
http.createServer(app).listen(app.get('port'), function(){
  console.log('\x1b[34mAPI server listening on port: ' + app.get('port'));
});
