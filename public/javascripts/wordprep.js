/*this function will create an array of the input "words"*/
 $(function arrayFromUser() {
      $('.btnClick').click(function () {
        var randomWords = "Apples* Ora\"nges\"! Man/go";
        var stripString = randomWords.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`\"~()]/g, '');
        var arrayOfWords = stripString.split(' ');

        console.log(arrayOfWords);
      $('#container').html(arrayOfWords);

       });

    });



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
                         display: false});
          cnt = 1;
        }
    }
    return newArr;
} //function findDup

var wordsObj = [];
var wordsArray = ["aah", "this", "c", "this", "c", "d", "happy","happy"];
wordsObj = findDup(wordsArray);

//print out result for testing
for (var i = 0; i < wordsArray.length; i++){
    console.log(wordsObj[i]);
}

function buildArr (wordsObj){
  var newArr = [][];
  var j = 0;
  for (var i=0; i< wordsObj.length; i++){
    if wordsObj[i].display {
       newArr[j][0].push (wordsObj[i].text);
       newArr[j][1].push (wordsObj[i].weight);
       j ++;
    } //if display is true
  } //for loop
  return (newArr);

} //function buildArr

var feedArr = [][];

feedArr = buildArr(wordsObj);
for (var i = 0; i < feedArr.length; i++){
    console.log(feedArr[i]);
}
