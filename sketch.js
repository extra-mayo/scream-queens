// misc image
var backgroundImage;
var menuScreen;

//images to be used (users + computer + enemy)
var redDevil;
var chanelOberlin, chanelOberlinLeft, chanelOberlinRight,
    chanel3, chanel3Left, chanel3Right,
    chanel5, chanel5Left, chanel5Right;
var deniseLeft, deniseRight;

//characters
var player, enemy, victim;

//scores
var points = 0;
var ran = 0;
var caught = 0;

//difficulty
var selectedDifficulty = false;
var speed = 0;


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
        player = new Player();
        enemy = new Enemy(0.5);
        victim = new Victim(0.5);
        document.getElementById("difficultSelector").style.display = "none";
        selectedDifficulty = true;
    }
    //if selected medium, set speed to 1, hide menu, and set true for "selectedDifficulty"
    else if (difficulty.value == "medium") {
        player = new Player();
        enemy = new Enemy(1);
        victim = new Victim(1);
        document.getElementById("difficultSelector").style.display = "none";
        selectedDifficulty = true;
    }
    //if selected hard, set speed to 1.5, hide menu, and set true for "selectedDifficulty"
    else {
        player = new Player();
        enemy = new Enemy(2);
        victim = new Victim(2);
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


    fill(255);
}

function draw() {
    //if user has selected difficulty, then proceed
    if (selectedDifficulty) {
        //draw the background image
        image(backgroundImage, 250, 250, 500, 500);

        showScores();

        player.move();
        player.display();

        victim.runFromUser(player.xPos, player.yPos);
        victim.display(player.xPos, player.yPos);

        enemy.chaseUser(player.xPos, player.yPos);
        enemy.display(player.xPos, player.yPos);

        if (victim.detectHit(player.xPos, player.yPos) ||
            victim.detectEscape() || enemy.detectHit(player.xPos, player.yPos)) {
            victim.resetPosition();
            enemy.resetPosition();
            player.resetPosition();
        }

    }
}

function showScores() {
    //keep track of the score and time
    text("Chanels offed: " + points, 20, 20);
    text("Chanels escaped: " + ran, 20, 40)
    text("Times caught: " + caught, 20, 60)
    text("Time played: " + (int)(millis() / 1000) + " s", 20, 80);

}

function Player() {
    this.xPos = 250;
    this.yPos = 250;
    this.resetPosition = function () {
        var rand = random(0, 4);
        //Character's starting point in one of four random positions:
        //top
        if (rand < 1) {
            this.xPos = 250;
            this.yPos = 75;
        }
        //left
        else if (rand < 2) {
            this.xPos = 75;
            this.yPos = 250;
        }
        //bottom
        else if (rand < 3) {
            this.xPos = 250;
            this.yPos = 425;
        }
        //right
        else {
            this.xPos = 425;
            this.yPos = 250;
        }
    };
    this.move = function () {

        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
            this.xPos -= 5;
        }
        // User moves right;
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
            this.xPos += 5;
        }
        // User moves up;
        if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
            this.yPos -= 5;
        }
        //User moves down;
        if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
            this.yPos += 5;
        }

        // wrap around logic for user
        //user runs beyond-left, should end up at right side
        if (this.xPos > width) {
            this.xPos = 0;
        }
        //user runs beyond-right, should end up at left side
        if (this.xPos < 0) {
            this.xPos = width;
        }
        //user runs beyond-bottom, should end up at top side
        if (this.yPos > height) {
            this.yPos = 0;
        }
        //user runs beyond-top, should end up at bottom side
        if (this.yPos < 0) {
            this.yPos = height;
        }
    };
    this.display = function () {
        // draw the user
        image(redDevil, this.xPos, this.yPos, 45, 65);
    };
}

function Enemy(speed) {
    this.xPos = 250;
    this.yPos = 250;
    this.xSpeed = speed;
    this.ySpeed = speed;
    this.resetPosition = function () {
        var rand = random(0, 4);

        //top-left
        if (rand < 1) {
            this.xPos = 50;
            this.yPos = 50;
        }
        //top-right
        else if (rand < 2) {
            this.xPos = 450;
            this.yPos = 50;
        }
        //bottom-left
        else if (rand < 3) {
            this.xPos = 50;
            this.yPos = 450;
        }
        //bottom-right
        else {
            this.xPos = 450;
            this.yPos = 450;
        }
    };
    this.chaseUser = function (xPos, yPos) {
        //enemy is left of user
        if (this.xPos < xPos) {
            this.xPos += this.xSpeed;
        }
        //enemy is right of user
        else if (this.xPos > xPos) {
            this.xPos -= this.xSpeed;
        }
        if (this.yPos < yPos) {
            this.yPos += this.ySpeed;
        }
        else if (this.yPos > yPos) {
            this.yPos -= this.ySpeed;
        }
    };
    this.display = function (xPos, yPos) {
        //draw enemy
        //if enemy/denise is right of user, make enemy face towards user.
        if (dist(xPos, yPos, this.xPos, this.yPos) > 100 && this.xPos <= xPos) {
            image(deniseRight, this.xPos, this.yPos, 60, 75);
        }
        //if enemy/denise is left of user, make enemy face towards user.
        else {
            image(deniseLeft, this.xPos, this.yPos, 60, 75);
        }
    };
    this.detectHit = function (xPos, yPos) {
        if (dist(xPos, yPos, this.xPos, this.yPos) < 45) {
            ran++;
            caught++;
            return true;
        }
        return false;
    }
}

function Victim(speed) {
    this.xPos = 250;
    this.yPos = 250;
    this.xSpeed = speed;
    this.ySpeed = speed;
    this.resetPosition = function () {
        this.xPos = 250;
        this.yPos = 250;
    };
    this.runFromUser = function (xPos, yPos) {
        //victim is left of user
        if (this.xPos < xPos) {
            console.log(this.xSpeed);
            this.xPos -= this.xSpeed;
        }
        //victim is right of user
        else if (this.xPos > xPos) {
            this.xPos += this.xSpeed;
        }
        if (this.yPos < yPos) {
            this.yPos -= this.ySpeed;
        }
        else if (this.yPos > yPos) {
            this.yPos += this.ySpeed;
        }
    };
    this.display = function (xPos, yPos) {
        //draw the computer based on the points.
        var chanelRand = points % 3;

        //the one supreme chanel face-direction
        if (chanelRand === 0) {
            //if chanel is runnig left and is far from user, then show her left side image
            if (dist(xPos, yPos, this.xPos, this.yPos) > 100 && this.xPos <= xPos) {
                image(chanelOberlinLeft, this.xPos, this.yPos, 55, 65);
            }
            //if chanel is running right and is far from user, show her right side image
            else if (dist(xPos, yPos, this.xPos, this.yPos) > 100 && this.xPos > xPos) {
                image(chanelOberlinRight, this.xPos, this.yPos, 55, 65);
            }
            else {
                //otherwise, show her screaming as she is close to user
                image(chanelOberlin, this.xPos, this.yPos, 45, 65);
                this.changeSpeedWhenScream();
            }
        }
        //chanel 3 face-direction; same logic as above
        else if (chanelRand === 1) {

            if (dist(xPos, yPos, this.xPos, this.yPos) > 100 && this.xPos <= xPos) {
                image(chanel3Left, this.xPos, this.yPos, 45, 65);
            }
            else if (dist(xPos, yPos, this.xPos, this.yPos) > 100 && this.xPos > xPos) {
                image(chanel3Right, this.xPos, this.yPos, 45, 65);
            }
            else {
                image(chanel3, this.xPos, this.yPos, 55, 65);
                this.changeSpeedWhenScream();
            }
        }
        //chanel 5 face-direction; same logic as above
        else {
            if (dist(xPos, yPos, this.xPos, this.yPos) > 100 && this.xPos <= xPos) {
                image(chanel5Left, this.xPos, this.yPos, 45, 65);
            }
            else if (dist(xPos, yPos, this.xPos, this.yPos) > 100 && this.xPos > xPos) {
                image(chanel5Right, this.xPos, this.yPos, 45, 65);
            }
            else {
                image(chanel5, this.xPos, this.yPos, 45, 55);
                this.changeSpeedWhenScream();
            }
        }
    };
    this.changeSpeedWhenScream = function (xPos, yPos) {
        //left
        scream.play();

        if (this.xPos < xPos) {
            this.xSpeed -= 1;
        }
        else if (this.xPos > xPos) {
            this.xSpeed += 1;
        }
        if (this.yPos < yPos) {
            this.ySpeed -= 1;
        }
        else if (this.yPos > yPos) {
            this.ySpeed += 1;
        }
    };
    this.detectHit = function (xPos, yPos) {
        if (dist(xPos, yPos, this.xPos, this.yPos) < 45) {
            points++;
            return true;
        }
        return false;
    };
    this.detectEscape = function () {
        if (this.xPos > width || this.xPos < 0 || this.yPos > height || this.yPos < 0) {
            ran++;
            return true;
        }
        return false;
    }
}


//CHEAT: range-slider HTML-- update speed of Chanel/Computer
function updateChanelSpeed(speed) {
    victim.xSpeed = float(speed.value);
    victim.ySpeed = float(speed.value);
    // console.log(xCompSpeed + " Computer " + yCompSpeed);
}
//CHEAT: range-slider HTML-- update speed of enemy/Denise
function updateDeniseSpeed(speed) {
    enemy.xSpeed = float(speed.value);
    enemy.ySpeed = float(speed.value);
    console.log(xDeniseSpeed + " Denise " + yDeniseSpeed);
}