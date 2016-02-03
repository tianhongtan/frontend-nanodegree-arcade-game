
var xBlockSize = 101;   //width of a block in game
var yBlockSize = 83;    //height of a block in game
var yOffset = -30;       //offset for y for units to appear centered on a block

/**
 * Generates random number between min and max
 * @param min {Number} minVal
 * @param max {Number} maxVal
 * @returns {Number} rand between min and max
 */
var getRandBetween = function(min, max) {
    return Math.random() * (max-min) + min;
};

var getRandIntBetween = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Enemies our player must avoid
var Enemy = function(y) {
    //make spawning occur in intervals.
    this.x = getRandBetween(0, 3) * xBlockSize * -1;
    var yVal = y || getRandIntBetween(1, 3);
    this.y = yVal * yBlockSize + yOffset;
    //enemy's speed
    this.speed = getRandBetween(1, 5);
    //which direction the enemy moves in
    this.direction = 1;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //keeps track of traveledDistance
    this.traveled = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var distance = xBlockSize*this.speed*dt;
    this.x = this.x+(this.direction)*distance;
    this.traveled += distance;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//An enemy that moves left.
var LeftEnemy = function(y) {
    Enemy.call(this);
    this.x = 4 * xBlockSize + getRandBetween(0, 3) * xBlockSize;
    this.direction = -1;
    this.sprite = 'images/enemy-bug-left.png';
};

LeftEnemy.prototype = Object.create(Enemy.prototype);
LeftEnemy.prototype.constructor = LeftEnemy;

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.reset();
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    //no-op
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.x = 2*xBlockSize;
    this.y = 5*yBlockSize + yOffset;
};

Player.prototype.handleInput = function(dir) {
    //handles direction input. Will not move if character attempts to move past boundaries.
    switch(dir) {
        case "left":
            this.x -= xBlockSize;
            if (this.x < 0) this.x += xBlockSize;
            break;
        case "right":
            this.x += xBlockSize;
            if (this.x >= 5 * xBlockSize) this.x -= xBlockSize;
            break;
        case "up":
            this.y -= yBlockSize;
            if (this.y < 0) this.victory();
            break;
        case "down":
            this.y += yBlockSize;
            if (this.y > 5 * yBlockSize + yOffset) this.y -= yBlockSize;
            break;
        default:
            break;
    }
};

Player.prototype.victory = function () {
    this.reset();
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyTypes = [Enemy, LeftEnemy];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
