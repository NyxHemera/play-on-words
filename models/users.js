var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var User = new mongoose.Schema({
	local: {
		email: String,
		password: String
	}
});

User.methods.encrypt = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

User.methods.isValidPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);