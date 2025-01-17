let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  ctx = canvas.getContext("2d");
}

function selectLevel(level) {
  // resetGame();
  console.log(`Level ${level} ausgewählt`);
  switch (level) {
    case 0:
      world.level = level0;
      break;
    case 1:
      world.level = level1;
      break;
    case 2:
      world.level = level2;
      break;
    default:
      console.error("Ungültiges Level ausgewählt");
  }
}

function startGame() {
  // Alle laufenden Animationen und Intervalle stoppen, um Duplikate zu vermeiden
  world.character.stopIntervals();
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

  console.log("Spiel gestartet");
}


function stopGame() {
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
  console.log("Spiel pausiert");
}

function resetGame() {
  console.log("Das Spiel wird zurückgesetzt...");
  world.character.positionXBackToStart();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "a") {
    keyboard.LEFT = true;
    console.log("LEFT:", keyboard.LEFT);
  }
  if (e.key === "d") {
    keyboard.RIGHT = true;
    console.log("RIGHT:", keyboard.RIGHT);
  }
  if (e.key === "w") {
    keyboard.UP = true;
    console.log("UP:", keyboard.UP);
  }
  if (e.key === "s") {
    keyboard.DOWN = true;
    console.log("DOWN:", keyboard.DOWN);
  }
  if (e.key === " ") {
    keyboard.SPACE = true;
    console.log("SPACE:", keyboard.SPACE);
  }
  if (e.key === "f") {
    keyboard.THROW = true;
    console.log("THROW:", keyboard.THROW);
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
    console.log("THROW:", keyboard.THROW);
  }
});
