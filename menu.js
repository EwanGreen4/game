var buttons = [];
document.getElementById('canvas').addEventListener('click', function(event) {
    // Collision detection between clicked offset and element.
    var canvas = document.getElementById('canvas');
    let x = event.x - canvas.offsetLeft, y = event.y - canvas.offsetTop;

    for(const button of buttons)
    {
        if(x > button.x && y > button.y && x < button.x+button.w && y < button.y+button.h)
        {
            button.onClick();
        }
    }

}, false);

function loadMainMenu() {
    buttons.length = 0;

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d'); 
    ctx.clearRect(0, 0, canvas.w, canvas.h);


	ctx.fillStyle = '#ddffdd';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = '#000000';
	ctx.font = "bold 48px serif";
	var text = "This is the game";
	var textMetrics = ctx.measureText(text);
	ctx.fillText(text, canvas.width / 2 - textMetrics.width / 2, canvas.height / 3);
	
	var height = canvas.height / 3 * 2;
	var imgNew = new Image;
	imgNew.src = 'resource/menuNew.png';
	imgNew.onload = function() {
        var newGameButton = {x: canvas.width / 3 - this.width / 2, y: height - this.height / 2, w: imgNew.width, h: imgNew.height, onClick: newGameMenu};
        buttons.push(newGameButton);
        ctx.drawImage(this, newGameButton.x, newGameButton.y);
	}
    
	var imgLoad = new Image;
	imgLoad.src = 'resource/menuLoad.png';
	imgLoad.onload = function() {
		ctx.drawImage(this, (canvas.width / 3 * 2)- this.width / 2, height - this.height / 2);
	}
	var imgSettings = new Image;
	imgSettings.src = 'resource/menuSettings.png';
	imgSettings.onload = function() {
		ctx.drawImage(this, canvas.width / 2 - this.width / 2, height - this.height / 2);
	}
}

function newGameMenu()
{
    buttons.length = 0;
    
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d'); 
    ctx.clearRect(0, 0, canvas.w, canvas.h);
}

function loadSettingsMenu() {
	alert("Settings menu")
}

function loadInventoryMenu() {
	
}


