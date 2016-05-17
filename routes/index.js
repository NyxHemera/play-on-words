var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/users')

// Home Page
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express', message: req.flash() });
});

//users/:id/edit profile chg userprof.ejs

router.get('/users/:id/edit', function(req, res, next) {
  User.findById(req.params.id)
  .then(function(user) {
    if (!user) return next(makeError(res, 'Document not found', 404));
      //res.send("hi iam here");
      console.log('1');
    res.render('edituser', { user: user });
  }, function(err) {
    return next(err);
  });
});

// UPDATE
router.put('/users/:id', function(req, res, next) {
  User.findById(req.params.id) //find again..as its stateless like rails
  .then(function(user) {
    if (!user) return next(makeError(res, 'Document not found', 404));
    // user.local.email = req.body.local.email;
    // user.local.password= req.body.local.password;
    user.first_name = req.body.first_name;
    user.last_Name=req.body.last_Name;
    user.twitter = req.body.twitter;
    console.log(user);
    return user.save(); //merge w data in db
  })
  .then(function(saved) {
    res.redirect('/users'); //redirect to index routes
  }, function(err) {
    return next(err);
  });
});


// Signup Page
router.route('/signup')
	.get(function(req, res, next) {
		res.render('signup.ejs', { message: req.flash() });
	})
	.post(function(req, res, next) {
		var signUpStrategy = passport.authenticate('local-signup', {
			successRedirect: '/users',
			failureRedirect: '/signup',
			failureFlash: true
		});

		return signUpStrategy(req, res, next);
	});

// Login Page
router.route('/login')
	.get(function(req, res, next) {
		res.render('login.ejs', { message: req.flash() });
	})
	.post(function(req, res, next) {
		var loginProperty = passport.authenticate('local-login', {
			successRedirect: '/users',
			failureRedirect: '/login',
			failureFlash: true
		});

		return loginProperty(req, res, next);
	});


router.route('/wordcloud')
	.get(function(req, res, next) {
		res.render('tests/wordcloud.ejs', {});
	});

// Logout
router.get('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/');
});

module.exports = router;
