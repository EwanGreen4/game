function generateSeed(string) {
	hash = 0x811c9dc5;
	const prime = 0x01000193;
	for (const char of string) {
		hash *= prime;
		hash ^= char;
	}
	return hash;
}

const leveltileset = ["resource/test_tileset.png"]

function createMap(seed, level) {
    let map = {
        w: 200,
        h: 200,
        data: [],
        img: null,
        drawnmap: null
    }

    map.img = new Image();
    map.img.src = leveltileset[level];
    map.img.onload = function()
    {
        map.data.length = map.w*map.h;
        map.data.fill(1);
        map.drawnmap = drawMap(gamedata.offscreencanvas, map);
    }

    
    return map;
}
