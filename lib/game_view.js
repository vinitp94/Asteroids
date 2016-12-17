const Game = require('./game.js');

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
