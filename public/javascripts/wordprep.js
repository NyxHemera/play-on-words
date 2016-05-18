/*this function will create an array of the input "words"*/

var parseWCString = function(userString) {
        var removeReturns = userString.replace(/\n/g, " ");
        var stripString = removeReturns.toLowerCase().replace(/[_+-.,!?$%^&*():~`;\\/|<>"]/g, '');
        // var removeArticles = stripString.
        var arrayOfWords = stripString.split(' ');

        return arrayOfWords;
}

/* This function will:
*   - sort the input array
*   - count the number of times each works appear in the arry
*   - build a new array with object that capture only unique words
*      and also frequency count from the original array
*
*  Input: array of words "words"
* Output: array of Objects "wordsObj"
*
*/
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
module.exports.createWCObj = createWCObj;
module.exports.createWCArray = createWCArray;
module.exports.getWCArr = getWCArr;
module.exports.getWCObj = getWCObj;