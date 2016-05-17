var express = require('express');
var router = express.Router();
var User = require('../models/users');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

function authenticate(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/');
  }
  else {
    next();
  }
}
// GET Users listing
router.get('/', authenticate, function(req, res, next) {
	console.log(global.currentUser);
  console.log(currentUser);
  res.send('<h1>USERS PAGE</h1>');
});

// GET User Profile
router.get('/:id', authenticate,function(req, res, next) {
	console.log(req.params);
	User.findById(req.params.id, function(err, user) {
		res.render('user.ejs', { user: user, title: 'Profile-'+user.first_name });
		//res.send('<h1>User '+ user.first_name +'</h1> <a href="/users/'+ user._id +'/clouds/0">Cloud</a>');
	});
});

// GET User Edit
router.get('/:id/edit', authenticate,function(req, res, next) {

  if (currentUser._id.equals(req.params.id)) {
    User.findById(req.params.id)
    .then(function(user) {
      if (!user) return next(makeError(res, 'Document not found', 404));
        res.render('edituser', { user: user });
    }, function(err) {
      return next(err);
    });
  } //if currentUser same as id, then allow update
  else {
    res.redirect('/users/'+ currentUser._id);
  }
});

// UPDATE User (NEEDS AUTHORIZATION WITH REDIRECT)
router.put('/:id',authenticate, function(req, res, next) {
  User.findById(req.params.id) //find again..as its stateless like rails
  .then(function(user) {
    if (!user) return next(makeError(res, 'Document not found', 404));
    // user.local.email = req.body.local.email;
    // user.local.password= req.body.local.password;
    console.log('body is ',req.body);
    user.first_name = req.body.first_name;
    user.last_Name=req.body.last_Name;
    user.twitter = req.body.twitter;
    console.log(user);
    return user.save(); //merge w data in db
  })
  .then(function(saved) {
    res.redirect('/users/'+user._id);
  }, function(err) {
    return next(err);
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
