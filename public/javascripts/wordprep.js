/*this function will create an array of the input "words"*/
 function arrayFromUser(userString) {
        // var randomWords = "Apples* Ora\"nges\"! Man/go";
        var stripString = userString.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`\"~()]/g, '');
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
function findDup(words) {
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
} //function findDup

function buildArr (wordsObj){
  var newArr = [];

  wordsObj.forEach(function(obj) {
    if (obj.display) {
     // var innerArray = [obj.text, obj.weight];
      // output.push(innerArray);
      newArr.push([obj.text, obj.weight]);
    }
  });

  return (newArr);

} //function buildArr


var wordsObj = [];
var wordsArray = ["aah", "this", "c", "this", "c", "d", "happy","happy"]
var words = "Adele announced on Monday that 25's third single will be Send My Love (To Your New Lover), one of the few songs on the album that have not directly led me to a cold puddle of tears. Unlike its predecessors Hello and When We Were Young, this song is one of the more hopeful and upbeat tracks of the album. If you don't believe me, then what's with all the pretty flowers on Adele's dress, seen here in a preview of the single's music video? ";
arrayOfWords = arrayFromUser(words);

wordsObj = findDup(arrayOfWords);

//testing array Object build
wordsObj.forEach(function(item) {
  console.log(item);
});

var feedArr = buildArr(wordsObj);

//testing 2D
feedArr.forEach(function(item){
  console.log(item);
});
