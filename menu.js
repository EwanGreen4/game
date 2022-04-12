function loadMainMenu() {
	var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

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
		ctx.drawImage(this, canvas.width / 3 - this.width / 2, height - this.height / 2);
	}
	var imgLoad = new Image;
	imgLoad.src = 'resource/menuLoad.png';
	imgLoad.onload = function() {
		ctx.drawImage(this, (canvas.width / 3 * 2)- this.width / 2, height - this.height / 2);
	}
    imgLoad.addEventListener('click', () => {
        alert("ee");
    });
	var imgSettings = new Image;
	imgSettings.src = 'resource/menuSettings.png';
	imgSettings.onload = function() {
		ctx.drawImage(this, canvas.width / 2 - this.width / 2, height - this.height / 2);
	}
        imgLoad.addEventListener('pointerover', () => {
            alert("e");
        } );
        
}

function loadSettingsMenu() {
	alert("Settings menu")
}

function loadInventoryMenu() {
	
}


