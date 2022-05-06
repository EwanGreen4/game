
function updateCamera(camera, canvas, boundx, boundy) {
    camera.sizefac = Math.round((canvas.height / camera.idealh) * camera.zoom);
    camera.h = canvas.height/camera.sizefac;
    camera.w = (canvas.width / canvas.height) * camera.h * camera.zoom;

    if (camera.x - camera.w / 2 < 0) camera.x = camera.w / 2;
    else if (camera.x + camera.w / 2 > boundx) camera.x = boundx - camera.w / 2;
    if (camera.y - camera.h / 2 < 0) camera.y = camera.h / 2;
    else if (camera.x + camera.w / 2 > boundy) camera.y = boundy - camera.h / 2;

    if(boundx < camera.w)
        camera.x = boundx/2;
    if(boundy < camera.h)
        camera.y = boundy/2;
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
    if(src == null)
        ctx.drawImage(image, dst.x, dst.y, dst.w, dst.h);
    else
	    ctx.drawImage(image, src.x, src.y, src.w, src.h, dst.x, dst.y, dst.w, dst.h);
}

function drawMap(canvas, map) {
	canvas.width  = map.w * 16;
	canvas.height = map.h * 16;
	let ctx = canvas.getContext("2d");
	for (let y = 0; y < map.h; y++) {
		for (let x = 0; x < map.w; x++) {
			let id = map.data[y * map.w + x];
			let src = {
				x: (id % map.img.width)*16,
				y: Math.floor(id / map.img.width)*16,
				w: 16,
				h: 16,
			};
			let dst = {
				x: x * 16,
				y: y * 16,
				w: 16,
				h: 16,
			};
			drawSpriteDirect(ctx, map.img, src, dst);
		}
	}
	//map.ctx = ctx;
	createImageBitmap(canvas).then(function(drawnmap){
        map.drawnmap = drawnmap;
    });
}

function drawGame(canvas, ctx, camera, timestep, map) {
    if(map.drawnmap != null)
    {
        let src = {
            x: camera.x - camera.w / 2,
            y: camera.y - camera.h / 2,
            w: camera.w,
            h: camera.h
        }
        ctx.drawImage(
            map.drawnmap,
            camera.x - camera.w / 2,
            camera.y - camera.h / 2,
            camera.w,
            camera.h,
            0,
            0,
            canvas.width,
            canvas.heights
        );
        //ctx.drawImage(map.drawnmap, 0, 0);
    }

}