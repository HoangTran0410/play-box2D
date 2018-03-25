var mouse = null;
var mouseIndex;

var ship;
var gunSound;
var backImage;
var meteoriteImage;
var waterImage;

function setup() {
    createCanvas(600, 600);
    noCursor();

    imageMode(CENTER);
    gunSound = loadSound("Sound/Player_Shoot.wav");
    gunSound.setVolume(0.5);
    backImage = createImg("Texture/BackGround2.jpeg").hide();
    meteoriteImage = createImg("Texture/meteorite.png").hide();
    waterImage = createImg("Texture/Water.png").hide();

    createGui();
    b2newWorld(45, v(0, 0));
    createWall(width/2, 0, width, 5); // Top wall
    createWall(width/2, height, width, 5); // bottom wall
    createWall(0, height/2, 5, height); // left wall
    createWall(width, height/2, 5, height); // right wall
    ship = new SpaceShip(250, 250);

    // for(var i =0; i < 15; i++){
    //     var big = random(10, 70);
    //     var c = createShape('circle', random(width), random(height), big, big, big*big, 0.5, 0.6);
    //     c.applyImpulse(v(random(10), random(10)), 0.1);
    //     c.image(meteoriteImage, 0);
    // }
}

function draw() {
    //image(backImage, width/2, height/2, width, height);
    background(20, 200);

    if(!newGUI.pause){
        ship.control();
        ship.update();
        b2Update();
    }
    
    if (mouse != null) mouse.setTarget(v(mouseX, mouseY), mouseIndex);

    // if(random()<1 && !newGUI.pause){
    //     var shapeNew = createShape('circle', random(width), 5, 10, 10, 1, 0.5, 0.1);
    //     shapeNew.life = 30;
    //     shapeNew.image(waterImage, 0);
    //     shapeNew.applyImpulse(v(0, random(1,5)), 0.1);
    // }      

    b2Draw(false);
    displayMouse();

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
        ellipse(mouseX, mouseY, 15, 15);
    }else{
        ellipse(mouseX, mouseY, 10, 10);
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

function createShape(type, x, y, w, h, density, friction, bounce) { 
    var shape = new b2Body(type, true, v(x, y), v(w, h), density, friction, bounce);
    return shape;
}

function attr1(body, fixture, position) {
    fill(body.color);
    b2Display(body, fixture, position);
}
