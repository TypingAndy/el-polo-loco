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


function startLevel(level) {
  if (level === 1) {
    initLevel1();
    world = new World(canvas, keyboard);
  } else if (level === 2) {
    initLevel2();
  }
  // Füge hier weitere Level hinzu
}

function selectLevel(level) {
  switch (level) {
    case 0:
      initLevel0();
      world.character.x = 0;
      world.level = level0;
      world.collisionChecker = new CollisionChecker(world, world.level, world.character, world.statusCoinbar, world.statusBottlebar, world.throwableObjects);

      break;
    case 1:
      initLevel1();
      world.character.x = 0;
      world.level = level1;
      world.collisionChecker = new CollisionChecker(world, world.level, world.character, world.statusCoinbar, world.statusBottlebar, world.throwableObjects);
      break;
    case 2:
      initLevel2();
      world.character.x = 0;
      world.level = level2;
      world.collisionChecker = new CollisionChecker(world, world.level, world.character, world.statusCoinbar, world.statusBottlebar, world.throwableObjects);
      break;
  }
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
