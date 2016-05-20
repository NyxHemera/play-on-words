//------------------------------------------------//
//  User Routes                                   //
//------------------------------------------------//
var express = require('express');
var router = express.Router();
var User = require('../models/users');
var isValidPassword = require('../public/javascripts/password.js');
var Cloud = require('../models/wordclouds');
var WordPrep = require('../public/javascripts/wordprep');

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

//------------------------------------------------//
//  Check if current user is same user as login   //
//------------------------------------------------//
function authorized(req) {
	return ""+currentUser._id === req.params.id;
}

//------------------------------------------------//
//  Check if cloud belongs to current user        //
//------------------------------------------------//
function cloudOwner(req) {
	var CID = req.params.cid;
	for(var i=0; i<currentUser.clouds.length; i++) {
		if(""+currentUser.clouds[i] === CID) return true;
	}
	console.log('cloudOwner - FAILED - '+req.params+' '+currentUser);
	return false;
}

//------------------------------------------------//
//  Home route for Current login user             //
//------------------------------------------------//
router.get('/', authenticate, function(req, res, next) {
  res.redirect('/users/'+currentUser._id);
  //res.render('users/index.ejs', {loggedIn: currentUser});
});

// GET User Profile
//------------------------------------------------//
//  Get User Profile                              //
//------------------------------------------------//
router.get('/:id', authenticate,function(req, res, next) {
  User.findById(req.params.id)
  .populate('clouds')
  .exec(function(err, user) {
    res.render('users/user.ejs', { user: user, title: 'Profile-'+user.first_name, owner: authorized(req), loggedIn: currentUser });
  });
});

//------------------------------------------------//
//  Edit/Get Current User Profile                 //
//------------------------------------------------//
router.get('/:id/edit', authenticate,function(req, res, next) {

  if (authorized(req)) {
    User.findById(req.params.id)
    .then(function(user) {
      if (!user) return next(makeError(res, 'Document not found', 404));
        res.render('users/edituser.ejs', { user: user, message: '', loggedIn: currentUser });
    }, function(err) {
      return next(err);
    });
  } //if currentUser same as id, then allow update
  else {
    res.redirect('/users/'+ currentUser._id);
  }
});


//------------------------------------------------//
//  Update User Profile                           //
//------------------------------------------------//
router.put('/:id',authenticate, function(req, res, next) {
  User.findById(req.params.id) //find again..as its stateless like rails
  .then(function(user) {
    if (!user) return next(makeError(res, 'Document not found', 404));
     var newPassword = req.body.password;
     console.log('newPassword:', newPassword);
     if (isValidPassword(newPassword)) {
        user.local.password=user.encrypt(newPassword);
        user.first_name = req.body.first_name;
        user.last_Name=req.body.last_Name;
        user.twitter = req.body.twitter;
      }
      else {
        res.render ('users/edituser.ejs', {user: user, message: 'Error: password has to be alphanumic plus at least one capital letter' });
        // res.redirect('/users/'+ currentUser._id + '/edit');
      }
      return user.save(); //merge w data in db
   })
  .then(function(saved) {
    res.redirect('/users/'+ currentUser._id);
  }, function(err) {
    return next(err);
  });
});

//------------------------------------------------//
//  Post generated Cloud                          //
//------------------------------------------------//
router.post('/:id/clouds', authenticate, function(req, res, next) {
  if(authorized(req)) {
    console.log(req.body);
    var p;
    if(req.body.private === 'on') {
      p = true;
    }else {
      p = false;
    }    
    var cloud = {
      name: req.body.name,
      text: req.body.text,
      user: currentUser._id,
      palette: 0,
      private: p,
      image: req.body.image,
      mask: ""
    };
    /*------------------------------------------------------
  		Tags were being sent through as a broken string,
  		generating the tag object inside of the route ensures
  		that the display property is included and the structure
  		of the data is preserved.
    ---------------------------------------------------------*/
    cloud.tags = WordPrep.getWCObj(cloud.text);
    Cloud.create([cloud], function(err, clouds) {
      currentUser.clouds.push(clouds[0]._id);
      currentUser.save(function(err) {
        var CID = currentUser.clouds[currentUser.clouds.length-1];
        res.redirect('/users/'+currentUser._id+'/clouds/'+CID);
      });
    });
  }else {
    res.redirect('/');
  }
});

//------------------------------------------------//
//  GET Cloud Page                                //
//------------------------------------------------//
router.get('/:id/clouds/:cid', authenticate, function(req, res, next) {
  if(authorized(req)) {
    Cloud.findById(req.params.cid)
    .then(function(cloud) {
      res.render('clouds/cloud.ejs', {
        user: currentUser,
        title: 'Cloud-'+cloud.name,
        cloud: cloud,
        loggedIn: currentUser
      });
    });
  }else {
    res.redirect('/');
  }
});

//------------------------------------------------//
//  PUT Cloud Page                                //
//------------------------------------------------//
router.put('/:id/clouds/:cid', authenticate, function(req, res, next) {
	// Needs extra authZ check to make sure cloud belongs to user ID
	if(authorized(req) && cloudOwner(req)) {
		Cloud.findById(req.params.cid)
		.then(function(cloud) {
			// If cloud doesn't exist, 404 error
			if (!cloud) return next(makeError(res, 'Document not found', 404));
      cloud.name = req.body.name;
			cloud.text = req.body.text;
      cloud.image = req.body.image;
      cloud.tags = WordPrep.getWCObj(cloud.text);
      console.log(req.body.private);
      if(req.body.private === 'on') {
        cloud.private = true;
      }else {
        cloud.private = false;
      }
			
			// cloud.palette = req.body.palette;
			return cloud.save();
		})
		.then(function(saved) {
			res.redirect('/users/'+req.params.id+'/clouds/'+req.params.cid);
		}, function(err) {
			return next(err);
		});
	}else {
		res.redirect('/');
	}
});

//------------------------------------------------//
//  DESTROY Cloud                                 //
//------------------------------------------------//
router.delete('/:id/clouds/:cid', authenticate, function(req, res, next) {
  if(authorized(req) && cloudOwner(req)) {
    Cloud.findByIdAndRemove(req.params.cid)
    .then(function() {
      res.redirect('/users/'+req.params.id);
    }, function(err) {
      return next(err);
    });
  }
});

module.exports = router;
