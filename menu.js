//MIN-START
include("mouse.js", "audio.js");
//MIN-END

let mainMenuData = {
    newGameButton: null,
    imgLoad: new Image(),
    imgSettings: new Image()
};
function loadMainMenu(canvas, ctx) {
	mouse.buttons.length = 0;

	ctx.clearRect(0, 0, canvas.w, canvas.h);

	let height = Math.round((canvas.height / 3) * 2);
	let imgNew = new Image();
	imgNew.src = "resource/menuNew.png";
	imgNew.onload = function () {
		mainMenuData.newGameButton = {
            wrect: {
                x: 0,
                y: 0,
                w: imgNew.width,
                h: imgNew.height
            },
			x: 0,
			y: 0,
			w: 0,
			h: 0,
			elem: imgNew,
		};
		mouse.buttons.push(mainMenuData.newGameButton);

		ctx.drawImage(this, mainMenuData.newGameButton.x, mainMenuData.newGameButton.y);
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
		loadNewGameMenu(canvas, ctx);
	};

	mainMenuData.imgLoad.src = "resource/menuLoad.png";
	mainMenuData.imgLoad.onload = function () {
		ctx.drawImage(
			this,
			Math.round((canvas.width / 3) * 2 - this.width / 2),
			Math.round(height - this.height / 2)
		);
	};
	mainMenuData.imgSettings.src = "resource/menuSettings.png";
	mainMenuData.imgSettings.onload = function () {
		ctx.drawImage(
			this,
			Math.round(canvas.width / 2 - this.width / 2),
			Math.round(height - this.height / 2)
		);
	};

	audio.loadFile("resource/elw-sick.xm");
}

function updateMainMenu(canvas, ctx, camera, frametime)
{
    updateCamera(gamedata.camera, gamedata.canvas, canvas.width/camera.sizefac, canvas.height/camera.sizefac);
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

    let height = Math.round((camera.h / 3) * 2);
    if(mainMenuData.newGameButton != null)
    {
        mainMenuData.newGameButton.wrect.x = Math.round(camera.w / 3 - mainMenuData.newGameButton.wrect.w / 2);
        mainMenuData.newGameButton.wrect.y = Math.round(height - mainMenuData.newGameButton.wrect.h / 2);
        drawSpriteScreen(ctx, camera, mainMenuData.newGameButton.elem, null, mainMenuData.newGameButton.wrect);
    }
    updateButtons(camera);
}

function loadNewGameMenu(canvas, ctx, camera)
{
    //gamedata.gamestate = statenum.newMenu;
    gamedata.gamestate = statenum.play;
    gamedata.seed = generateSeed("SEED & FEED");
    gamedata.map = createMap(gamedata.seed, 0);
}

function updateNewGameMenu(canvas, ctx, camera, frametime)
{
    updateCamera(gamedata.camera, gamedata.canvas, canvas.height/camera.sizefac, canvas.height/camera.sizefac);
}