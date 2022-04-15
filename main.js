function include() {
	for (var i = 0; i < arguments.length; i++) {
		var script  = document.createElement('script');
		script.src = arguments[i];
		document.getElementsByTagName('head').item(0).appendChild(script);
	}
}

include('types.min.js', 'menu.min.js');

document.addEventListener('keydown', function(event) {
	switch(event.keyCode) {
		case 37:
			alert('Left was pressed');
			break;
		case 39:
			alert('Right was pressed');

			break;
            //this does work
	}
});

function main() {

	var canvas = document.getElementById('canvas');
	canvas.width = 640;
	canvas.height = 440;
        
    var rect = new Rect(100, 100, 100, 100);
    if(rect.contains(new Point(150, 150))) alert('test');
    
	loadMainMenu();
}
