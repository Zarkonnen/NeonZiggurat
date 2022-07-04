function hwl(name, volume) {
    return new Howl({src: ["sounds/" + name + ".mp3"], volume: volume || 1});
}

// Load data
function ajax(file, callback) {
	jQuery.ajax({
		url: file + "?" + (new Date()).getTime(),
		success: callback
	});
}

var ready = false;
var clicked = false;

const yScale = 0.8;

const EAST = 0;
const NORTHEAST = 1;
const NORTH = 2;
const NORTHWEST = 3;
const WEST = 4;
const SOUTHWEST = 5;
const SOUTH = 6;
const SOUTHEAST = 7;

var types = {
	house1: { x: 32, y: 107, w: 120, h: 139, cy: 32 },
	house2: { x: 182, y: 107, w: 127, h: 152, cy: 39, ch: 107 },
	house3: { x: 339, y: 110, w: 185, h: 147, cy: 30, ch: 112, cw: 139 },
	house4: { x: 668, y: 114, w: 190, h: 134, cy: 47 },
	house5: { x: 33, y: 297, w: 121, h: 144, cy: 50 },
	wall1: { x: 223, y: 303, w: 51, h: 99, cy: 64 },
	stall1: { x: 375, y: 302, w: 88, h: 105, cy: 14 },
	stall2: { x: 646, y: 323, w: 52, h: 43, cy: 8 },
	house6: { x: 29, y: 748, w: 183, h: 231, cy: 94 },
	house7: { x: 290, y: 759, w: 140, h: 211, cy: 131 },
	house8: { x: 455, y: 755, w: 262, h: 221, cy: 112 },
	zig1: { x: 1178, y: 758, w: 789, h: 596, cy: 232 },
	_rock1: { x: 218, y: 89, w: 8, h: 6, ground: true },
	_rock2: { x: 236, y: 70, w: 13, h: 10, ground: true },
	_rock3: { x: 263, y: 91, w: 7, h: 6, ground: true },
	_rock4: { x: 274, y: 72, w: 9, h: 7, ground: true },
	_rock5: { x: 299, y: 65, w: 24, h: 11, ground: true },
	_rock6: { x: 301, y: 82, w: 16, h: 9, ground: true },
	_rock7: { x: 331, y: 50, w: 17, h: 11, ground: true },
	_rock8: { x: 333, y: 71, w: 14, h: 9, ground: true },
	_rock9: { x: 359, y: 47, w: 15, h: 10, ground: true },
	_rut1: { x: 368, y: 66, w: 24, h: 18, ground: true },
	_rut2: { x: 923, y: 67, w: 22, h: 10, ground: true },
	_rut3: { x: 960, y: 72, w: 31, h: 18, ground: true },
	_grass1: { x: 396, y: 64, w: 9, h: 12, ground: true },
	_grass2: { x: 401, y: 81, w: 9, h: 11, ground: true },
	_grass3: { x: 415, y: 66, w: 8, h: 9, ground: true },
	_grass4: { x: 414, y: 81, w: 9, h: 10, ground: true },
	_grass5: { x: 429, y: 83, w: 11, h: 10, ground: true },
	_rug1: { x: 385, y: 14, w: 30, h: 24, ground: true },
	_rug2: { x: 454, y: 65, w: 26, h: 24, ground: true },
	_rug3: { x: 498, y: 51, w: 44, h: 31, ground: true },
	_rug4: { x: 533, y: 16, w: 24, h: 20, ground: true },
	_pillow1: { x: 428, y: 44, w: 14, h: 10 },
	_pillow2: { x: 431, y: 26, w: 13, h: 10 },
	_pillow3: { x: 449, y: 38, w: 20, h: 15 },
	_basket1: { x: 460, y: 15, w: 12, h: 12 },
	_basket2: { x: 485, y: 5, w: 11, h: 12 },
	_basket3: { x: 489, y: 23, w: 14, h: 12 },
	_basket4: { x: 509, y: 9, w: 12, h: 11 },
	_basket5: { x: 508, y: 28, w: 12, h: 10 },
	_basket6: { x: 565, y: 19, w: 16, h: 13 },
	frame1: { x: 560, y: 49, w: 38, h: 36, cy: 25 },
	frame2: { x: 611, y: 47, w: 39, h: 41, cy: 29 },
	frame3: { x: 608, y: 14, w: 27, h: 23, cy: 17 },
	frame4: { x: 656, y: 13, w: 19, h: 35, cy: 18 },
	roof1: { x: 734, y: 27, w: 59, h: 61, cy: 35 },
	_wood1: { x: 659, y: 57, w: 32, h: 20 },
	_wood2: { x: 697, y: 71, w: 23, h: 16 },
	_wood3: { x: 699, y: 26, w: 28, h: 25 },
	_wood4: { x: 980, y: 10, w: 13, h: 15 },
	_bricks1: { x: 808, y: 22, w: 16, h: 12, ground: true },
	_bricks2: { x: 812, y: 41, w: 20, h: 16, ground: true },
	_bricks3: { x: 839, y: 14, w: 23, h: 14, ground: true },
	_bricks4: { x: 849, y: 38, w: 19, h: 16, ground: true },
	_bricks5: { x: 799, y: 77, w: 11, h: 25, ground: true },
	_bricks6: { x: 825, y: 67, w: 33, h: 13, ground: true },
	_bricks7: { x: 880, y: 30, w: 21, h: 16, ground: true },
	_bricks8: { x: 878, y: 62, w: 22, h: 23, ground: true },
	_bricks9: { x: 913, y: 9, w: 11, h: 9, ground: true },
	_bricks10: { x: 935, y: 10, w: 8, h: 8, ground: true },
	_bricks11: { x: 948, y: 8, w: 9, h: 9, ground: true },
	_bricks12: { x: 979, y: 39, w: 18, h: 12, ground: true },
	_bench: { x: 930, y: 27, w: 26, h: 22 },
	tree1: { x: 724, y: 307, w: 16, h: 30, cy: 21 },
	tree2: { x: 757, y: 307, w: 25, h: 49, cy: 39 },
	tree3: { x: 812, y: 294, w: 45, h: 50, cy: 37, cx: 16, cw: 11 },
	tree4: { x: 872, y: 301, w: 26, h: 45, cy: 35, cx: 10, cw: 9 },
	tree5: { x: 925, y: 296, w: 33, h: 52, cy: 43, cx: 14, cw: 9 },
	tree6: { x: 978, y: 298, w: 31, h: 45, cy: 38, cx: 13, cw: 6 },
	tree7: { x: 737, y: 370, w: 13, h: 22, cy: 14 },
	tree8: { x: 765, y: 367, w: 15, h: 30, cy: 22 },
	tree9: { x: 806, y: 363, w: 72, h: 89, cy: 80, cx: 27, cw: 12 },
	tree10: { x: 907, y: 371, w: 57, h: 68, cy: 60, cx: 33, cw: 10 },
	tree11: { x: 978, y: 365, w: 78, h: 84, cy: 76, cx: 32, cw: 9 },
	_neon1: { w: 23, h: 66, frames: [{x: 1017, y: 6}, {x: 1017, y: 176}] },
	_neon2: { w: 23, h: 47, frames: [{x: 1049, y: 10}, {x: 1049, y: 180}] },
	_neon3: { w: 37, h: 32, frames: [{x: 1087, y: 19}, {x: 1087, y: 189}] },
	_neon4: { w: 24, h: 64, frames: [{x: 1133, y: 9}, {x: 1133, y: 179}] },
	_neon5: { w: 20, h: 62, frames: [{x: 1170, y: 11}, {x: 1170, y: 181}] },
	_neon6: { w: 16, h: 41, frames: [{x: 1203, y: 9}, {x: 1203, y: 179}] },
	_neon7: { w: 38, h: 17, frames: [{x: 1231, y: 16}, {x: 1231, y: 186}] },
	_neon8: { w: 35, h: 14, frames: [{x: 1284, y: 18}, {x: 1284, y: 188}] },
	_neon9: { w: 51, h: 20, frames: [{x: 1229, y: 41}, {x: 1229, y: 211}] },
	_neon10: { w: 18, h: 18, frames: [{x: 1290, y: 41}, {x: 1290, y: 211}] },
	_neon11: { w: 21, h: 23, frames: [{x: 1019, y: 85}, {x: 1019, y: 255}] },
	_neon12: { w: 32, h: 28, frames: [{x: 1060, y: 82}, {x: 1060, y: 252}] },
	_neon13: { w: 27, h: 33, frames: [{x: 1118, y: 82}, {x: 1118, y: 252}] },
	_neon14: { w: 19, h: 56, frames: [{x: 1169, y: 85}, {x: 1169, y: 255}] },
	_neon15: { w: 17, h: 52, frames: [{x: 1198, y: 83}, {x: 1198, y: 253}] },
	_neon16: { w: 30, h: 60, frames: [{x: 1227, y: 77}, {x: 1227, y: 247}] },
	_neon17: { w: 22, h: 77, frames: [{x: 1260, y: 81}, {x: 1260, y: 251}] },
	_neon18: { w: 15, h: 35, frames: [{x: 1291, y: 83}, {x: 1291, y: 253}] },
	neonPillar1: { w: 15, h: 33, cy: 24, frames: [{x: 1337, y: 22}, {x: 1337, y: 192}] },
	neonPillar2: { w: 25, h: 64, cy: 48, frames: [{x: 1363, y: 15}, {x: 1363, y: 185}] },
	neonPillar3: { w: 14, h: 34, cy: 24, frames: [{x: 1404, y: 29}, {x: 1404, y: 199}] },
	neonPillar4: { w: 20, h: 57, cy: 41, frames: [{x: 1433, y: 14}, {x: 1433, y: 184}] },
	_p1e: { x: 486, y: 279, w: 17, h: 31 },
	_p1w: { x: 514, y: 279, w: 17, h: 31 },
	_p1s: { x: 538, y: 279, w: 15, h: 31 },
	_p1n: { x: 568, y: 279, w: 15, h: 31 },
	_p2e: { x: 486, y: 315, w: 17, h: 31 },
	_p2w: { x: 514, y: 315, w: 17, h: 31 },
	_p2s: { x: 538, y: 315, w: 15, h: 31 },
	_p2n: { x: 568, y: 315, w: 15, h: 31 },
	_p3e: { x: 486, y: 351, w: 17, h: 31 },
	_p3w: { x: 514, y: 351, w: 17, h: 31 },
	_p3s: { x: 538, y: 351, w: 15, h: 31 },
	_p3n: { x: 568, y: 351, w: 15, h: 31 },
	_p4e: { x: 486, y: 387, w: 17, h: 31 },
	_p4w: { x: 514, y: 387, w: 17, h: 31 },
	_p4s: { x: 538, y: 387, w: 15, h: 31 },
	_p4n: { x: 568, y: 387, w: 15, h: 31 },
	_skel1: { x: 595, y: 283, w: 12, h: 26 },
};

for (const [key, value] of Object.entries(types)) {
	value.name = key;
}

var cartSpin = [
	[ {x: 250, y: 481, w: 102, h: 54, dx: 31, dy: 41}, {x: 250, y: 612, w: 102, h: 54, dx: 31, dy: 41} ],
	[ {x: 124, y: 476, w: 91, h: 93, dx: 37, dy: 58}, {x: 124, y: 607, w: 91, h: 93, dx: 37, dy: 58} ],
	[ {x: 40, y: 473, w: 50, h: 94, dx: 24, dy: 62}, {x: 40, y: 591, w: 50, h: 94, dx: 24, dy: 62} ],
	[ {x: 854, y: 468, w: 91, h: 91, dx: 55, dy: 55}, {x: 854, y: 599, w: 91, h: 91, dx: 55, dy: 55} ],
	[ {x: 729, y: 463, w: 101, h: 54, dx: 70, dy: 41}, {x: 729, y: 594, w: 101, h: 54, dx: 70, dy: 41} ],
	[ {x: 613, y: 460, w: 99, h: 93, dx: 65, dy: 45}, {x: 613, y: 591, w: 99, h: 93, dx: 65, dy: 45} ],
	[ {x: 523, y: 462, w: 49, h: 106, dx: 26, dy: 38}, {x: 523, y: 593, w: 49, h: 106, dx: 26, dy: 38} ],
	[ {x: 386, y: 468, w: 100, h: 92, dx: 34, dy: 40}, {x: 386, y: 599, w: 100, h: 92, dx: 34, dy: 40} ]
];

var map = [];

var editor = false;
var esx = 300;
var esy = 100;
var eType = types.house1;

var cartDir = EAST;
var cartAnimTime = 0;
var animTime = 0;
var planckAccum = 0;

var pl = planck;
var Vec2 = pl.Vec2;
var pw = new pl.World({gravity: Vec2(0, 0)});
var pCart = pw.createDynamicBody({
	position: Vec2(240, 200),
	linearDamping: 0.05
});
pCart.createFixture({
	shape: pl.Circle(70),
	density: 0.001,
	restitution: 0.05,
	friction: 0.05,
});

ajax("map.txt", function(data) {
	map = JSON.parse(data, function (key, value) {
        if (key == "type") {
            return types[value];
        }
        return value;
    });
    map.sort((a, b) => {
    	var ay = a.y + a.type.h;
    	var by = b.y + b.type.h;
    	if (a.type.name.includes("neon")) {
    		by -= b.type.h;
    	}
    	if (b.type.name.includes("neon")) {
    		ay -= a.type.h;
    	}
    	return ay - by;
    });
    map.forEach(o => {
    	var x = o.x + (o.type.cx || 0);
    	var y = o.y + (o.type.cy || 0);
    	var w = o.type.cw || (o.type.w - (o.type.cx || 0));
    	var h = o.type.ch || (o.type.h - (o.type.cy || 0));
    	if (!o.type.name.startsWith("_")) {
			var stat = pw.createBody({
				position: Vec2(x + w / 2, y + h / 2)
			});
			stat.createFixture({
				shape: pl.Box(w / 2, h / 2)
			});
		}
    });
    ready = true;
});

function tick(ms) {
	c.fillStyle = "#292929";
	c.fillRect(0, 0, canvas.width, canvas.height);
	animTime += ms;
	if (!clicked) {
		blit(1507, 29, 520, 340, canvas.width / 2 - 520 / 2, canvas.height / 2 - 340 / 2);
		return;
	}

	if (!ready) { return; }
	
	if (editor) {
		if (down("W")) {
			esy += ms / 2;
		}
		if (down("S")) {
			esy -= ms / 2;
		}
		if (down("A")) {
			esx += ms / 2;
		}
		if (down("D")) {
			esx -= ms / 2;
		}
		c.fillStyle = "#9c8d90";
    	c.fillRect(0, 0, canvas.width, canvas.height);
    	c.fillStyle = "white";
    	c.fillRect(esx, esy, 2, 2);
    	
    	map.forEach(o => {
    		if (o.type.frames) {
    			var fi = Math.floor((animTime + o.x + o.y) / 160) % o.type.frames.length;
    			blit(o.type.frames[fi].x, o.type.frames[fi].y, o.type.w, o.type.h, o.x + esx, o.y * yScale + esy);
    		} else {
    			blit(o.type.x, o.type.y, o.type.w, o.type.h, o.x + esx, o.y * yScale + esy);
    		}
    	});
    	
    	c.fillStyle = "black";
    	c.fillRect(0, 0, 200, canvas.height);
    	
    	var x = 5;
    	var y = 5;
    	
    	for (const [key, v] of Object.entries(types)) {
    		
    		var scale = 32;
    		while (v.w / scale * 2 < 40 && v.h / scale * 2 < 40 && scale > 1) {
    			scale /= 2;
    		}
    		if (y + v.h / scale > canvas.height) {
    			x += 40;
    			y = 5;
    		}
    		if (eType == v) {
    			c.fillStyle = "#777777";
    			c.fillRect(x - 1, y - 1, v.w / scale + 2, v.h / scale + 2);
    		} else if (!map.some(o => o.type == v)) {
    			c.fillStyle = "red";
    			c.fillRect(x - 1, y - 1, v.w / scale + 2, v.h / scale + 2);
    		}
    		if (v.frames) {
    			scaledBlit(v.frames[0].x, v.frames[0].y, v.w, v.h, x, y, v.w / scale, v.h / scale);
    		} else {
    			scaledBlit(v.x, v.y, v.w, v.h, x, y, v.w / scale, v.h / scale);
			}
    		if (click && click.x >= x && click.y >= y && click.x <= x + 40 && click.y <= y + v.h / scale) {
    			eType = v;
    		}
    		y += v.h / scale + 2;
    	}
    	
    	if (eType && cursor) {
    		if (eType.frames) {
    			stripyBlit(eType.frames[0].x, eType.frames[0].y, eType.w, eType.h, Math.round(cursor.x), Math.round(cursor.y));
    		} else {
    			stripyBlit(eType.x, eType.y, eType.w, eType.h, Math.round(cursor.x), Math.round(cursor.y));
			}
    	}
    	
    	if (click && click.x > 200) {
    		var cx = Math.round(click.x - esx);
    		var cy = Math.round((click.y - esy) / yScale);
    		if (eType) {
    			map.push({
    				type: eType,
    				x: cx,
    				y: cy
    			});
    			map.sort((a, b) => {
					var ay = a.y + a.type.h;
					var by = b.y + b.type.h;
					if (a.type.name.includes("neon")) {
						by -= b.type.h;
					}
					if (b.type.name.includes("neon")) {
						ay -= a.type.h;
					}
					return ay - by;
				});
    		} else {
    			for (var i = map.length - 1; i >= 0; i--) {
    				var o = map[i];
    				if (cx >= o.x && cy >= o.y && cx <= o.x + o.type.w && cy <= o.y + o.type.h) {
    					map.splice(i, 1);
    					break;
    				}
    			}
    		}
    	}
    	
    	if (pressed("X")) {
    		eType = null;
    	}
    	if (pressed("V")) {
    		console.log(JSON.stringify(map, function (key, value) {
				if (key == "type") {
				    return value.name;
				}
				return value;
			}));
    	}
    	
    	return;
	}

	planckAccum += ms;
	while (planckAccum >= 8) {
		planckAccum -= 8;
		pw.step(1);
	}
	
	var accel = false;
    if (down("W")) {
    	if (down("A")) {
    		cartDir = NORTHWEST;
    	} else if (down("D")) {
    		cartDir = NORTHEAST;
    	} else {
    		cartDir = NORTH;
    	}
    	accel = true;
    } else if (down("S")) {
    	if (down("A")) {
    		cartDir = SOUTHWEST;
    	} else if (down("D")) {
    		cartDir = SOUTHEAST;
    	} else {
    		cartDir = SOUTH;
    	}
    	accel = true;
    } else if (down("A")) {
    	cartDir = WEST;
    	accel = true;
    } else if (down("D")) {
    	cartDir = EAST;
    	accel = true;
    }
    if (accel) {
    	pCart.applyForceToCenter(Vec2(Math.cos(cartDir * Math.PI / 4) * 2000 * ms, -Math.sin(cartDir * Math.PI / 4) * 2000 * ms));
    	cartAnimTime += ms;
	}
    
    var ci = cartSpin[cartDir][Math.floor(cartAnimTime / 160) % 2];
    c.fillStyle = "#9c8d90";
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    var scrollX = canvas.width / 2 - pCart.getPosition().x;
    var scrollY = canvas.height / 2 - pCart.getPosition().y * yScale
    
    var groundXStart = Math.floor(scrollX) % 40 - 40;
    var groundYStart = Math.floor(scrollY) % 30 - 30;
    for (var gy = groundYStart; gy < canvas.height; gy += 30) {
    	for (var gx = groundXStart; gx < canvas.width; gx += 40) {
    		blit(309, 304, 40, 30, gx, gy);
    	}
    }
    
    for (var i = 0; i < map.length; i++) {
    	var o = map[i];
    	if (!o.type.ground) { continue; }
    	if (o.type.frames) {
    		var fi = Math.floor((animTime + o.x + o.y) / 160) % o.type.frames.length;
    		blit(o.type.frames[fi].x, o.type.frames[fi].y, o.type.w, o.type.h, o.x + scrollX, o.y * yScale + scrollY);
    	} else {
    		blit(o.type.x, o.type.y, o.type.w, o.type.h, o.x + scrollX, o.y * yScale + scrollY);
    	}
    }
    var cartDrawn = false;
    for (var i = 0; i < map.length; i++) {
    	var o = map[i];
    	if (o.type.ground) { continue; }
    	if (!cartDrawn&& pCart.getPosition().y + 80 < o.y + (o.type.cy || 0)) {
    		blit(ci.x, ci.y, ci.w, ci.h, Math.floor(pCart.getPosition().x - ci.dx + scrollX), Math.floor(pCart.getPosition().y * yScale - ci.dy + scrollY));
			cartDrawn = true;
    	}
    	if (o.type.frames) {
    		var fi = Math.floor((animTime + o.x + o.y) / 160) % o.type.frames.length;
    		blit(o.type.frames[fi].x, o.type.frames[fi].y, o.type.w, o.type.h, o.x + scrollX, o.y * yScale + scrollY);
    	} else {
    		blit(o.type.x, o.type.y, o.type.w, o.type.h, o.x + scrollX, o.y * yScale + scrollY);
    	}
    }
    if (!cartDrawn) {
    	blit(ci.x, ci.y, ci.w, ci.h, Math.floor(pCart.getPosition().x - ci.dx + scrollX), Math.floor(pCart.getPosition().y * yScale - ci.dy + scrollY));
    }
}

var images = {};

function blit(sx, sy, sw, sh, dx, dy) {
	dx = Math.floor(dx);
	dy = Math.floor(dy);
    if (!images["spritesheet"]) {
        images["spritesheet"] = new Image();
        images["spritesheet"].src = "graphics/spritesheet.png" + "?" + (new Date()).getTime();
    }
    c.drawImage(images["spritesheet"], sx, sy, sw, sh, dx, dy, sw, sh);
}

function stripyBlit(sx, sy, sw, sh, dx, dy) {
	dx = Math.floor(dx);
	dy = Math.floor(dy);
    if (!images["spritesheet"]) {
        images["spritesheet"] = new Image();
        images["spritesheet"].src = "graphics/spritesheet.png" + "?" + (new Date()).getTime();
    }
    for (var i = 0; i < sh; i += 2) {
    	c.drawImage(images["spritesheet"], sx, sy + i, sw, 1, dx, dy + i, sw, 1);
	}
}

function scaledBlit(sx, sy, sw, sh, dx, dy, dw, dh) {
	dx = Math.floor(dx);
	dy = Math.floor(dy);
    if (!images["spritesheet"]) {
        images["spritesheet"] = new Image();
        images["spritesheet"].src = "graphics/spritesheet.png" + "?" + (new Date()).getTime();
    }
    c.drawImage(images["spritesheet"], sx, sy, sw, sh, dx, dy, dw, dh);
}

function img(img, x, y) {
    if (img == null) { return; }
    if (!images[img]) {
        images[img] = new Image();
        images[img].src = "graphics/" + img + ".png" + "?" + (new Date()).getTime();
    }
	try {
		c.drawImage(images[img], x, y);
	} catch (e) {
		console.log("Can't draw " + img + ".");
	}	
}

var canvas = document.getElementById("gameCanvas");
var c = canvas.getContext("2d");
var keys = {};
var keyCodes = {};
var keysDown = {};
var keyCodesDown = {};
var click = null;
var mouseDown = false;
var cursor = {x: 300, y: 300};

// Listen for key presses.
function canvasKeyUp(e) {
    keyCodes[e.key] = true;
    keys[String.fromCharCode(e.which)] = true;
    keyCodesDown[e.key] = false;
    keysDown[String.fromCharCode(e.which)] = false;
}

function canvasKeyDown(e) {
    keyCodesDown[e.key] = true;
    keysDown[String.fromCharCode(e.which)] = true;
}

function pressed(key) {
    return !!keys[key] || !!keyCodes[key];
}

function down(key) {
    return !!keysDown[key] || !!keyCodesDown[key];
}

$('body').keyup(canvasKeyUp).keydown(canvasKeyDown);

function canvasClick(e) {
    click = { "x": e.offsetX, "y": e.offsetY };
    if (!clicked) {
    	hwl("uruklow", 0.5).play();
    	$('#gameCanvas').css("cursor", "none");
    }
    clicked = true;
}

function canvasMouseDown(e) {
    mouseDown = true;
}

function canvasMouseUp(e) {
    mouseDown = false;
}

function canvasMove(e) {
    cursor = { "x": e.offsetX, "y": e.offsetY };
}

$('#gameCanvas').click(canvasClick).mousemove(canvasMove).mousedown(canvasMouseDown).mouseup(canvasMouseUp);

// Set up game loop.
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var lastUpdate = new Date().getTime();

function nextFrame() {
    var currentTime = new Date().getTime();
	if (ready) {
		c.resetTransform();
		tick(currentTime - lastUpdate);
	}
    keys = {};
    keyCodes = {};
    click = null;
    lastUpdate = currentTime;
    requestAnimationFrame(nextFrame);
}

function sizeCanvas() {
	var w = $(window).width();
	var h = $(window).height();
	console.log(w + " x " + h);
	if (w * 9 > h * 16) {
		// Too Wide
		$(canvas).css('width', Math.floor(h * 16 / 9));
		$(canvas).css('height', h);
	} else {
		// Too Tall (or perfect)
		$(canvas).css('height', Math.floor(w * 9 / 16));
		$(canvas).css('width', w);
	}
}

$(window).resize(sizeCanvas);
$(window).ready(sizeCanvas);

// Once everything is set up, start game loop.
requestAnimationFrame(nextFrame);
