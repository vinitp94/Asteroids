const MovingObject = require('./moving_object.js');
const Ship = require('./ship.js');
const Util = require('./utils.js');


function Asteroid(pos, game) {
  let options = { pos: pos, vel: Util.randomVec(3), radius: 40, color: "#00FF00", game: game};
  MovingObject.call(this, options);
}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function(other) {
  if (other instanceof Ship) other.relocate();
};

module.exports = Asteroid;
