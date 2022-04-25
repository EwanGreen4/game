class Camera {
	constructor(width, height) {
		this.x = 0;
		this.y = 0;
		this.w = width;
		this.h = height;
		this.idealh = 320;
		this.sizefac = 1;
		this.zoom = 1;
	}
	update(canvas, boundx, boundy) {
		if (this.x - this.w / 2 < 0) this.x = this.w / 2;
		else if (this.x + this.w / 2 > boundx) this.x = boundx - this.w / 2;
		if (this.y - this.h / 2 < 0) this.y = this.h / 2;
		else if (this.x + this.w / 2 > boundy) this.y = boundy - this.h / 2;

		sizefac = round((canvas.height / this.idealh) * this.zoom);
		this.h = canvas.height*this.sizefac;
		this.w = (canvas.width / canvas.height) * this.h * this.zoom;
	}
}

function transformRectWorld(camera, rect) {
	return {
		x: (rect.x - (camera.x - camera.pixelw / 2)) * camera.sizefac,
		y: (rect.y - (camera.y - camera.pixelh / 2)) * camera.sizefac,
		w: rect.w * camera.sizefac,
		h: rect.h * camera.sizefac,
	};
}
function transformRectScreen(camera, rect) {
	return {
		x: rect.x * camera.sizefac,
		y: rect.y * camera.sizefac,
		w: rect.w * camera.sizefac,
		h: rect.h * camera.sizefac,
	};
}

function drawSpriteDirect(ctx, image, src, dst) {
	ctx.drawImage(image, src.x, src.y, src.w, src.h, dst.x, dst.y, dst.w, dst.h);
}
function drawSpriteWorld(ctx, camera, image, src, dst) {
	dst = transformRectWorld(camera, dst);
	ctx.drawImage(image, src.x, src.y, src.w, src.h, dst.x, dst.y, dst.w, dst.h);
}
function drawSpriteScreen(ctx, camera, image, src, dst) {
	dst = transformRectScreen(camera, dst);
	ctx.drawImage(image, src.x, src.y, src.w, src.h, dst.x, dst.y, dst.w, dst.h);
}

function drawMap(canvas, map) {
	canvas.w = map.w * 16;
	canvas.h = map.h * 16;
	ctx = canvas.getContext("2d");
	for (let y = 0; y < map.h; y++) {
		for (let x = 0; x < map.w; x++) {
			id = map.data[y * map.w + map.x];
			src = {
				x: id / map.img.w,
				y: id / map.img.w,
				w: 16,
				h: 16,
			};
			dst = {
				x: x * 16,
				y: y * 16,
				w: 16,
				h: 16,
			};
			drawSpriteDirect(ctx, map.img, src, dst);
		}
	}
	map.ctx = ctx;
	map.drawnmap = canvas.transferToImageBitmap();
}

function drawGame(ctx, camera, timestep, map) {
	let canvas = ctx.canvas;
	ctx.drawImage(
		map.drawnmap,
		camera.x - camera.w / 2,
		camera.y - camera.h / 2,
		camera.w,
		camera.h,
		0,
		0,
		canvas.w,
		canvas.h
	);
}