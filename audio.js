include("external/jsxm/xm.js", "external/jsxm/xmeffects.js");

let audio = {
	playing: false,
	loadFile: function (uri) {
		if (!window.XMPlayer) {
			window.XMPlayer = {};
		}
		let XMPlayer = window.XMPlayer;
		if (!window.XMView) {
			window.XMView = {};
		}
		XMPlayer.init();

		let xmReq = new XMLHttpRequest();
		xmReq.open("GET", uri, true);
		xmReq.responseType = "arraybuffer";
		xmReq.onload = function (xmEvent) {
			let arrayBuffer = xmReq.response;
			if (arrayBuffer) {
				XMPlayer.load(arrayBuffer);
			} else {
				console.log("unable to load", uri);
			}
		};
		xmReq.send(null);
	},
	play: function () {
		XMPlayer.play();
		playing = true;
	},
	pause: function () {
		XMPlayer.pause();
		playing = false;
	},
	stop: function () {
		XMPlayer.stop();
		playing = false;
	},
};
