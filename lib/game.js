const Asteroid = require('./asteroid.js');

function Game() {
  this.DIM_X = 1000;
  this.DIM_Y = 1000;
  this.NUM_ASTEROIDS = 15;
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

module.exports = Game;
