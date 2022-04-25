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

window.addEventListener('resize', function(event){
	var canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth - canvas.offsetLeft;
    canvas.height = window.innerHeight - canvas.offsetTop;
})

var oldtime = 0;
function frameStep(newtime) {
    let frametime = oldtime-newtime;
    oldtime = newtime;

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas,height);

	window.requestAnimationFrame(frameStep);
}

function main() {
	var canvas = document.getElementById("canvas");
	(canvas.width = window.innerWidth - canvas.offsetLeft), (canvas.height = window.innerHeight - canvas.offsetTop), (ctx = canvas.getContext("2d"));
	loadMainMenu(ctx);
}
