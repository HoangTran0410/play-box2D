function SpaceShip(x, y){

	this.dir = 0;
	this.w = 70;
	this.h = 70;
	this.textureShip = createImg("Texture/Spaceship2.png").hide();
	this.textureBull = createImg("Texture/bullet2.png").hide();
	this.shipBox = createShape('circle', x, y, this.w, this.h, this.w*this.h, 0.5, 0);
	this.shipBox.image(this.textureShip, 0);

	this.addShip = function(){
		ship = new SpaceShip(250, 250);
	}

	this.control = function(){
		if(keyIsDown(LEFT_ARROW))
			this.shipBox.applyTorque(-this.w*this.h*2);
		if(keyIsDown(RIGHT_ARROW))
			this.shipBox.applyTorque(this.w*this.h*2);
		if(keyIsDown(UP_ARROW))
			this.shipBox.applyImpulse(v(cos(this.shipBox.angle-PI/2), 
				sin(this.shipBox.angle-PI/2)), this.w*this.h*0.3);
		if(keyIsDown(DOWN_ARROW))
			this.shipBox.applyImpulse(v(-cos(this.shipBox.angle-PI/2), 
				-sin(this.shipBox.angle-PI/2)), this.w*this.h*0.3);
		if(keyIsDown(32)) {
			this.fire();
		}
	}

	this.update = function(){
	}


	this.fire = function(){
		var timeNow = millis();
		if(timeNow - timeStep > 100) {
			gunSound.play();
			var xBullet = this.shipBox.xy.x+cos(this.shipBox.angle-PI/2);
			var yBullet = this.shipBox.xy.y+sin(this.shipBox.angle-PI/2);
			var bull = createShape('circle', xBullet, yBullet, 15, 15, 15*15, 0.5, 0.6);
			bull.applyImpulse(v(cos(this.shipBox.angle-PI/2), 
				sin(this.shipBox.angle-PI/2)), 15*15);
			bull.life = 50;
			bull.image(this.textureBull, 0);

			timeStep = timeNow;
		}
	}
}
