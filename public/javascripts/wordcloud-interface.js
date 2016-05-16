// True for Canvas, False for HTML
var output = true;
var fadeTime = 300;
var arr = [
['apple', 22],
['banana', 24],
['orange', 18],
['pomegranate', 20],
['lemon', 30],
['tangerine', 26],
['guava', 16],
['papaya', 19],
['coconut', 21],
['strawberry', 23],
['melon', 25]
];

// Called on pageload
function initWC() {
	$('#wc-canvas').fadeIn(fadeTime, function() {});
}

/*
	Animations between regenerating not working. Needs work.
*/
function generateWC() {
	var wordArr = arr; // Should grab all variables instead
	if(output) {
/*		$('#wc-canvas').fadeOut(fadeTime, function() {
			$('#wc-canvas').fadeIn(fadeTime, function(){});
			generateCanvasWC(wordArr);
		});*/
		generateCanvasWC(wordArr);
	}else{
/*		$('#wc-div').fadeOut(fadeTime, function() {
			$('#wc-div').fadeIn(fadeTime, function() {});
			generateHTMLWC(wordArr);
		});*/
		generateHTMLWC(wordArr);
	}
}

function generateHTMLWC(wordArr) {
	WordCloud(document.getElementById('wc-div'), {
		list: wordArr
	});
}

function generateCanvasWC(wordArr) {
	WordCloud(document.getElementById('wc-canvas'), {
		list: wordArr
	});
}

// Switches between Canvas and HTML WordClouds
function switchWC() {
	if(output) {
		$('#wc-div').fadeOut(fadeTime, function() {
			$('#wc-canvas').fadeIn(fadeTime, function() {});
			generateWC();
		});
	}else {
		$('#wc-canvas').fadeOut(fadeTime, function() {
			$('#wc-div').fadeIn(fadeTime, function() {});
			generateWC();
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
		canvas.width = window.innerWidth/2;
		canvas.height = window.innerHeight/2;
		generateWC();
	}

	// Start with both elements hidden
	$('#wc-canvas').fadeOut(0, function(){});
	$('#wc-div').fadeOut(0, function(){});

	resizeCanvas();
	initWC();
});