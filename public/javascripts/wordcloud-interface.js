// True for Canvas, False for HTML
var output = true;
var fadeTime = 300;

// Called on pageload
function initWC() {
	$('#wc-canvas').fadeIn(fadeTime, function() {});
}

/*
	Animations between regenerating not working. Needs work.
*/
function generateWC(wordArr) {
	if(output) {
/*		$('#wc-canvas').fadeOut(fadeTime, function() {
			$('#wc-canvas').fadeIn(fadeTime, function(){});
			generateCanvasWC(wordArr);
		});*/
		generateCanvasWC(normalizeFontSizes(wordArr));
	}else{
/*		$('#wc-div').fadeOut(fadeTime, function() {
			$('#wc-div').fadeIn(fadeTime, function() {});
			generateHTMLWC(wordArr);
		});*/
		generateHTMLWC(normalizeFontSizes(wordArr));
	}
}

function normalizeFontSizes(wordArr) {
	// Temporary measure, need to have min and max
	var min = 10;
	var max = 0;
	var FSBASELINE = 50;

	// Add Floor to numbers
	for(var i=0; i<wordArr.length; i++) {
		wordArr[i][1] += min;
	}

	// Find min and max
	for(var i=0; i<wordArr.length; i++) {
		if(wordArr[i][1] < min) {
			min =  wordArr[i][1];
		}
		if(wordArr[i][1] > max) {
			max = wordArr[i][1];
		}
	}

	// Normalize based on percentages
	for(var i=0; i<wordArr.length; i++) {
		wordArr[i][1] = FSBASELINE * (wordArr[i][1] / max);
	}

	return wordArr;
}

function generateHTMLWC(wordArr) {
	WordCloud(document.getElementById('wc-div'), {
		list: wordArr
	});
}

function generateCanvasWC(wordArr) {
	$('#wc-canvas').fadeOut(200, function() {
		$('#wc-canvas').fadeIn(300, function() {

		});
			WordCloud(document.getElementById('wc-canvas'), {
				list: wordArr
			});
	});
}

// Switches between Canvas and HTML WordClouds
function switchWC() {
	if(output) {
		$('#wc-div').fadeOut(fadeTime, function() {
			$('#wc-canvas').fadeIn(fadeTime, function() {});
			generateWC(getWCArr($('#wc-text-input').val()));
		});
	}else {
		$('#wc-canvas').fadeOut(fadeTime, function() {
			$('#wc-div').fadeIn(fadeTime, function() {});
			generateWC(getWCArr($('#wc-text-input').val()));
		});
	}
}

function switchWCType() {
	output = !output;
	switchWC();
}

// Gives output of WordCloud
function outputWC() {
	if(output) {
		// CANVAS
		return document.getElementById('wc-canvas').toDataURL();
	}else {
		//HTML
		return document.getElementById('wc-div');
	}
}

$(document).ready(function() {
	var canvas = document.getElementById('wc-canvas');
	var ctx = canvas.getContext('2d');

	// Handles resize event and keeps canvas the proper size.
	window.addEventListener('resize', resizeCanvas, false);

	function resizeCanvas() {
		canvas.width = window.innerWidth/100*60;
		canvas.height = window.innerHeight/100*60;
		if($('#wc-text-input') === undefined) {
			generateWC(getWCArr($('#wc-text-input').val()));
		}else {
			//generateWC(getWCArr($('#cloud-about').text()));
			generateWC(getWCArr('What is a word cloud? It is an attractive arrangement of randomly positioned words, where the more frequent words are bigger than the others.  It is also a good wayto see what words are referenced more than others. What are they for Mostly for fun! ...and now you can try it out yourself by signing up. Login to see all the word cloud that others built too. wdi wdi wdi wdi wdi wdi wdi wdi wdi wdi  awesome awesome awesome awesome awesome awesome awesome awesome awesome awesome awesome'));
		}
	}

	// Start with both elements hidden
	$('#wc-canvas').fadeOut(0, function(){});
	$('#wc-div').fadeOut(0, function(){});

	resizeCanvas();
	initWC();
});
