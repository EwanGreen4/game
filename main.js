function include() {
	for (var i = 0; i < arguments.length; i++) {
		var script  = document.createElement('script');
		script.src = arguments[i];
		document.getElementsByTagName('head').item(0).appendChild(script);
	}
}

include('types.js', 'menu.js');

document.addEventListener('keydown', function(event) {
	switch(event.keyCode) {
		case 37:
			alert('Left was pressed');
			break;
		case 39:
			alert('Right was pressed');

			break;
	}
});

function main() {

	var canvas = document.getElementById('canvas');
	canvas.width = 640;
	canvas.height = 440;
	var ctx = canvas.getContext('2d');
	//gameArea.context.drawImage(img, gameArea.width / 2, gameArea.height / 2);

	loadMainMenu();
}
