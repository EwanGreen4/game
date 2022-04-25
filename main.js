includedFiles = [];
function include() {
	for (var e = 0; e < arguments.length; e++) {
		name = arguments[e];
		if (includedFiles.indexOf(name) == -1) {
			includedFiles.push(name);
			var t = document.createElement("script");
			(t.src = name),
				document.getElementsByTagName("head").item(0).appendChild(t);
		}
	}
}

//MIN-START
include("menu.js", "audio.js");
//MIN-END

document.addEventListener("keydown", function (e) {
	switch (e.keyCode) {
		case 37:
			alert("Left was pressed");
			break;
		case 39:
			alert("Right was pressed");
	}
});

window.addEventListener("resize", function (event) {
	var canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth - canvas.offsetLeft * 3;
	canvas.height = window.innerHeight - canvas.offsetTop * 3;
});

var framedata = {
    oldtime: 0,
    canvas: document.getElementById("canvas"),
    ctx: framedata.canvas.getContext("2d"),
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
	document.body.style.overflow = "hidden";
	var canvas = document.getElementById("canvas");
	(canvas.width = window.innerWidth - canvas.offsetLeft * 3),
		(canvas.height = window.innerHeight - canvas.offsetTop * 3),
		(ctx = canvas.getContext("2d"));
	loadMainMenu(ctx);
}
