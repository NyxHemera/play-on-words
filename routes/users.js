var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Cloud = require('../models/wordclouds');

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
  res.send('<h1>USERS PAGE</h1>');
});

// GET User Profile
router.get('/:id', authenticate,function(req, res, next) {
  User.findById(req.params.id)
  .populate('clouds')
  .exec(function(err, user) {
    res.render('user.ejs', { user: user, title: 'Profile-'+user.first_name });
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

router.post('/:id/clouds', authenticate, function(req, res, next) {
  var CUID = ""+currentUser._id;
  console.log('req.body');
  if(CUID === req.params.id) {
    var cloud = {
      name: "Default Name",
      text: req.body.text,
      user: currentUser._id,
      palette: 0,
      private: false,
      image: req.body.image,
      mask: "",
      tags: req.body.tags
    };
    Cloud.create([cloud], function(err, clouds) {
      currentUser.clouds.push(clouds[0]._id);
      currentUser.save(function(err) {
        console.log(currentUser.clouds);
        console.log(currentUser.clouds[currentUser.clouds.length - 1]);
        var CID = currentUser.clouds[currentUser.clouds.length-1];
        res.redirect('/users/'+CUID+'/clouds/'+CID);
      });
    });
  }else {
    res.redirect('/');
  }
});

// GET Cloud Page
router.get('/:id/clouds/:cid', authenticate, function(req, res, next) {
  var CUID = ""+currentUser._id;
  if(CUID === req.params.id) {
    Cloud.findById(req.params.cid)
    .then(function(cloud) {
      res.render('cloud.ejs', {
        user: currentUser,
        title: 'Cloud-'+cloud.name,
        cloud: cloud
      });
    });
  }else {
    res.redirect('/');
  }
});

module.exports = router;
