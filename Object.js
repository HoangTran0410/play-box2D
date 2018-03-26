function SpaceShip(x, y){

	this.timePre = 0;
	this.timeNow = 0;

	this.x = x;
	this.y = y;
	this.w = 70;
	this.h = 70;
	this.textureShip = createImg("Texture/Spaceship2.png").hide();
	this.shipBox = new b2Body('polygon', true, v(this.x, this.y), 
		[v(10, -35), v(-10, -35), v(-35, 35), v(35,35)], this.w*this.h, 0.5, 0, 0);
	this.shipBox.image(this.textureShip, 0);

	this.addShip = function(){
		ship = new SpaceShip(width/2, height/2);
	}

	this.control = function(){
		if(keyIsDown(LEFT_ARROW))
			this.shipBox.applyTorque(-this.w*this.h);
		if(keyIsDown(RIGHT_ARROW))
			this.shipBox.applyTorque(this.w*this.h);
		if(keyIsDown(UP_ARROW))
			this.shipBox.applyImpulse(v(cos(this.shipBox.angle-PI/2), 
				sin(this.shipBox.angle-PI/2)), this.w*this.h*0.2);
		if(keyIsDown(DOWN_ARROW))
			this.shipBox.applyImpulse(v(-cos(this.shipBox.angle-PI/2), 
				-sin(this.shipBox.angle-PI/2)), this.w*this.h*0.2);

		// var distance = sqrt(sq(mouseX-this.shipBox.xy.x) 
		// 	+sq(mouseY-this.shipBox.xy.y));
		// this.shipBox.applyImpulse(
		// 	v(mouseX-this.shipBox.xy.x, mouseY-this.shipBox.xy.y), 
		// 	distance);

		if(keyIsDown(32)) {
			this.fire();
		}
	}

	this.update = function(){
		// if(this.shipBox.angle > 0)
		// 	this.shipBox.applyTorque(-this.w*this.h*degrees(this.shipBox.angle));
		// else if(this.shipBox.angle < 0)
		// 	this.shipBox.applyTorque(this.w*this.h*degrees(-this.shipBox.angle));
		this.x = this.shipBox.xy.x;
		this.y = this.shipBox.xy.y;
	}


	this.fire = function(){
		this.timeNow = millis();
		if(this.timeNow - this.timePre > 100) {
			gunSound.play();

			// new Bullet(this.shipBox.xy.x, this.shipBox.xy.y,
			// 			this.shipBox.angle, 50, "Texture/bullet2.png");
			
			new Bullet(mouseX, mouseY,
						0, 50, "Texture/bullet2.png");

			this.timePre = this.timeNow;
		}
	}
}

function Bullet(x, y, angle, lifeSpan, imagePath){

	this.x = x + 35*cos(angle-PI/2);
	this.y = y + 35*sin(angle-PI/2);
	this.w = 15;
	this.h = 15;
	this.textureBull = createImg(imagePath).hide();

	this.bull = createShape('circle', this.x, this.y, this.w, this.h, this.w*this.h, 0.5, 0.6, angle);
	this.bull.applyImpulse(v(cos(angle-PI/2), sin(angle-PI/2)), 15*15);
	this.bull.image(this.textureBull, 0);
	this.bull.life = lifeSpan;
}

function Enemy(x, y){

	this.timeNow = 0;
	this.timePre = 0;

	this.x = x;
	this.y = y;
	this.w = 30;
	this.h = 50;

	this.enemyBox = createShape('box', this.x, this.y, this.w, this.h, 500, 0.5, 0.6);
	this.enemyBox.applyForce(v(0, 15), 500);
	this.enemyBox.color = color(140, 20, 140);
    this.enemyBox.display(attr1, 0);

    this.update = function(){
    	this.x = this.enemyBox.xy.x;
    	this.y = this.enemyBox.xy.y;

		// var distance = dist(ship.x, ship.y, this.x, this.y);
		// this.enemyBox.applyImpulse(v(ship.x-this.x, ship.y-this.y), distance*0.001);
		follow(this.enemyBox, ship, 0.001);

		this.enemyBox.applyAngularImpulse(10);
		this.fire();
    }

    this.fire = function(){
    	
      	gunSound.play();

    	this.timeNow = millis();
		if(this.timeNow - this.timePre > 1000) {
			var angleFire = 
			new Bullet(this.x, this.y, this.enemyBox.angle, 500, "Texture/bullet.png");
			this.timePre = this.timeNow;
		}
    }
}

function Trap(x, y){

	this.timeNow = 0;
	this.timePre = 0;

	this.x = x;
	this.y = y;
	this.w = 70;
	this.h = 15;

	this.trapBox = createShape('box', x, y, this.w, this.h, 500, 0.5, 0.6);
	this.trapBox.applyAngularImpulse(100);
	this.trapBox.applyForce(v(0, 15), 500);
	this.trapBox.color = color(0, 255, 140);
    this.trapBox.display(attr1, 0);

    this.trapBox.addTo('box', v(15, 0), v(30, 30));

    this.update = function(){
    	this.x = this.trapBox.xy.x;
    	this.y = this.trapBox.xy.y;
    	follow(this.trapBox, enemy, 0.01);
    }
}