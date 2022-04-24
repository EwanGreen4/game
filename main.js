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
include("menu.js");
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

var oldtime = 0;
function frameStep(e) {
	window.requestAnimationFrame(frameStep);
}

function main() {
	var e = document.getElementById("canvas");
	(e.width = 640), (e.height = 440), (ctx = e.getContext("2d"));
	loadMainMenu(ctx);
}
