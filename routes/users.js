var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log(global.currentUser);
  res.send('<h1>USERS PAGE</h1>');
});

// GET User Profile
router.get('/:id', function(req, res, next) {
	console.log(req.params);
	User.findById(req.params.id, function(err, user) {
		res.render('user.ejs', { user: user, title: 'Profile-'+user.first_name });
		//res.send('<h1>User '+ user.first_name +'</h1> <a href="/users/'+ user._id +'/clouds/0">Cloud</a>');
	});
});

// GET Cloud Page
router.get('/:id/clouds/:index', function(req, res, next) {
	console.log(req.params);
	User.findById(req.params.id, function(err, user) {
		res.render('cloud.ejs', {
			user: user,
			title: 'Cloud-'+user.clouds[req.params.index].name,
			cloud: user.clouds[req.params.index]
		});
		//res.send('<h1>Cloud '+ user.clouds[req.params.index].name +'</h1>');
	});
});

module.exports = router;