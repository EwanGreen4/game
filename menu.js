//MIN-START
include("mouse.js", "audio.js");
//MIN-END

function loadMainMenu() {
	mouse.buttons.length = 0;

	let canvas = document.getElementById("canvas");
	let ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.w, canvas.h);

	ctx.fillStyle = "#ddffdd";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "#000000";
	ctx.font = "bold 48px serif";
	var text = "This is the game";
	var textMetrics = ctx.measureText(text);
	ctx.fillText(
		text,
		canvas.width / 2 - textMetrics.width / 2,
		canvas.height / 3
	);

	var height = Math.round((canvas.height / 3) * 2);
	var imgNew = new Image();
	imgNew.src = "resource/menuNew.png";
	imgNew.onload = function () {
		var newGameButton = {
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
		newGameMenu();
		const str = "resource/menuNewDown.png";
		if (this.src != str) this.src = str;
	};

	var imgLoad = new Image();
	imgLoad.src = "resource/menuLoad.png";
	imgLoad.onload = function () {
		ctx.drawImage(
			this,
			Math.round((canvas.width / 3) * 2 - this.width / 2),
			Math.round(height - this.height / 2)
		);
	};
	var imgSettings = new Image();
	imgSettings.src = "resource/menuSettings.png";
	imgSettings.onload = function () {
		ctx.drawImage(
			this,
			Math.round(canvas.width / 2 - this.width / 2),
			Math.round(height - this.height / 2)
		);
	};

	audio.loadFile("resource/elw-sick.xm");

	// 	window.XMPlayer.init();
	// 	audio.setSong("resource/elw-sick.xm")
}

function newGameMenu() {
	if (!audio.playing) audio.play();
	else audio.pause();
}

function loadSettingsMenu() {
	alert("Settings menu");
}

function loadInventoryMenu() {}
