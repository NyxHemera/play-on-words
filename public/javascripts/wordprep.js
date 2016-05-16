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

    var words = words.sort();
    var cnt = 1;
    for (var i = 1; i < (words.length); i++) {
        if (words[i-1] === words[i]){
            cnt++;
        }
        else {
          wordsObj.push({text: words[i-1],
                         weight: cnt,
                         display: false});
          cnt = 1;
        }
    }
    return wordsObj;
} //function findDup

var wordsObj = [];
var wordsArray = ["aah", "this", "c", "this", "c", "d", "happy","happy"];
findDup(wordsArray);

//print out result for testing
for (var i = 0; i < wordsArray.length; i++){
    console.log(wordsObj[i]);
}
