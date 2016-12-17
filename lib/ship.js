const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');

function Ship(game) {
  let options = { pos: game.randomPosition(), vel: [0, 0], radius: 20, color: "red", game: game};
  MovingObject.call(this, options);
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

module.exports = Ship;
