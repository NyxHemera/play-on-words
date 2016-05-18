function isValidPassword (password) {
  // var i = "/^(?=.\d)(?=.*[a-z])(?=.*[\W_].{8,}$/i)";
  if (!password) {
     return false;
   }

  if (password.length < 8 || password.length > 16) {
     console.log("too short or too long");
     return false;
   }
   else if(password.search(/[^A-Z]+/) < 1 ){
     console.log("invalid pw--no cap letter");
     return false;
   }
   else if (password.search((/[0-9]+/g)) < 1){
      console.log("pw , no digit");
      return false;
   }
   else if (password.search((/[a-z]+/g)) < 1){
      console.log("pw no lower case, no digit");
      return false;
   }
   else
      return true;
}

module.exports = isValidPassword;

