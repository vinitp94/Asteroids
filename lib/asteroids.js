const GameView = require('./game_view.js');

document.addEventListener("DOMContentLoaded", function() {
  let canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const view = new GameView(ctx);
  view.start();
});
