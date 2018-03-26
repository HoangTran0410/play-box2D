var mouse = null;
var mouseIndex;

var ship;
var enemy;
var trap;
var shipImg;
var gunSound;
var timePre;
var backImage;

function preload(){
    gunSound = loadSound("Sound/Player_Shoot.wav");
    backImage = createImg("Texture/BackGround2.jpeg").hide();
    // ship at mouse posotion
    shipImg = createImg("Texture/Spaceship2.png").hide(); 
}

function setup() {
    createCanvas(600, 600);
    noCursor();

    imageMode(CENTER);
    timePre = millis();

    createGui();
    b2newWorld(45, v(0, 0));

    //createWall(width/2, 0, width, 5); // Top wall
    createWall(width/2, height, width, 5); // bottom wall
    createWall(0, height/2, 5, height); // left wall
    createWall(width, height/2, 5, height); // right wall

    ship = new SpaceShip(250, 250);
    enemy = new Enemy(100, 100);
    trap = new Trap(200, 200);
}

function draw() {
    //image(backImage, width/2, height/2, width, height);
    background(20, 200);

    if(!newGUI.pause){
        ship.control();
        ship.update();

        enemy.update();
        trap.update();
        b2Update();
    }

    b2Draw(false);
    image(shipImg, mouseX, mouseY, 80, 80);
    displayMouse();
    
    if (mouse != null) mouse.setTarget(v(mouseX, mouseY), mouseIndex); // join mouse and object
    if(keyIsDown(81)){ // Q key
        deleteObject();
    }
}

function keyPressed(){
    if(keyCode  == 32)
        ship.fire();
    else if(keyCode == 66){ // B key
        newGUI.addBox();
    } else if(keyCode == 67){ // C key
        newGUI.addCir();
    } else if(keyCode == 80){ // P key
        newGUI.pauseF();
    } else if(keyCode == 83){ // S key
        newGUI.addShip();
    }
}

function mousePressed() {
    var b = b2GetBodyAt(mouseX, mouseY);
    if (b == null) return;
    mouse = b;
    mouseIndex = b2Joint("mouse", null, b, {xy: v(mouseX, mouseY)});
}

function mouseReleased() {
    if (mouse != null) mouse.destroyJoint();
    mouse = null;
}

function displayMouse(){
    fill(255, 50, 50, 200);
    if(mouseIsPressed){
        ellipse(mouseX, mouseY, 18, 18);
    }else{
        ellipse(mouseX, mouseY, 5, 5);
    }
}

function deleteObject() {
    var b = b2GetBodyAt(mouseX, mouseY);
    if (b == null) return;
    b.destroy();
}

function v(x, y){
    return createVector(x, y);
}

function createWall(x, y, w, h) { 
    return new b2Body('box', false, v(x, y), v(w, h)); 
}

function createShape(type, x, y, w, h, density, friction, bounce, angle = 0) { 
    return new b2Body(type, true, v(x, y), v(w, h), density, friction, bounce, angle);;
}

function attr1(body, fixture, position) {
    fill(body.color);
    b2Display(body, fixture, position);
}

function follow(objectFollow, followTo, force){
    var distance = dist(followTo.x, followTo.y, objectFollow.xy.x, objectFollow.xy.y);
    objectFollow.applyImpulse(v(followTo.x-objectFollow.xy.x, followTo.y-objectFollow.xy.y), distance*force);
}

function createRain(){
    var waterImage = createImg("Texture/Water.png").hide();
    if(random()<1 && !newGUI.pause){
        var shapeNew = createShape('circle', random(width), 5, 10, 10, 1, 0.5, 0.1);
        shapeNew.life = 30;
        shapeNew.image(waterImage, 0);
        shapeNew.applyImpulse(v(0, random(1,5)), 0.1);
    }  
}

function createMeteorite(){
    var meteoriteImage = createImg("Texture/meteorite.png").hide();
    for(var i =0; i < 15; i++){
        var big = random(10, 70);
        var c = createShape('circle', random(width), random(height), big, big, big*big, 0.5, 0.6);
        c.applyImpulse(v(random(10), random(10)), 0.1);
        c.image(meteoriteImage, 0);
    }
}