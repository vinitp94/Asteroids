const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');

function Game() {
  this.DIM_X = 1000;
  this.DIM_Y = 1000;
  this.NUM_ASTEROIDS = 8;
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship(this);
  this.allObjects = this.asteroids.concat(this.ship);
}

Game.prototype.addAsteroids = function() {
  for(let i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid(this.randomPosition(), this));
  }
};

Game.prototype.randomPosition = function() {
  return [Math.random() * this.DIM_X, Math.random() * this.DIM_Y];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.allObjects.forEach( object => object.draw(ctx) );
};

Game.prototype.moveObjects = function() {
  this.allObjects.forEach( object => object.move() );
};

Game.prototype.wrap = function(pos) {
  if(pos[0] > this.DIM_X) pos[0] -= this.DIM_X;
  if(pos[0] < 0) pos[0] += this.DIM_X;
  if(pos[1] > this.DIM_Y) pos[1] -= this.DIM_Y;
  if(pos[1] < 0) pos[1] += this.DIM_Y;
};

Game.prototype.checkCollisions = function() {
  for(let i = 0; i < this.allObjects.length - 1; i++) {
    for(let j = i + 1; j < this.allObjects.length; j++) {
      let obj1 = this.allObjects[i];
      let obj2 = this.allObjects[j];
      if(obj1.isCollidedWith(obj2)) obj1.collideWith(obj2);
    }
  }
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(asteroid) {
  let idx = this.asteroids.indexOf(asteroid);
  this.asteroids.splice(idx, 1);
};

module.exports = Game;
