var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext("2d");

// http://jsfiddle.net/sierawski/4xezb7nL/
//example code for mouse pos

var world = new worldObject();
var updateManager = new updateManagerObject(world);
var images = [];
var state = 0; // walking state for cat
var lastUpdate = Date.now(); // Time sense last update in ms
var dy = 0;
var console_timer = 0;

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
var jump_var = false;
var over_enemy1 = false;
var object_contact = false;
var over_lvl1 = false;
var over_lvl2 = false;
var over_lvl3 = false;
var over_land1 = false;
var over_land2 = false;
var over_land3 = false;
var over_land4 = false;
var reeses1_collected = false;
var all_collected = false;
var mouse_x;
var mouse_y;
// Add key listener and key states
var keyMap = {
  68: 'd',
  65: 'a',
  87: 'w',
	32: 'space',
	37: 'left',
	38: 'up',
	39: 'right'
	
}
var keyStates = {
		a: false,
    d: false,
    w: false,
    down: false,
		space: false
}
//event listeners
window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);
window.addEventListener('mousemove', update_mouse, false);

/////////////////
// Load images //
/////////////////
images.flag1 = document.getElementById('flag1');
images.flag2 = document.getElementById('flag2');
images.reeses = document.getElementById('reeses');
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
images.lvl1_unlocked = document.getElementById('lvl1_unlocked');
images.lvl2_unlocked = document.getElementById('lvl2_unlocked');
images.lvl3_unlocked = document.getElementById('lvl3_unlocked');
images.lvl1_locked = document.getElementById('lvl1_locked');
images.lvl2_locked = document.getElementById('lvl2_locked');
images.lvl3_locked = document.getElementById('lvl3_locked');
///////////////////
// Load entities //
///////////////////



// entities

var reeses1 = new entity(images.reeses, (0), (.51), (1/20)*(1/1.3), (0));
var flag = new entity(images.flag1, (0), (.31), (1/15)*(1/1.3), (0) );
var land1 = new entity(images.dirt, (0), (.65),(1/10), (0) );
var land2 = new entity(images.dirt, (.0), (.55),(1/10), (0) );
var land3 = new entity(images.dirt, (0), (.38),(1/10), (0) );
var land4 = new entity(images.dirt, (.0), (.55),(1/10), (0) );
var heart1 = new entity(images.heart, (0), (0), (0), (1/30/canvas.height*canvas.width));
var heart2 = new entity(images.heart, (.038), (0), (0), (1/30/canvas.height*canvas.width));
var logo = new entity(images.logo, (5/10)-((3/10)*(1/1.3)/2), (-1.1), (3/10)*(1/1.3), (3/10));
var gameover_logo = new entity(images.gameover, (1/2-(1/2)*(1/1.3)/2), (-1/2), (1/2)*(1/1.3), (1/4));
var ground = new entity(images.dirt, (0), (4/5),  (1),            (1/5));
var enemy1 = new entity(images.peppa_R1, (-1), (11/15), (1/15)*(1/1.3), (0));
var player = new entity(images.daisyR1,      (0), (1), (1/10)*(1/1.3), (1/10));
var lvl1 = new entity(images.lvl1_unlocked, 1/20, 1/30, (1/15), (0), 1);
//ad 7/60 to x pos
var lvl2 = new entity(images.lvl2_locked, (1/6), (1/30), (1/15), (0), 2);
var lvl3 = new entity(images.lvl3_locked, (17/60), 1/30, (1/15), (0), 3);

// ZZ test
  

// World init (add entities to world, etc)
world.append(enemy1);
world.append(flag);
world.append(reeses1);
world.append(land1);
world.append(land2);
world.append(land3);
world.append(land4);
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
function update_mouse(event){
	rect = canvas.getBoundingClientRect();

  mouse_x = (1*event.x-rect.left)/(rect.width); 
	mouse_y = (1*event.y-rect.top)/(rect.height);
  
}
canvas.addEventListener('click', lvl1_func)



function lvl1_func(){
	if(intro == false && over_lvl1 == true){
		map = false;
		lvl1_var = true;
		land1.h = 1/30;
		land2.h = 1/30;
		land3.h = 1/30;
		land4.h = 1/30;
		land1.x = .87;
		land2.x = .55;
  	land3.x = .87;
  	land4.x = .18;
		land1.y = .65;
		land2.y = .55;
		land3.y = .38;
		land4.y = .55;
		flag.h = 1/15;
		flag.x = .894;
		reeses1.h = 1/25;
		reeses1.x = .21;
		enemy1.x = (1/3);
		enemy1.h = (1/15);
	}	enemy1_movement_r = true;
}

function lvl2_func(){
	/*if(intro == false){
		map = false;
		lvl2_var = true;
		land1.x = .18;
		land1.y = .65;
		land2.y = .6;
		land4.y = .05;

		
	}
	*/
}
function lvl3_func(){
	map = false;
	lvl2_var = true;
}
function update_x(){
	//console.log(pos.x/canvas.width);

}

//fuck fuck fuck ive tried so much shit
//document.lvl1.addEventListener('click', lvl1_func);
//canvas..addEventListener('click', lvl2_func);
//canvas.lvl3.addEventListener('click', lvl3_func);

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
		
		console_timer += (timePassed/1000) * 1;
		
		if(console_timer >= .5){
			console_timer = 0;
			//console.log(mouse_x);
		}


	var player_movement_r = false
	var player_movement_l = false;
	if(intro == true && keyStates["space"]==true){
		player.x = 0;
		intro = false;
		logo.w = 0;
		logo.h = 0;
		map = true;
	}

	if (map == true){
		player.h = 0;
		ground.w = 0;
		heart1.w = 0;
		heart2.w = 0;
		land1.h = 0;
		land2.h = 0;
		land3.h = 0;
		land4.h = 0;
		reeses1.h = 0;
		enemy1.h = 0;
		flag.h = 0;
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

	document.getElementById('lvl1_unlocked').width = lvl1.w;
	document.getElementById('lvl1_unlocked').height = lvl1.h;

	//collison code
	
	if(mouse_x >= lvl1.x && mouse_x <= lvl1.width && mouse_y >= lvl1.y && mouse_y <= lvl1.bottom){
		over_lvl1 = true;
	}
	else{
		over_lvl1 = false}
	
		
	


	if(player.bottom <= reeses1.bottom && player.bottom >= reeses1.bottom - .001 && player.width >= reeses1.x && player.x <= reeses1.width){
		reeses1.h = 0;
		reeses1_collected = true;
		all_collected = true;
	}
	

	if(all_collected == true){
		flag.img = images.flag2;
	}

	if(lvl1_var == true && flag.img == images.flag2 && player.bottom <= flag.bottom && player.bottom >= flag.bottom - .01 && player.bottom >= flag.y && player.width >= flag.x && player.x <= flag.width){
		lvl2.img = images.lvl2_unlocked;
		map = true;
		lvl1_var = false;
	}

	if((player.width >= enemy1.x && player.width <= enemy1.width) ||(player.x >= enemy1.x && player.x <= enemy1.width)){
		over_enemy1 = true;
	}
	
	else{
		over_enemy1 = false;
	}

	if(over_enemy1 == true && player.bottom >= enemy1.y && player.bottom >= enemy1.y - .1 && dy < 0 ){
		enemy1.y = 1;
		enemy1.h = 0;
		dy = .3;
	}
	//land1
	if(player.width >= land1.x + .005 && player.width <= land1.width ||player.x >= land1.x  && player.x <= land1.width){
    over_land1 = true;
    over_land3 = true;
  }
 
  else{
    over_land1 = false;
    over_land3 = false;
  }

	if(over_land1 == true && player.bottom >= land1.y && player.bottom <= land1.y + .1 && dy < 0){
		player.y = land1.y - player.h;
		grounded = true;
	
	}
	
	if(over_land1 == false && player.bottom >= land1.y && player.bottom <= land1.y + .1 ){
    gravity = true;
    grounded = false;
  }

	if(over_land1 == true && player.y >= land1.bottom - .1 && player.y <= land1.bottom && dy > 0){
    dy=0;
  }

//land 2
	
	if(player.width >= land2.x + .005 && player.width <= land2.width ||player.x >= land2.x && player.x <= land2.width - .005){
    over_land2 = true;
  }
 
  else{
    over_land2 = false;
  }


	if(over_land2 == true && player.bottom >= land2.y && player.bottom <= land2.y + .1 && dy < 0){
		player.y = land2.y - player.h;
		grounded = true;
	}
	

	if(over_land2 == false && player.bottom >= land2.y && player.bottom <= land2.y + .1 && player.x >= land2.width && player.x <= land2.width + player.w + .01 || over_land2 == false && player.bottom >= land2.y && player.bottom <= land2.y + .1 && player.width <= land2.y && player.width <= land2.y + player.w + .01){
    gravity = true;
    grounded = false;
  }

	if(over_land2 == true && player.y >= land2.bottom - .1 && player.y <= land2.bottom && dy > 0){
    dy=0;
  }
	//land3

	if(player.width >= land3.x + .005 && player.width <= land1.width ||player.x >= land1.x  && player.x <= land3.width){
    over_land3 = true;
    
  }
 
  else{
  
    over_land3 = false;
  }


	if(over_land3 == true && player.bottom >= land3.y && player.bottom <= land3.y + .1 && dy < 0){
		player.y = land3.y - player.h;
		grounded = true;
	}
	

	if(over_land3 == false && player.bottom >= land3.y && player.bottom <= land3.y + .1 ){
    gravity = true;
    grounded = false;
  }

	if(over_land3 == true && player.y >= land3.bottom - .1 && player.y <= land3.bottom && dy > 0){
    dy=0;
  }

	//land 4


	if(player.width >= land4.x + .005 && player.width <= land4.width ||player.x >= land4.x && player.x <= land4.width - .005){
    over_land4 = true;
  }
 
  else{
    over_land4 = false;
  }


	if(over_land4 == true && player.bottom >= land4.y && player.bottom <= land4.y + .1 && dy < 0){
		player.y = land4.y - player.h;
		grounded = true;
	}
	

	if(over_land4 == false && player.bottom >= land4.y && player.bottom <= land4.y + .1 && player.x >= land4.width && player.x <= land4.width + player.w + .1 || over_land4 == false && player.bottom >= land4.y && player.bottom <= land4.y + .1 && player.width <= land4.y && player.width <= land4.y + player.w + .01){
    gravity = true;
    grounded = false;
  }

	if(over_land4 == true && player.y >= land4.bottom - .1 && player.y <= land4.bottom && dy > 0){
    dy=0;
  }


//the .1 is to add the gap when player is moviang and the .01 keeps the player x from changing when hitting side of land
	if(player.width >= land1.x && player.width <= land1.x + .01 && player.bottom <= land1.bottom + player.h && player.bottom >= land1.y +.01){
		object_contact = true;
    grounded = false;
		
		
	}
	else if(player.bottom <= land2.bottom + player.h && player.bottom >= land2.y +.01 && player.width >= land2.x && player.width <= land2.x + .1|| player.bottom <= land2.bottom + player.h && player.bottom >= land2.y +.01 && player.x <= land2.width && player.x >= land2.width - .01){
		object_contact = true;
    grounded = false;	
  }

	else if(player.bottom <= land3.bottom + player.h && player.bottom >= land3.y +.01 && player.width >= land3.x && player.width <= land3.x + .1|| player.bottom <= land3.bottom + player.h && player.bottom >= land3.y +.01 && player.x <= land3.width && player.x >= land3.width - .01){
		object_contact = true;
    grounded = false;	
  }


	else if(player.bottom <= land4.bottom + player.h && player.bottom >= land4.y +.01 && player.width >= land4.x && player.width <= land4.x + .1|| player.bottom <= land4.bottom + player.h && player.bottom >= land4.y +.01 && player.x <= land4.width && player.x >= land4.width - .01){
		object_contact = true;
    grounded = false;	
  }

	else{
		object_contact = false;
	}

	if(over_enemy1 == true && player.bottom -.02 <= enemy1.bottom && player.bottom >= enemy1.y ){
		object_contact = true;
		contact = true;
	}
	else{
		object_contact = false;
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
		player.h = 0;
		heart1.w = 0;
		heart2.w = 0;
		land1.h = 0;
		land2.h = 0;
		land3.h = 0;
		land4.h = 0;
		reeses1.h = 0;
		enemy1.h = 0;
		flag.h = 0;
		gameover_logo.y+=timePassed/1000*0.4;

	}
	if(gameover_logo.y >= (11/20)){
		gameover_logo.y = (11/20);
		updateManager.stopTick()
	}

	if(gameover_logo.y == (11/20) && (keyStates["space"]==true)){
		//console.log('test');
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
	if(grounded == false){
		gravity = true;
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

		if(gameover == false && intro == false && map == false && grounded == true && (keyStates["w"]==true || keyStates["space"]==true || keyStates["up"]==true)){
			jump_var = true;
			grounded = false;
			dy = .6;
		}
		else{
			jump_var = false;
		}	

		if (gameover == false && intro == false && map == false && object_contact == false && (keyStates["a"]==true || keyStates["left"]==true) && player.x>0) {
			
			player_movement_l = true;
			player.x-= (timePassed/1000) * 0.3;
		}
		if (gameover == false && intro == false && map == false && object_contact == false && (keyStates["d"]==true || keyStates["right"]==true) && player.width<1) {
			
			player_movement_r = true;
			player.x+=timePassed/1000*0.3;	
			
		}

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
		this.bottom = this.y + this.h;
    this.width = this.x + this.w;

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