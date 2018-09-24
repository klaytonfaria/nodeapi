const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SlugsSchema = new Schema({
	"slug": String,
	"url": String,
	"date": Date,
	"modified": Date,
});

module.exports = mongoose.model('Slugs', SlugsSchema);
