var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext("2d");

var world = new worldObject();
var updateManager = new updateManagerObject(world);
var images = [];
var state = 0; // walking state for cat
var lastUpdate = Date.now(); // Time sense last update in ms
var dy = 0;
var intro = true;
var jump = false;
var gravity = false;
var map = false;
var lvl1_var = false;
var lvl2_var = false;
var lvl2_var = false;
// Add key listener and key states
var keyMap = {
  68: 'right',
  65: 'left',
  87: 'up',
  83: 'down',
	32: 'jump'
}
var keyStates = {
		left: false,
    right: false,
    up: false,
    down: false,
		jump: false
}
window.addEventListener("keydown", keydown, false)
window.addEventListener("keyup", keyup, false)

/////////////////
// Load images //
/////////////////
images.logo = document.getElementById('logo');
images.main_ground = document.getElementById('main_ground');
images.daisy1 = document.getElementById('daisy1');
images.daisy2 = document.getElementById('daisy2');
images.lvl1 = document.getElementById('lvl1');
images.lvl2 = document.getElementById('lvl2');
images.lvl3 = document.getElementById('lvl3');
///////////////////
// Load entities //
///////////////////



// entities

var logo = new entity(images.logo, (5/10)-((3/10)*(1/1.3)/2), (-1.1), (3/10)*(1/1.3), (3/10));
var ground = new entity(images.main_ground, (0), (4/5),  (1),            (1/5));
var player = new entity(images.daisy1,      (0), (1), (1/10)*(1/1.3), (1/10));
var lvl1 = new entity(images.lvl1, 1/20, 1/30, (1/15), (0), 1);
//ad 7/60 to x pos
var lvl2 = new entity(images.lvl2, (1/6), 1/30, (1/15), (0), 2);
var lvl3 = new entity(images.lvl3, (17/60), 1/30, (1/15), (0), 3);
// World init (add entities to world, etc)
world.append(lvl1);
world.append(lvl2);
world.append(lvl3);
world.append(logo);
world.append(ground);
world.append(player);

// Main tick

updateManager.startTick(50); // specify  the tps

/////////////////
/// Functions ///
/////////////////

function lvl1_func(){
	map = false;
	lvl1_var = true;
	player.h = 1/10;
	ground.w = 1;
	console.log('hello');
}

function lvl2_func(){
	map = false;
	lvl2_var = true;
	player.h = 1/10;
	ground.w = 1;
}
function lvl3_func(){
	map = false;
	lvl2_var = true;
	player.h = 1/10;
	ground.w = 1;
}

//fuck fuck fuck ive tried so much shit
canvas.addEventListener('click', lvl1_func);


function worldObject() { // holds all the objects/entities in the world
	this.entities = [];
	this.append = function(entity) {
		this.entities.push(entity);
	}
}

function updateManagerObject(world) { // manages tick updates
	
	
	this.interval = null;
	this.world = world;
	this.stopTick = function() {
		clearInterval(this.interval);
	}
	this.startTick = function(tick) {
		// Stop current
		this.stopTick();
		// Start new
		this.interval = setInterval(this.update, 1000*1/tick);
	}
	this.update = function() {
		//////////////////
		// update times //
		//////////////////
		var currentTime = Date.now();
		timePassed = currentTime-lastUpdate;
		lastUpdate = currentTime;
		/////////////////
		// Update game //
		/////////////////
		var movement = false;
	if(intro == true && keyStates["jump"]==true){
		player.x = 0;
		intro = false;
		logo.w = 0;
		logo.h = 0;
		map = true;
	}

	if (map == true){
		player.h = 0;
		ground.w = 0;
		lvl1.h = lvl1.w/canvas.height*canvas.width;
		lvl2.h = lvl2.w/canvas.height*canvas.width;
		lvl3.h = lvl3.w/canvas.height*canvas.width;
	}

	if(intro == false && map == false && player.y(ground.y-player.h)-0.02 && (keyStates["up"]==true || keyStates["jump"]==true)){
		dy = .6;
		
	}
	if (logo.y <= (4.9/10)){
		logo.y += .4 * (timePassed/1000);
	}
	if(logo.y >= (4.9/10)){
		logo.y = (4.9/10);	
	}
	if(logo.y == (4.9/10) && intro == true && player.x <= 1){
		movement = true;
		player.x += (timePassed/1000) * .4;	
	};
	
	// Update y movement 
	
	if (dy != 0) {
		player.y -= dy * (timePassed/1000); // Move the player vert
		dy -= 1 * (timePassed/1000); // Gravity
	}
	
	if (player.y>(ground.y-player.h)) { // Make sure the player can't fall into the ground
		dy = 0; // Stop y movement
		player.y = ground.y-player.h; // Set player to ground
	}

		if (intro == false && map == false && keyStates["left"]==true && player.x>0) {
			
			movement = true;
			player.x-= (timePassed/1000) * 0.3;
		}
		if (intro == false && map == false && keyStates["right"]==true && player.x+player.w<1) {
			
			movement = true;
			player.x+=timePassed/1000*0.3;		}
		// Cat images state
		if (movement) {
			if (state < 1) {
				player.img = images.daisy1;
				state += timePassed/1000*3;
			} else if (state < 2) {
				player.img = images.daisy2;
				state += timePassed/1000*3;
			} else {
				state = 0;
			}
		}
		/////////////////////
		// Update graphics //
		/////////////////////
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		for (var i = 0; i < this.world.entities.length; i++) {
			this.world.entities[i].update();
		}
	}
}

function entity(img, x, y, w, h, lvl){ // entities (x,y,w,h are floats repersenting percent)
  this.img = img;
	this.x = x;
	this.y = y;
  this.w = w;
	this.h = h;
	this.update = function(){
		/*console.log("updating...");*/
		ctx.drawImage(this.img,
		this.x*canvas.width,
		this.y*canvas.height,
		this.w*canvas.width, 
		this.h*canvas.height);
	}
}

function fullscreen() {
	if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
	}
}	

function keydown(event) {
  var key = keyMap[event.keyCode]
  keyStates[key] = true
}
function keyup(event) {
  var key = keyMap[event.keyCode]
  keyStates[key] = false
}