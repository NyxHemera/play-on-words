//--------------------------------------------------------/
// this function will create an arrayOfWords              /
//--------------------------------------------------------/
var parseWCString = function(userString) {
        var removeReturns = userString.replace(/\n/g, " ");
        var stripString = removeReturns.toLowerCase().replace(/[_+-.,!?$%^&*():~`;\\/|<>"]/g, '');
        // var removeArticles = stripString.
        var arrayOfWords = stripString.split(' ');

        arrayOfWords = stripFillerWords(arrayOfWords);

        return arrayOfWords;
}
//-------------------------------------------------------/
// This function will strip all filler words from input  /
//-------------------------------------------------------/

var stripFillerWords = function(arrayOfWords) {

   var removeFillers=['the','or','and','but','of','in'];

   for (var i=0; i< arrayOfWords.length; i++){
    for (var j=0; j< removeFillers.length; j++){
       if (removeFillers[j] === arrayOfWords[i]){
          arrayOfWords.splice(i,1);
          i--;
          break;
       }
    }
   }
   return arrayOfWords;
 }

//-------------------------------------------------------/
//  This function will output array of Objects           /
//-------------------------------------------------------/

var createWCObj = function(words) {
    var newArr = [];
    var cnt = 1;
    var words = words.sort();

    for (var i = 1; i <= (words.length); i++) {

        if (words[i-1] === words[i]){
            cnt++;
        }
        else {
          newArr.push({text: words[i-1],
                         weight: cnt,
                         display: true});
          cnt = 1;
        }
    }
    return newArr;
} //function createWCObj

//-------------------------------------------------------/
//This will build 2D array from array of object          /
//-------------------------------------------------------/

var createWCArray = function(wordsObj){
  var newArr = [];

  wordsObj.forEach(function(obj) {
    if (obj.display) {
     // var innerArray = [obj.text, obj.weight];
      // output.push(innerArray);
      newArr.push([obj.text, obj.weight]);
    }
  });

  return newArr;
} //function createWCArray

// Returns array for the WC Generator
var getWCArr = function(textString) {
  return wordArr = createWCArray(getWCObj(textString));
}

// Returns an array filled with objects for the DB
var getWCObj = function(textString) {
  return wordObj = createWCObj(parseWCString(textString));
}

module.exports.parseWCString = parseWCString;
module.exports.stripFillerWords = stripFillerWords;
module.exports.createWCObj = createWCObj;
module.exports.createWCArray = createWCArray;
module.exports.getWCArr = getWCArr;
module.exports.getWCObj = getWCObj;
