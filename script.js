var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext("2d");
function log(){
	console.log('hello');
}
var world = new worldObject();
var updateManager = new updateManagerObject(world);
var images = [];
var state = 0; // walking state for cat
var lastUpdate = Date.now(); // Time sense last update in ms
var dy = 0;
var intro = true;
var jump = false;
var gravity = false;


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

///////////////////
// Load entities //
///////////////////

// entities

var logo = new entity(images.logo, (5/10)-((3/10)*(1/1.3)/2), (-1.1), (3/10)*(1/1.3), (3/10));
var ground = new entity(images.main_ground, (0), (4/5),  (1),            (1/5));
var player = new entity(images.daisy1,      (0), (1), (1/10)*(1/1.3), (1/10));

// World init (add entities to world, etc)

world.append(logo);
world.append(ground);
world.append(player);

// Main tick

updateManager.startTick(50); // specify the tps

/////////////////
/// Functions ///
/////////////////

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
	
	if(intro == false && player.y>=(ground.y-player.h)-0.02 && (keyStates["up"]==true || keyStates["jump"]==true) ){
		dy=.6;
		console.log("Jump");
	}
	if (logo.y <= (4.9/10)){
		logo.y += .4 * (timePassed/1000);
	}
	if(logo.y >= (4.9/10)){
		logo.y = (4.9/10);	
	}
	if(logo.y == (4.9/10) && player.x <= 1){
		movement = true;
		player.x += (timePassed/1000) *
 		.4	
	};
	if(player.x >= 1){
		ctx.font = '30px Arial'
		ctx.fillText("Hello World", .5, .5);
	}
	// Update y movement
	if (dy != 0) {
		player.y -= dy * (timePassed/1000); // Move the player vert
		dy -= 1 * (timePassed/1000); // Gravity
	}
	
	if (player.y>(ground.y-player.h)) { // Make sure the player can't fall into the ground
		dy = 0; // Stop y movement
		player.y = ground.y-player.h; // Set player to ground
	}

		if (intro == false && keyStates["left"]==true && player.x>0) {
			movement = true;
			player.x-= (timePassed/1000) * 0.2;
		}
		if (intro == false && keyStates["right"]==true && player.x+player.w<1) {
			movement = true;
			player.x+=timePassed/1000*0.2;
		}
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

function entity(img, x, y, w, h){ // entities (x,y,w,h are floats repersenting percent)
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