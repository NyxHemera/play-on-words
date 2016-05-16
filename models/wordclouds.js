var mongoose = require('mongoose');

var WordCloud = new mongoose.Schema({
	name: String,
	tags: [
		{
			text: String,
			weight: Number
		}
	],
	palette: Number,
	private: Boolean,
	image: String,
	mask: String
});

module.exports = mongoose.model('WordCloud', WordCloud);