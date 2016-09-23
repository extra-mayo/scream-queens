// character position
var xPos, yPos;

// var scene;

//images to be used
var redDevil;
var chanelOberlin, chanelOberlinLeft, chanelOberlinRight,
    chanel3, chanel3Left, chanel3Right, 
    chanel5, chanel5Left, chanel5Right;



//computer position
var xComp, yComp;
var accel = 0.03;
var xSpeed, ySpeed;

//scores
var points = 0;
var ran = 0;


function preload(){
  imageMode(CENTER);
  redDevil = loadImage('images/red-devil.png');
  chanelOberlin = loadImage('images/chanel-oberlin.png');
  chanelOberlinLeft = loadImage('images/chanel-oberlin-left.png');
  chanelOberlinRight = loadImage('images/chanel-oberlin-right.png');
  chanel3 = loadImage('images/chanel-3.png');
  chanel3Left = loadImage('images/chanel-3-left.png');
  chanel3Right = loadImage('images/chanel-3-right.png');
  chanel5 = loadImage('images/chanel-5.png');
  chanel5Left = loadImage('images/chanel-5-left.png');
  chanel5Right = loadImage('images/chanel-5-right.png');
  // scene = loadImage('images/background.png');

 
}

function setup() {
  createCanvas(500, 500);

  // default the character to the middle of the screen
  characterStartingPoint();
  
  
  //chanel positions
  xComp = 250;
  yComp = 250;
  
  //chanel speed
  xSpeed = 0.1;
  ySpeed = 0.1;

  fill(255);
  // noStroke();
}

function draw() {
  
  // image(scene, 250, 250);
  background(0);

  text("Chanels offed: " + points, 20, 20);
  text("Chanels escaped: " + ran, 20, 40)
  text("Time played: " + (int)(millis()/1000) + " s", 20, 60);

  
  if (!keyIsPressed){
    //xComp is left of user
    if (xComp < xPos){
      xSpeed -= accel;
      xComp += xSpeed;
      // xComp -= 1.5;
    }
    //xComp is right of user
    if (xComp > xPos){
      xSpeed += accel;
      xComp += xSpeed;
      // xComp += 1.5;
    }
    
    //if yComp is top of user
    if (yComp < yPos){
      ySpeed -= accel;
      yComp += ySpeed;
      //yComp -=1.5;
    }
    //yComp is bottom of user
    if (yComp > yPos){
      ySpeed += accel;
      yComp += ySpeed;
      // yComp +=1.5;
    }
    
  }
  // move left?
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    if (xComp < xPos){
      xSpeed -= accel;
      xComp += xSpeed;
    }
    else {
      xSpeed += accel;
      xComp += xSpeed;
    }
    xPos -= 5;
  }
  // move right?
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    if (xComp < xPos){
      xSpeed -= accel;
      xComp += xSpeed;
    }
    else {
      xSpeed += accel;
      xComp += xSpeed;
    }
    xPos += 5;
  }
  // move up?
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    if (yComp < yPos){
      ySpeed -= accel;
      yComp += ySpeed;
    }
    else {
      ySpeed += accel;
      yComp += ySpeed;
    }
    yPos -= 5;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    if (yComp < yPos){
      ySpeed -= accel;
      yComp += ySpeed;
    }
    else {
      ySpeed += accel;
      yComp += ySpeed;
    }
    yPos += 5;
  }
  
  // note: for non-coded keys (i.e. the 'A' key) you will need to figure out the
  // integer code of the key in quesiton and use it in place of the constant
  // values above (i.e. replace UP_ARROW with an integer representing the key code
  // of the desired key) - you can do this by printing out the 'keyCode' variable
  // inside of the keyPressed() function
  //65 - A - Left
  //68 - D - Right
  //87 - W - Up
  //83 - S - Down
  
  
  // wrap around logic for character
  if (xPos > width) {
    xPos = 0;
  }
  if (xPos < 0) {
    xPos = width;
  }
  if (yPos > height) {
    yPos = 0;
  }
  if (yPos < 0) {
    yPos = height;
  }
  
  //computer successfully get away:
  if (xComp > width || xComp < 0 || yComp > height || yComp < 0){
      computerStartingPoint();
      characterStartingPoint();
      ySpeed = 0.1;
      xSpeed = 0.1;
  }
  
  //if collision happens
  if (dist(xPos, yPos, xComp, yComp) < 45) {
    characterStartingPoint();
    points++;
    ySpeed = 0.1;
    xSpeed = 0.1;
  }
  
  
  
  // draw the character
  image(redDevil, xPos, yPos, 45, 65);
  
  
  //draw the chanels
  var chanelRand = points % 3;
  
  //the one supreme chanel
  if (chanelRand === 0){
    if (dist(xPos, yPos, xComp, yComp)  > 100 && xComp <= xPos) {
        image(chanelOberlinLeft, xComp, yComp, 55, 65);
        
    }
    else if (dist(xPos, yPos, xComp, yComp)  > 100 && xComp > xPos){
        image(chanelOberlinRight, xComp, yComp, 55, 65);
    }
    else {
      image(chanelOberlin, xComp, yComp, 45, 65);
      changeSpeedWhenScream();
      
    }
  }
  //chanel 3
  else if ( chanelRand === 1){
    
        if (dist(xPos, yPos, xComp, yComp)  > 100 && xComp <= xPos) {
        image(chanel3Left, xComp, yComp, 45, 65);
    }
    else if (dist(xPos, yPos, xComp, yComp)  > 100 && xComp > xPos){
        image(chanel3Right, xComp, yComp, 45, 65);
    }
    else {
      image(chanel3, xComp, yComp, 55, 65);
      changeSpeedWhenScream();
    }
  }
  //chanel 5
  else {
        if (dist(xPos, yPos, xComp, yComp)  > 100 && xComp <= xPos) {
        image(chanel5Left, xComp, yComp, 45, 65);
    }
    else if (dist(xPos, yPos, xComp, yComp)  > 100 && xComp > xPos){
        image(chanel5Right, xComp, yComp, 45, 65);
    }
    else {
      image(chanel5, xComp, yComp, 45, 55);
      changeSpeedWhenScream();
    }
  }


}

function characterStartingPoint(){
  
  var rand = random(0, 4);
  
  //Character's starting point: 
  //top
  if (rand < 1){
    xPos = 250;
    yPos = 75;
  }
  //left
  else if (rand < 2){
    xPos = 75;
    yPos = 250;
  }
  //bottom
  else if (rand < 3){
    xPos = 250;
    yPos = 425;
  }
  //right
  else {
    xPos = 425;
    yPos = 250;
  }

}

function computerStartingPoint(){
  xComp = 250;
  yComp = 250
  ran++;
}

function changeSpeedWhenScream (){
  //left
  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
         if (xComp < xPos){
            xComp -= 0.3;
          }
         else {
            xComp += 0.3;
          }
        }
      // D key - right
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
        if (xComp < xPos){
          xComp -= 0.3;
        }
        else {
          xComp += 0.3;
        }
      }
      // W key - up
  if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
        if (yComp < yPos){
          yComp -= 0.3;
        }
        else {
          yComp += 0.3;
        }
      }
      // S key - down
  if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
        if (yComp < yPos){
          yComp -= 0.3;
        }
        else {
          yComp += 0.3;
        }
      }
}
