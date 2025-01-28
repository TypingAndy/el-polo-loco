let world;
let keyboard = new Keyboard();

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let selectedLevel;

function startGame() {
  initLevel1();
  selectedLevel = 1;
  world = new World(canvas, keyboard);
  world.statusCoinbar.levelCoinAmount = level1.coins.length;
  checkMuteStatusBeforeStart();
  resumeAnimations();
  isPaused = false;
}

function restartLevel() {
  displayShow("ingameFullCanvasButtonContainer");
  switch (selectedLevel) {
    case 1:
      startLevel1();
      break;
    case 2:
      startLevel2();
      break;
  }
}

function selectLevel() {
  selectedLevel++;
  displayShow("ingameFullCanvasButtonContainer");
  switch (selectedLevel) {
    case 1:
      startLevel1();
      break;
    case 2:
      startLevel2();
      break;
  }
}

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

function resetCharacterStats() {
  world.character.x = 0;
  world.character.coinAmount = 0;
  world.character.energy = 100;
  world.statusLifebar.setPercentageOfLifeBar(100);
  world.statusCoinbar.setCoinAmount(0);
}

function toggleFullscreen() {
  const canvas = document.getElementById("canvas");
  if (!document.fullscreenElement) {
    // Aktiviere den Fullscreen-Modus
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) {
      canvas.mozRequestFullScreen(); // Firefox
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen(); // Chrome, Safari, Opera
    } else if (canvas.msRequestFullscreen) {
      canvas.msRequestFullscreen(); // IE/Edge
    }
  } else {
    // Beende den Fullscreen-Modus
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
