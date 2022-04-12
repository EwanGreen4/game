class Point {
	constructor(x,y) {
		this.x = x;
		this.y = y;
	}
	static x;
	static y;
}

class Rect { //globally mapped rect
	static left = 0;
	static right = 0;
	static top = 0;
	static bottom = 0;
	
	constructor(x, y, w, h) {
		this.top = y;
		this.left = x;
		this.bottom = y + h;
		this.right = x + w;
	}
	center() { return new Point(right - (left / 2), top - (bottom / 2)); }
	topLeft() { return new Point(left, top); }
	topRight() { return new Point(right, top); }
	bottomLeft() { return new Point(left, bottom); }
	bottomRight() { return new Point(right, bottom); }
    contains(point) { return point.x > this.left && point.x < this.right && point.y > this.top && point.y < this.bottom; 
    }
}
//class Player {
//	static x;
//	static y;
//}
