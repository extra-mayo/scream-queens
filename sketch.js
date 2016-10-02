// character/user position
var xPos, yPos;

// misc image
var backgroundImage;
var menuScreen;

//images to be used (users + computer + enemy)
var redDevil;
var chanelOberlin, chanelOberlinLeft, chanelOberlinRight,
    chanel3, chanel3Left, chanel3Right,
    chanel5, chanel5Left, chanel5Right;
var deniseLeft, deniseRight;


//computer's position
var xComp, yComp;
var xCompSpeed, yCompSpeed;


//user's enemy position
var xDenise, yDenise;
var xDeniseSpeed, yDeniseSpeed;


//scores
var points = 0;
var ran = 0;
var caught = 0;

//difficulty
var selectedDifficulty = false;


//load all the appropriate images
function preload() {
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
    backgroundImage = loadImage('images/background.jpg');
    scream = loadSound('images/scream.mp3');
    deniseLeft = loadImage('images/denise-left.png');
    deniseRight = loadImage('images/denise-right.png');
    menuScreen = loadImage('images/menu-screen.jpg');
}
//menu selection, set speed for computer and enemy depending on difficulty
function selectDifficulty(difficulty) {
    //if selected easy, then set of both char to 0.5, hide the menu, and set true for "selectedDifficulty"
    if (difficulty.value == "easy") {
        xCompSpeed = 0.5;
        yCompSpeed = 0.5;
        xDeniseSpeed = 0.5;
        yDeniseSpeed = 0.5;
        document.getElementById("difficultSelector").style.display = "none";
        selectedDifficulty = true;
    }
    //if selected medium, set speed to 1, hide menu, and set true for "selectedDifficulty"
    else if (difficulty.value == "medium") {
        xCompSpeed = 1;
        yCompSpeed = 1;
        xDeniseSpeed = 1;
        yDeniseSpeed = 1;
        document.getElementById("difficultSelector").style.display = "none";
        selectedDifficulty = true;
    }
    //if selected hard, set speed to 1.5, hide menu, and set true for "selectedDifficulty"
    else {
        xCompSpeed = 1.5;
        yCompSpeed = 1.5;
        xDeniseSpeed = 1.5;
        yDeniseSpeed = 1.5;
        document.getElementById("difficultSelector").style.display = "none";
        selectedDifficulty = true;
    }
}

//set up
function setup() {
    //create canvas
    var canvas = createCanvas(500, 500);
    //show menu background image, aka Scream Queens poster
    image(menuScreen, 250, 250, 500, 500);

    //set user's starting point in one of four rand places
    characterStartingPoint();
    //set enemy's starting point in one of four rand places
    enemyStartingPoint();
    //set computer's or victim's starting pt to one of four rand places
    computerStartingPoint();

    fill(255);

}

function draw() {
    //if user has selected difficulty, then proceed
    if (selectedDifficulty === true) {


        //draw the background image
        image(backgroundImage, 250, 250, 500, 500);

        //keep track of the score and time
        text("Chanels offed: " + points, 20, 20);
        text("Chanels escaped: " + ran, 20, 40)
        text("Times caught: " + caught, 20, 60)
        text("Time played: " + (int)(millis() / 1000) + " s", 20, 80);



       //Computer runs from user when user is idle, whereas user's enemy runs towards user.

        if (!keyIsPressed) {
            //xComp is left of user-- xComp should run in left direction
            if (xComp < xPos) {
                xComp -= xCompSpeed;
            }
            //enemy aka denise is left of user, so enemy runs in right direction
            if (xDenise < xPos) {
                xDenise += xDeniseSpeed;
            }
            //xComp is right of user, so comp should run in right direction
            if (xComp > xPos) {
                xComp += xCompSpeed;
            }
            //enemy aka denise is right of user, so enemy runs in left direction
            if (xDenise > xPos) {
                xDenise -= xDeniseSpeed;
            }

            //if yComp is top of user,  comp runs top
            if (yComp < yPos) {
                yComp -= yCompSpeed;
            }

            //if enemy (denise) is top of user, enemy runs bottom
            if (yDenise < yPos) {
                yDenise += yDeniseSpeed;
            }
            //yComp is bottom of user, so comp runs bottom
            if (yComp > yPos) {
                yComp += yCompSpeed;

            }
            //enemy (Denise) is bottom of user, so enemy runs top
            if (yDenise > yPos) {
                yDenise -= yDeniseSpeed;
            }

        }
        // User moves left; same logic as above
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
            //comp is left of user
            if (xComp < xPos) {

                xComp -= xCompSpeed;
            }
            //comp is right of user
            else {

                xComp += xCompSpeed;
            }
            //enemy is left of user
            if (xDenise < xPos) {
                xDenise += xDeniseSpeed;
            }
            //enemy is right of user
            else {
                xDenise -= xDeniseSpeed;
            }
            xPos -= 5;
        }
        // User moves right; same logic asabove
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
            if (xComp < xPos) {

                xComp -= xCompSpeed;
            }
            else {

                xComp += xCompSpeed;
            }
            if (xDenise < xPos) {
                xDenise += xDeniseSpeed;
            }
            else {
                xDenise -= xDeniseSpeed;
            }

            xPos += 5;
        }
        // User moves up; same logic as above
        if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
            if (yComp < yPos) {

                yComp -= yCompSpeed;
            }
            else {

                yComp += yCompSpeed;
            }

            if (yDenise < yPos) {
                yDenise += yDeniseSpeed;
            }
            else {
                yDenise -= yDeniseSpeed;
            }
            yPos -= 5;
        }
        //User moves down; same logic as above
        if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
            if (yComp < yPos) {

                yComp -= yCompSpeed;
            }
            else {

                yComp += yCompSpeed;
            }

            if (yDenise < yPos) {
                yDenise += yDeniseSpeed;
            }
            else {
                yDenise -= yDeniseSpeed;
            }
            yPos += 5;
        }

        //65 - A - Left
        //68 - D - Right
        //87 - W - Up
        //83 - S - Down


        // wrap around logic for user
        //user runs beyond-left, should end up at right side
        if (xPos > width) {
            xPos = 0;
        }
        //user runs beyond-right, should end up at left side
        if (xPos < 0) {
            xPos = width;
        }
        //user runs beyond-bottom, should end up at top side
        if (yPos > height) {
            yPos = 0;
        }
        //user runs beyond-top, should end up at bottom side
        if (yPos < 0) {
            yPos = height;
        }

        //if computer successfully gets away, reset positions and update score (ran)
        if (xComp > width || xComp < 0 || yComp > height || yComp < 0) {
            computerStartingPoint();
            characterStartingPoint();
            enemyStartingPoint();
            ran++;
        }

        //if collision happens btwn user and computer, reset positions and update score (points)
        if (dist(xPos, yPos, xComp, yComp) < 45) {
            computerStartingPoint();
            characterStartingPoint();
            enemyStartingPoint();
            points++;
        }
        //if collision happens between enemy and user, reset position and update score (ran AND caught)
        if (dist(xPos, yPos, xDenise, yDenise) < 45){
            computerStartingPoint();
            characterStartingPoint();
            enemyStartingPoint();
            ran++;
            caught++;
        }


        // draw the user
        image(redDevil, xPos, yPos, 45, 65);



        //draw enemy
        //if enemy/denise is right of user, make enemy face towards user.
        if (dist(xPos, yPos, xDenise, yDenise) > 100 && xDenise <= xPos){
            image(deniseRight, xDenise, yDenise, 60, 75);
        }
        //if enemy/denise is left of user, make enemy face towards user.
        else {
            image(deniseLeft, xDenise, yDenise, 60, 75);
        }


        //draw the computer based on the points.
        var chanelRand = points % 3;

        //the one supreme chanel face-direction
        if (chanelRand === 0) {
            //if chanel is runnig left and is far from user, then show her left side image
            if (dist(xPos, yPos, xComp, yComp) > 100 && xComp <= xPos) {
                image(chanelOberlinLeft, xComp, yComp, 55, 65);

            }
            //if chanel is running right and is far from user, show her right side image
            else if (dist(xPos, yPos, xComp, yComp) > 100 && xComp > xPos) {
                image(chanelOberlinRight, xComp, yComp, 55, 65);
            }
            else {
                //otherwise, show her screaming as she is close to user
                image(chanelOberlin, xComp, yComp, 45, 65);
                changeSpeedWhenScream();

            }
        }
        //chanel 3 face-direction; same logic as above
        else if (chanelRand === 1) {

            if (dist(xPos, yPos, xComp, yComp) > 100 && xComp <= xPos) {
                image(chanel3Left, xComp, yComp, 45, 65);
            }
            else if (dist(xPos, yPos, xComp, yComp) > 100 && xComp > xPos) {
                image(chanel3Right, xComp, yComp, 45, 65);
            }
            else {
                image(chanel3, xComp, yComp, 55, 65);
                changeSpeedWhenScream();
            }
        }
        //chanel 5 face-direction; same logic as above
        else {
            if (dist(xPos, yPos, xComp, yComp) > 100 && xComp <= xPos) {
                image(chanel5Left, xComp, yComp, 45, 65);
            }
            else if (dist(xPos, yPos, xComp, yComp) > 100 && xComp > xPos) {
                image(chanel5Right, xComp, yComp, 45, 65);
            }
            else {
                image(chanel5, xComp, yComp, 45, 55);
                changeSpeedWhenScream();
            }
        }
    }
}

//CHEAT: range-slider HTML-- update speed of Chanel/Computer
function updateChanelSpeed(speed){
    xCompSpeed = float(speed.value);
    yCompSpeed = float(speed.value);
    console.log(xCompSpeed + " Computer " + yCompSpeed);
}
//CHEAT: range-slider HTML-- update speed of enemy/Denise
function updateDeniseSpeed(speed){
    xDeniseSpeed = float(speed.value);
    yDeniseSpeed = float(speed.value);
    console.log(xDeniseSpeed + " Denise " + yDeniseSpeed);
}

//enemy starts in one of four places
function enemyStartingPoint() {
    var rand = random(0, 4);

    //top-left
    if (rand < 1) {
        xDenise = 50;
        yDenise = 50;
    }
    //top-right
    else if (rand < 2) {
        xDenise = 450;
        yDenise = 50;
    }
    //bottom-left
    else if (rand < 3) {
        xDenise = 50;
        yDenise = 450;
    }
    //bottom-right
    else {
        xDenise = 450;
        yDenise = 450;
    }


}

//function that resets user's starting point
function characterStartingPoint() {

    var rand = random(0, 4);

    //Character's starting point in one of four random positions:
    //top
    if (rand < 1) {
        xPos = 250;
        yPos = 75;
    }
    //left
    else if (rand < 2) {
        xPos = 75;
        yPos = 250;
    }
    //bottom
    else if (rand < 3) {
        xPos = 250;
        yPos = 425;
    }
    //right
    else {
        xPos = 425;
        yPos = 250;
    }

}

//function that determines computer's starting position
function computerStartingPoint() {
    //basically, dead center of canvas
    xComp = 250;
    yComp = 250;
}

//when user comes near the computer, the computer will be shown "Screaming"
//while in Scream-mode, computer will move faster, as if it's got truckload of adrenaline.
function changeSpeedWhenScream() {
    //left
    scream.play();
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
        if (xComp < xPos) {
            xComp -= 0.3;
        }
        else {
            xComp += 0.3;
        }
    }
    // D key - right
    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
        if (xComp < xPos) {
            xComp -= 0.3;
        }
        else {
            xComp += 0.3;
        }
    }
    // W key - up
    if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
        if (yComp < yPos) {
            yComp -= 0.3;
        }
        else {
            yComp += 0.3;
        }
    }
    // S key - down
    if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
        if (yComp < yPos) {
            yComp -= 0.3;
        }
        else {
            yComp += 0.3;
        }
    }
}
