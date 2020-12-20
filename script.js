var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext("2d");

var world = new worldObject();
var updateManager = new updateManagerObject(world);
var images = [];
var state = 0; // walking state for cat
var lastUpdate = Date.now(); // Time sense last update in ms
var dy = 0;
var intro = true;
var grounded = true;
var gravity = false;
var map = false;
var lvl1_var = false;
var lvl2_var = false;
var lvl2_var = false;
var gameover = false;
var contact = false;
var damage = false;
var enemy1_movement_r = false;
var enemy1_movement_l = false;
var over_enemy1 = false;
var over_land1 = false;
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
images.flag = document.getElementById('flag');
images.peppa_R1 = document.getElementById('peppa_R1');
images.peppa_R2 = document.getElementById('peppa_R2');
images.peppa_L1 = document.getElementById('peppa_L1');
images.peppa_L2 = document.getElementById('peppa_L2');
images.heart = document.getElementById('heart');
images.dark_heart = document.getElementById('dark_heart');
images.logo = document.getElementById('logo');
images.gameover = document.getElementById('gameover');
images.dirt = document.getElementById('main_ground');
images.daisyR1 = document.getElementById('daisyR1');
images.daisyR2 = document.getElementById('daisyR2');
images.daisyL1 = document.getElementById('daisyL1');
images.daisyL2 = document.getElementById('daisyL2');
images.lvl1 = document.getElementById('lvl1');
images.lvl2 = document.getElementById('lvl2');
images.lvl3 = document.getElementById('lvl3');
///////////////////
// Load entities //
///////////////////



// entities
var land1 = new entity(images.dirt, (0), (.65),(1/10), (0) )
var heart1 = new entity(images.heart, (0), (0), (0), (1/30/canvas.height*canvas.width));
var heart2 = new entity(images.heart, (.038), (0), (0), (1/30/canvas.height*canvas.width));
var logo = new entity(images.logo, (5/10)-((3/10)*(1/1.3)/2), (-1.1), (3/10)*(1/1.3), (3/10));
var gameover_logo = new entity(images.gameover, (1/2-(1/2)*(1/1.3)/2), (-1/2), (1/2)*(1/1.3), (1/4));
var ground = new entity(images.dirt, (0), (4/5),  (1),            (1/5));
var enemy1 = new entity(images.peppa_R1, (-1), (11/15), (1/15)*(1/1.3), (0));
var player = new entity(images.daisyR1,      (0), (1), (1/10)*(1/1.3), (1/10));
var lvl1 = new entity(images.lvl1, 1/20, 1/30, (1/15), (0), 1);
//ad 7/60 to x pos
var lvl2 = new entity(images.lvl2, (1/6), (1/30), (1/15), (0), 2);
var lvl3 = new entity(images.lvl3, (17/60), 1/30, (1/15), (0), 3);
// World init (add entities to world, etc)
world.append(enemy1);
world.append(land1);
world.append(heart1);
world.append(heart2);
world.append(lvl1);
world.append(lvl2);
world.append(lvl3);
world.append(logo);
world.append(ground);
world.append(player);
world.append(gameover_logo);



// Main tick

updateManager.startTick(50); // specify  the tps

/////////////////
/// Functions ///
/////////////////

function lvl1_func(){
	map = false;
	lvl1_var = true;
	land1.h = 1/30;
	land1.x = .87;
	enemy1.x = (1/3);
	enemy1.h = (1/15);
	enemy1_movement_r = true;
}

function lvl2_func(){
	map = false;
	lvl2_var = true;
}
function lvl3_func(){
	map = false;
	lvl2_var = true;
}


//fuck fuck fuck ive tried so much shit
canvas.addEventListener('click', lvl1_func);
canvas.addEventListener('click', lvl2_func);
canvas.addEventListener('click', lvl3_func);

function worldObject() { // holds all the objects/entities in the world
	this.entities = [];
	this.append = function(entity) {
		this.entities.push(entity);
	}
}
function stop_game(){
	updateManager.stopTick();
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
	
	var player_movement_r = false
	var player_movement_l = false;
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
	if (map == false ){
		player.h = (1/10);
		ground.w = 1;
		lvl1.h = 0;
		lvl2.h = 0;
		lvl3.h = 0;
	}
	if (map == false && intro == false){
		heart1.w = (1/30);
		heart2.w = (1/30);
	}


	//collison code
	var player_bottom = player.y + player.h;
	var player_width = player.x + player.w;
	var enemy1_bottom = enemy1.y + enemy1.h;
	var enemy1_width = enemy1.x + enemy1.w;
	var land1_width = land1.x + land1.w;
	
	if((player_width >= enemy1.x && player_width <= enemy1_width) ||(player.x >= enemy1.x && player.x <= enemy1_width)){
		over_enemy1 = true;
	}
	
	else{
		over_enemy1 = false;
	}

	if((player_width >= land1.x && player_width <= land1_width) ||(player.x >= land1.x && player.x <= land1_width)){
		over_land1 = true;
	}
	else{
		over_land1 = false;
	}

	if(over_land1 == true && player_bottom >= land1.y && player_bottom <= land1.y + .1 && dy < 0){
		grounded = true;
	}
	

	if(over_enemy1 == true && player_bottom >= enemy1.y && player_bottom >= enemy1.y - .1 && dy < 0 ){
		enemy1.y = 1;
		enemy1.h = 0;
		dy = .3;
	}


	if(over_enemy1 == true && player_bottom -.02 <= enemy1_bottom && player_bottom >= enemy1.y ){
		contact = true;
	}
	else{
		contact = false;
	}

	if(contact == true && heart2.img == images.heart){
		heart2.img = images.dark_heart;
	}
	if(contact == false && heart2.img == images.dark_heart){
		damage = true;
	}
	if(contact == true && damage == true){
		heart1.img = images.dark_heart;
		gameover = true;
	}
	if(gameover == true && gameover_logo.y <= (11/20)){
		player.h= 0;
		enemy1.h = 0;
		gameover_logo.y+=timePassed/1000*0.4;
	}
	if(gameover_logo.y >= (11/20)){
		gameover_logo.y = (11/20);
		updateManager.stopTick()
	}

	if(gameover_logo.y == (11/20) && (keyStates["jump"]==true)){
		console.log('test');
		updateManager.startTick();
		gameover_logo.y = -1/2;
		intro = true;
		damage = false;
		gameover = false;
		player.x = 0;
		player.h = 1/10;
		logo.y = -1.1;

	}

	if (logo.y <= (4.9/10)){
		logo.y += .4 * (timePassed/1000);
	}
	if(logo.y >= (4.9/10)){
		logo.y = (4.9/10);	
	}
	if(logo.y == (4.9/10) && intro == true && player.x <= 1){
		player_movement_r = true;
		player.x += (timePassed/1000) * .4;	
	};
	
	// Update y player_movement 
	if(gravity == true){
		dy -= 1 * (timePassed/1000); // Gravity
	}
	
	if(grounded == true){
		dy = 0;
		gravity = false;
	}
	
	if (dy != 0) {
		player.y -= dy * (timePassed/1000); // Move the player vert
		gravity = true;
	}

	
	if (player.y>(ground.y-player.h)) { // Make sure the player can't fall into the ground
		grounded = true; // Stop y player_movement
		player.y = ground.y-player.h; // Set player to ground
	}
		//lvl 1 functions
		
		if(lvl1_var == true && enemy1.x <= (1/3) ){
			enemy1_movement_r = true;
			enemy1_movement_l = false;
		}

		if(lvl1_var == true && enemy1.x >= (1/2) ){
			enemy1_movement_l = true;
			enemy1_movement_r = false;
			}

		if(lvl1_var == true  && enemy1_movement_l == true){
			enemy1.x -= (timePassed/1000*0.15)
		}

		if(lvl1_var == true  && enemy1_movement_r == true){
			enemy1.x += (timePassed/1000*0.15)
		}

		if(gameover == false && intro == false && map == false && grounded == true && (keyStates["up"]==true || keyStates["jump"]==true)){
			grounded = false;
			dy = .6;
	}	

		if (gameover == false && intro == false && map == false && keyStates["left"]==true && player.x>0) {
			
			player_movement_l = true;
			player.x-= (timePassed/1000) * 0.3;
		}
		if (gameover == false && intro == false && map == false && keyStates["right"]==true && player.x+player.w<1) {
			
			player_movement_r = true;
			player.x+=timePassed/1000*0.3;		}
		// Cat images state
		if (player_movement_r) {
			if (state < 1) {
				player.img = images.daisyR1;
				state += timePassed/1000*3;
			} else if (state < 2) {
				player.img = images.daisyR2;
				state += timePassed/1000*3;
			} else {
				state = 0;
			}
		}


		if (player_movement_l) {
			if (state < 1) {
				player.img = images.daisyL1;
				state += timePassed/1000*3;
			} else if (state < 2) {
				player.img = images.daisyL2;
				state += timePassed/1000*3;
			} else {
				state = 0;
			}
		}


		if (enemy1_movement_r) {
			if (state < 1) {
				enemy1.img = images.peppa_R1
				state += timePassed/1000*3;
			} else if (state < 2) {
				enemy1.img = images.peppa_R2;
				state += timePassed/1000*3;
			} else {
				state = 0;
			}
		}

		if (enemy1_movement_l) {
			if (state < 1) {
				enemy1.img = images.peppa_L1;
				state += timePassed/1000*3;
			} else if (state < 2) {
				enemy1.img = images.peppa_L2;
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