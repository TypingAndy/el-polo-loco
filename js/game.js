let canvas;
let world;
let keyboard = new Keyboard();
let isPaused = false; // Status des Spiels (gestartet oder pausiert)
let isMuted = false;

function init() {
  canvas = document.getElementById("canvas");
  initLevel1();
  world = new World(canvas, keyboard);

  context = canvas.getContext("2d");
}

function selectLevel(level) {
  console.log(`Level ${level} ausgewählt`);
  switch (level) {
    case 0:
    
      initLevel0();
      world.character.x = 0;
      world.level = level0;
      break;
    case 1:
    
      initLevel1();
      world.character.x = 0;
      world.level = level1;
      break;
    case 2:
     
      initLevel2();
      world.character.x = 0;
      world.level = level2;
      break;
  }
}

function startGame() {
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
    console.log("Spiel gestartet");
  }
}

function stopGame() {
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
    console.log("Spiel pausiert");
  }
}

function resetGame() {
  console.log("Das Spiel wird zurückgesetzt...");
  world.character.positionXBackToStart();
}

function muteSound() {
  isMuted = !isMuted; // Mute-Zustand umkehren

  if (isMuted) {
    soundManager.muteAllSounds(); // Alle Sounds muten
  } else {
    soundManager.unmuteAllSounds(); // Alle Sounds entmuten
  }}

// Tastenereignisse mit Pause-Check
document.addEventListener("keydown", (e) => {
  if (isPaused) return; // Im Pausenmodus keine Tasteneingaben akzeptieren

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
