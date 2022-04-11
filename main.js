class Point {
	constructor(x,y) {
		this.x = x;
		this.y = y;
	}
	static x;
	static y;
}

class Rect { //globally mapped rect
	static left = 0;
	static right = 0;
	static top = 0;
	static bottom = 0;
	
	constructor(x, y, w, h) {
		this.top = y;
		this.left = x;
		this.bottom = y + h;
		this.right = x + w;
	}
	center() { return new Point(right - (left / 2), top - (bottom / 2)); }
	topLeft() { return new Point(left, top); }
	topRight() { return new Point(right, top); }
	bottomLeft() { return new Point(left, bottom); }
	bottomRight() { return new Point(right, bottom); }
}
class Player {
	static x;
	static y;
}

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

var gameArea = {  
	canvas : document.createElement("canvas"),  
	start : function() {  
		this.canvas.width = 480;  
		this.canvas.height = 270;  
		this.context = this.canvas.getContext("2d");  
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);  
	}  
}  
var img = document.createElement("img");

function main() {
	gameArea.start();

	img.src = "resource/placeholder.png";
	gameArea.context.drawImage(img, gameArea.width / 2, gameArea.height / 2, 16, 16);
}
