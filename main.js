includedFiles = [];
function include() {
	for (let i = 0; i < arguments.length; i++) {
		name = arguments[i];
		if (includedFiles.indexOf(name) == -1) {
			includedFiles.push(name);
			let t = document.createElement("script");
			(t.src = name),
				document.getElementsByTagName("head").item(0).appendChild(t);
		}
	}
}

//MIN-START
include("draw.js", "audio.js", "menu.js", "map.js");
//MIN-END

document.addEventListener("keydown", function (event) {
	switch (event.keyCode) {
		case 37:
			alert("Left was pressed");
			break;
		case 39:
			alert("Right was pressed");
	}
});

window.addEventListener("resize", function (event) {
	//let canvas = document.getElementById("canvas");
	gamedata.canvas.width = window.innerWidth - gamedata.canvas.offsetLeft * 3;
	gamedata.canvas.height = window.innerHeight - gamedata.canvas.offsetTop * 3;
	gamedata.ctx = gamedata.canvas.getContext("2d");
    gamedata.ctx.imageSmoothingEnabled = false;
});

const statenum = {
    mainMenu: 0,
    newMenu: 1,
    cutscene: 5,
    loadscreen: 6,
    play: 7
};

let gamedata = {
    oldtime: 0,
    canvas: null,
    ctx: null,
    gamestate: statenum.mainMenu,
    camera: {x: 0, y: 0, w: 0, h: 0, idealh: 240, sizefac: 1, zoom: 1},

    map: {w: 0, h: 0},
    seed: null,

    offscreencanvas: document.createElement("canvas")
}
function gameLoop(newtime) {
    let frametime = gamedata.oldtime - newtime;
    gamedata.oldtime = newtime;
    gamedata.ctx.clearRect(0, 0, gamedata.canvas.width, gamedata.canvas.height);

    switch(gamedata.gamestate)
    {
    case statenum.mainMenu:
        updateMainMenu(gamedata.canvas, gamedata.ctx, gamedata.camera, frametime);
        break;
    case statenum.newMenu:
        updateNewGameMenu(gamedata.canvas, gamedata.ctx, gamedata.camera, frametime);
        break;
    case statenum.cutscene:
            break;
    case statenum.play:
        updateGameplay(gamedata.canvas, gamedata.ctx, gamedata.camera, frametime)
        break;
    }

	window.requestAnimationFrame(gameLoop);
}

function updateGameplay(canvas, ctx, camera, frametime)
{
    updateCamera(gamedata.camera, gamedata.canvas, gamedata.map.w*16, gamedata.map.h*16);
    drawGame(canvas, ctx, camera, frametime, gamedata.map);
}

function main() {
//	document.body.style.overflow = "hidden";
	gamedata.canvas = document.getElementById("canvas");
	gamedata.canvas.width = window.innerWidth - canvas.offsetLeft * 3;
	gamedata.canvas.height = window.innerHeight - canvas.offsetTop * 3;
	gamedata.ctx = gamedata.canvas.getContext("2d");
    gamedata.ctx.imageSmoothingEnabled = false;

    loadMainMenu(gamedata.canvas, gamedata.ctx);
    gameLoop(0);

    //let exitQueued = false;
    //while(!exitQueued) {
    //}
}
