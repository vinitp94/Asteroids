const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');

function Asteroid(pos) {
  let options = { pos: pos, vel: Util.randomVec(1), radius: 20, color: "#00FF00"};
  MovingObject.call(this, options);
}

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
