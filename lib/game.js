const Asteroid = require('./asteroid.js');

function Game() {
  this.DIM_X = 1000;
  this.DIM_Y = 1000;
  this.NUM_ASTEROIDS = 8;
  this.asteroids = [];
  this.addAsteroids();
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
  this.asteroids.forEach( asteroid => asteroid.draw(ctx) );
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach( asteroid => asteroid.move() );
};

Game.prototype.wrap = function(pos) {
  if(pos[0] > this.DIM_X) pos[0] -= this.DIM_X;
  if(pos[0] < 0) pos[0] += this.DIM_X;
  if(pos[1] > this.DIM_Y) pos[1] -= this.DIM_Y;
  if(pos[1] < 0) pos[1] += this.DIM_Y;
};

Game.prototype.checkCollisions = function() {
  for(let i = 0; i < this.asteroids.length - 1; i++) {
    for(let j = i + 1; j < this.asteroids.length; j++) {
      let ast1 = this.asteroids[i];
      let ast2 = this.asteroids[j];
      if(ast1.isCollidedWith(ast2)) ast1.collideWith(ast2);
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
