var express = require('express');
var router = express.Router();
var User = require('../models/users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('<h1>USERS PAGE2</h1>');
});

//users/:id/edit profile chg userprof.ejs

router.get('/:id/edit', function(req, res, next) {
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
router.put('/:id', function(req, res, next) {
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



module.exports = router;
