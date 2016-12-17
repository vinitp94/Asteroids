const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');

function Asteroid(pos, game) {
  let options = { pos: pos, vel: Util.randomVec(1), radius: 40, color: "#00FF00", game: game};
  MovingObject.call(this, options);
}

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
