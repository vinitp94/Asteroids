/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(5);
	
	document.addEventListener("DOMContentLoaded", function() {
	  let canvas = document.getElementById("game-canvas");
	  const ctx = canvas.getContext("2d");
	  const view = new GameView(ctx);
	  view.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	function MovingObject (options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
	  this.game = options.game;
	}
	
	MovingObject.prototype.draw = function(ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();
	
	  ctx.arc(
	    this.pos[0],
	    this.pos[1],
	    this.radius,
	    0,
	    2 * Math.PI,
	    false
	  );
	
	  ctx.fill();
	};
	
	MovingObject.prototype.move = function() {
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	  this.game.wrap(this.pos);
	};
	
	MovingObject.prototype.isCollidedWith = function(other) {
	  let dist = Math.sqrt(Math.pow(this.pos[0] - other.pos[0], 2) + Math.pow(this.pos[1] - other.pos[1], 2));
	  if (dist < (this.radius + other.radius)) return true;
	  return false;
	};
	
	MovingObject.prototype.collideWith = function(other) {
	};
	
	module.exports = MovingObject;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);
	const Ship = __webpack_require__(6);
	
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(1);
	const Ship = __webpack_require__(6);
	const Util = __webpack_require__(4);
	
	
	function Asteroid(pos, game) {
	  let options = { pos: pos, vel: Util.randomVec(3), radius: 40, color: "#00FF00", game: game};
	  MovingObject.call(this, options);
	}
	
	Util.inherits(Asteroid, MovingObject);
	
	Asteroid.prototype.collideWith = function(other) {
	  if (other instanceof Ship) other.relocate();
	};
	
	module.exports = Asteroid;


/***/ },
/* 4 */
/***/ function(module, exports) {

	const Util = {
	  inherits (child, parent) {
	    function Surrogate() {}
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate();
	    child.prototype.constructor = child;
	  },
	
	  randomVec (length) {
	    const deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	  
	  // Scale the length of a vector by the given amount.
	  scale (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  }
	};
	
	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);
	
	function GameView (ctx) {
	  this.ctx = ctx;
	  this.game = new Game;
	}
	
	GameView.prototype.start = function () {
	  window.setInterval( () => {
	    this.game.step();
	    this.game.draw(this.ctx);
	  }, 20);
	};
	
	module.exports = GameView;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(1);
	const Util = __webpack_require__(4);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map