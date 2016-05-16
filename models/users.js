var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var wordcloud = require('../models/wordclouds');

var User = new mongoose.Schema({
	local: {
		email: String,
		password: String
	},
	first_name: String,
	last_Name: String,
	twitter: String,
	clouds: [wordcloud]
});

User.methods.encrypt = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

User.methods.isValidPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);
