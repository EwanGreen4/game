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
include("menu.js", "audio.js");
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
	let canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth - canvas.offsetLeft * 3;
	canvas.height = window.innerHeight - canvas.offsetTop * 3;
});

let framedata = {
    oldtime: 0,
    canvas: document.getElementById("canvas"),
    ctx: document.getElementById("canvas").getContext("2d"),
    camera: Camera(0, 0),
    map: {w: 0, h: 0}
}
function frameStep(newtime) {
    let frametime = framedata.oldtime - newtime;
    framedata.oldtime = newtime;
    framedata.ctx.clearRect(0, 0, canvas.width, canvas,height);
    framedata.camera.update(framedata.canvas, map.w, map.h);


	window.requestAnimationFrame(frameStep);
}

function main() {
//	document.body.style.overflow = "hidden";
	let canvas = document.getElementById("canvas");
	(canvas.width = window.innerWidth - canvas.offsetLeft * 3),
		(canvas.height = window.innerHeight - canvas.offsetTop * 3),
		(ctx = canvas.getContext("2d"));
        let result =  loadMainMenu(ctx);

        this.addEventListener('chosen', function(event) {
            switch(event.result) { // Wait for the main menu
                case mainMenuEnum.newGame:
                    alert("test")
                    break;
                case mainMenuEnum.loadGame:
                    break;
                case mainMenuEnum.settings:
                    break;
        }
        }, false);
        loadMainMenu(ctx)

    //let exitQueued = false;
    //while(!exitQueued) {
    //}
}
