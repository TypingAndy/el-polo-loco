let world;
let keyboard = new Keyboard();
let isPaused = false;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let startScreen = new StartScreen(canvas, context);

function init() {
  showStartScreen();
}

function showStartScreen() {
  startScreen.draw("img/9_intro_outro_screens/start/startscreen_1.png");
}

function startLevel() {
  initLevel1();
  world = new World(canvas, keyboard);
  world.statusCoinbar.levelCoinAmount = level1.coins.length;
}

function selectLevel(level) {
  switch (level) {
    case 0:
      selectLevel0()
      break;
    case 1:
      initLevel1();
      resetCharacterStats()
      world.level = level1;
      world.statusCoinbar.levelCoinAmount = level1.coins.length;
      world.collisionChecker = new CollisionChecker(world, world.level, world.character, world.statusCoinbar, world.statusBottlebar, world.throwableObjects);
      break;
    case 2:
      initLevel2();
      resetCharacterStats()
      world.level = level2;
      world.statusCoinbar.levelCoinAmount = level2.coins.length;
      world.collisionChecker = new CollisionChecker(world, world.level, world.character, world.statusCoinbar, world.statusBottlebar, world.throwableObjects);
      break;
  }
}

function selectLevel0() {
  initLevel0();
  resetCharacterStats()
  world.level = level0;
  world.statusCoinbar.levelCoinAmount = level0.coins.length;
  world.collisionChecker = new CollisionChecker(world, world.level, world.character, world.statusCoinbar, world.statusBottlebar, world.throwableObjects);
}

function selectLevel1() {
  initLevel1();
  resetCharacterStats()
  world.level = level1;
  world.statusCoinbar.levelCoinAmount = level1.coins.length;
  world.collisionChecker = new CollisionChecker(world, world.level, world.character, world.statusCoinbar, world.statusBottlebar, world.throwableObjects);
}

function selectLevel2() {
  initLevel2();
  resetCharacterStats()
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

function resumeGame() {
  if (isPaused) {
    // Animationen und Bewegungen neu starten
    world.character.startIntervals();
    world.level.enemies.forEach((enemy) => {
      if (enemy.startIntervals) {
        enemy.startIntervals();
      }
    });
    world.throwableObjects.forEach((throwable) => {
      if (throwable.startAllAnimations) {
        throwable.startAllAnimations();
      }
    });

    isPaused = false; // Spiel fortsetzen
  }
}

function pauseGame() {
  if (!isPaused) {
    // Animationen und Bewegungen pausieren
    world.level.enemies.forEach((enemy) => {
      if (enemy.stopAllAnimations) {
        enemy.stopAllAnimations();
      }
    });

    world.throwableObjects.forEach((throwable) => {
      if (throwable.stopAllAnimations) {
        throwable.stopAllAnimations();
      }
    });

    world.character.stopIntervals();

    isPaused = true; // Spiel pausieren
  }
}

// Tastenereignisse mit Pause-Check
document.addEventListener("keydown", (e) => {
  if (isPaused) return; // Im Pausenmodus keine Tasteneingaben akzeptieren

  if (e.key === "a") {
    keyboard.LEFT = true;
  }
  if (e.key === "d") {
    keyboard.RIGHT = true;
  }
  if (e.key === "w") {
    keyboard.UP = true;
  }
  if (e.key === "s") {
    keyboard.DOWN = true;
  }
  if (e.key === " ") {
    keyboard.SPACE = true;
  }
  if (e.key === "f") {
    keyboard.THROW = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "a") {
    keyboard.LEFT = false;
  }
  if (e.key === "d") {
    keyboard.RIGHT = false;
  }
  if (e.key === "w") {
    keyboard.UP = false;
  }
  if (e.key === "s") {
    keyboard.DOWN = false;
  }
  if (e.key === " ") {
    keyboard.SPACE = false;
  }
  if (e.key === "f") {
    keyboard.THROW = false;
  }
});
