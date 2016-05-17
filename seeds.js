var mongoose = require('mongoose');
var User = require('./models/users');
var WordCloud = require('./models/wordclouds');

mongoose.connect('mongodb://localhost/project3');

// our script will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}

console.log('removing old Users...');
User.remove({})
.then(function() {
  console.log('old Users removed');
  console.log('creating some new Users...');
  var user1  = new User({
    local: {
      email: 'test1@gmail.com',
      password: 'Password1234'
    },
    first_name: "John",
    last_Name: "Locke",
    twitter: "faketwit"
  });
  var user2  = new User({
    local: {
      email: 'test2@gmail.com',
      password: 'Password1234'
    },
    first_name: "Lois",
    last_Name: "Lane",
    twitter: "faketwit2"
  });
  var user3  = new User({
    local: {
      email: 'test3@gmail.com',
      password: 'Password1234'
    },
    first_name: "Jack",
    last_Name: "Bauer",
    twitter: "faketwit3"
  });
  //user1.clouds.push(cloud1);
  user1.local.password = user1.encrypt('Password1234');
  user2.local.password = user1.encrypt('Password1234');
  user3.local.password = user1.encrypt('Password1234');
  var users = [user1, user2, user3];
  return User.create(users);
})
.then(function(savedUsers) {
  console.log('Just saved', savedUsers.length, 'Users');
  var cloud1 = new WordCloud({
    name: "testcloud",
    tags: [
      {
        text: "testtag1",
        weight: 33
      },
      {
        text: "testtag2",
        weight: 24
      },
      {
        text: "testtag3",
        weight: 26
      }
    ],
    palette: 0,
    private: false,
    image: "",
    mask: "",
    user: savedUsers[0]._id
  });
  cloud1.save(function(err, cloud) {
    savedUsers[0].clouds.push(cloud._id);
    savedUsers[0].save(function(err) {
      console.log('saved user with cloud');
      quit();
    });
  });
});