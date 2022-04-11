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

var  myGameArea = {  
	canvas : document.createElement("canvas"),  
	start : function() {  
		this.canvas.width = 480;  
		this.canvas.height = 270;  
		thisthis.context = this.canvas.getContext("2d");  
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);  
	}  
}  
