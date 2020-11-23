
var canvas = document.getElementById('mycanvas');
function fullscreen() {
	if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
	}
}	

var game_area; 

	/*game_area.interval = setInterval(update_game_area, 20);
	*/


var ctx = canvas.getContext("2d");
var main_ground = new component('100%','5%',0,'95%',0,'ground');
main_ground.img = document.getElementById('main_ground');
var daisy1 = new component('2%',0,0, '90%','images/daisy1.png','player');
daisy1.height = daisy1.width/3.7666;
var daisy2 = new component('2%',0,0, '90%','images/daisy2.png','player');
daisy2.height = daisy2.width/3.7666;

function component(width, height, x, y, img, type){
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	world.entities.push(this)
	this.update = function(){
	

		if (this.type == 'player'){
			ctx.drawImage(this.img,
			this.x,
			this.y,
			this.width, this.height);
		}

		if (this.type == 'enemy'){
			ctx.drawImage(this.img,
			this.x,
			this.y,
			this.width, this.height);
		}


		if (this.type == 'coin'){
			ctx.drawImage(this.img,
			this.x,
			this.y,
			this.width, this.height);
		}


		if (this.type == "ground") {
			ctx.drawImage(this.img,
			this.x,
			this.y,
			this.width, this.height);
		}
	}
}

function refresh(){
main_ground.update();
}

refresh();
