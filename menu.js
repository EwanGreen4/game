//MIN-START
include("mouse.js", "audio.js");
//MIN-END

const mainMenuEnum = {
    invalid: 0,
    newGame: 1,
    loadGame: 2,
    settings: 3
}
function loadMainMenu() {
    let conclusion = mainMenuEnum.invalid
	mouse.buttons.length = 0;

	let canvas = document.getElementById("canvas");
	let ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.w, canvas.h);

	ctx.fillStyle = "#ddffdd";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "#000000";
	ctx.font = "bold 48px serif";
	let text = "test";
	let textMetrics = ctx.measureText(text);
	ctx.fillText(
		text,
		canvas.width / 2 - textMetrics.width / 2,
		canvas.height / 3
	);

	let height = Math.round((canvas.height / 3) * 2);
	let imgNew = new Image();
	imgNew.src = "resource/menuNew.png";
	imgNew.onload = function () {
		let newGameButton = {
			x: Math.round(canvas.width / 3 - this.width / 2),
			y: Math.round(height - this.height / 2),
			w: imgNew.width,
			h: imgNew.height,
			elem: imgNew,
		};
		mouse.buttons.push(newGameButton);

		ctx.drawImage(this, newGameButton.x, newGameButton.y);
	};
	imgNew.onmouseenter = function () {
		this.src = "resource/menuNewHover.png";
	};
	imgNew.onmouseleave = function () {
		this.src = "resource/menuNew.png";
	};
	imgNew.onmouseup = function () {
		this.src = "resource/menuNewHover.png";
	};
	imgNew.onmousedown = function () {
		this.src = "resource/menuNewDown.png";
        conclusion = mainMenuEnum.newGame
		newGameMenu();
	};

	let imgLoad = new Image();
	imgLoad.src = "resource/menuLoad.png";
	imgLoad.onload = function () {
		ctx.drawImage(
			this,
			Math.round((canvas.width / 3) * 2 - this.width / 2),
			Math.round(height - this.height / 2)
		);
	};
	let imgSettings = new Image();
	imgSettings.src = "resource/menuSettings.png";
	imgSettings.onload = function () {
		ctx.drawImage(
			this,
			Math.round(canvas.width / 2 - this.width / 2),
			Math.round(height - this.height / 2)
		);
	};

	audio.loadFile("resource/elw-sick.xm");
    
    //while(conclusion === mainMenuEnum.invalid) {
     //   console.log("test lol")
    //}
    return conclusion;
}

function newGameMenu() {
    
}
