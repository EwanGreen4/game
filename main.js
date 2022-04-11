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

function main() {
	gameArea.start()
}
