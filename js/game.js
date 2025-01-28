let world;
let keyboard = new Keyboard();
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let selectedLevel;

/**
 * Starts the game by initializing level 1 and setting up the game world.
 */
function startGame() {
  initLevel1();
  selectedLevel = 1;
  world = new World(canvas, keyboard);
  world.statusCoinbar.levelCoinAmount = level1.coins.length;
  checkMuteStatusBeforeStart();
  startLevel1();
  displayShow("mobile-controls");
  isPaused = false;
}

/**
 * Restarts the current level and resumes the game.
 */
function restartLevel() {
  displayShow("ingameFullCanvasButtonContainer");
  displayShow("mobile-controls");
  resumeGame();
  switch (selectedLevel) {
    case 1:
      startLevel1();
      break;
    case 2:
      startLevel2();
      break;
  }
}

/**
 * Selects the next level, updates the UI, and resumes the game.
 */
function selectLevel() {
  selectedLevel++;
  displayShow("ingameFullCanvasButtonContainer");
  displayShow("mobile-controls");
  resumeGame();
  switch (selectedLevel) {
    case 1:
      startLevel1();
      break;
    case 2:
      startLevel2();
      break;
  }
}

/**
 * Initializes and starts level 1, resetting character stats and setting up the game world.
 */
function startLevel1() {
  resetCharacterStats();
  initLevel1();
  resumeAnimations();
  isPaused = false;
  selectedLevel = 1;
  world.level = level1;
  world.statusCoinbar.levelCoinAmount = level1.coins.length;
  world.collisionChecker = new CollisionChecker(world, world.level, world.character, world.statusCoinbar, world.statusBottlebar, world.throwableObjects);
}

/**
 * Initializes and starts level 2, resetting character stats and setting up the game world.
 */
function startLevel2() {
  resetCharacterStats();
  initLevel2();
  resumeAnimations();
  isPaused = false;
  selectedLevel = 2;
  world.level = level2;
  world.statusCoinbar.levelCoinAmount = level2.coins.length;
  world.collisionChecker = new CollisionChecker(world, world.level, world.character, world.statusCoinbar, world.statusBottlebar, world.throwableObjects);
}

/**
 * Resets the character's stats, including position, coins, energy, and status bars.
 */
function resetCharacterStats() {
  world.character.x = 0;
  world.character.coinAmount = 0;
  world.character.energy = 100;
  world.statusLifebar.setPercentageOfLifeBar(100);
  world.statusCoinbar.setCoinAmount(0);
}

/**
 * Toggles fullscreen mode for the canvas element.
 */
function toggleFullscreen() {
  const canvas = document.getElementById("canvas");
  if (!document.fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) {
      canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) {
      canvas.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

/**
 * Checks the screen orientation and toggles visibility of the orientation warning and game canvas.
 */
function checkOrientation() {
  const orientationWarning = document.getElementById("orientationWarning");
  const gameCanvas = document.getElementById("canvas");

  if (window.innerWidth < window.innerHeight) {
    orientationWarning.classList.remove("displayNone");
    gameCanvas.classList.add("displayNone");
  } else {
    orientationWarning.classList.add("displayNone");
    gameCanvas.classList.remove("displayNone");
  }
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);

document.addEventListener("DOMContentLoaded", () => {
  checkOrientation();
});
