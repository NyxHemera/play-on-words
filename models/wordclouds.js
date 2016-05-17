var mongoose = require('mongoose');

var WordCloud = new mongoose.Schema({
	name: String,
	tags: [],
	palette: Number,
	private: Boolean,
	image: String,
	mask: String,
	user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('WordCloud', WordCloud);