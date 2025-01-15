let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  ctx = canvas.getContext("2d");
}

function selectLevel(level) {
  resetGame();
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


function resetGame() {
  console.log("Das Spiel wird zurückgesetzt...");
  // Hier sollte die Logik zum Neustart des Spiels implementiert werden
  // z. B. Spiel-Loop anhalten, Objekte neu initialisieren, etc.
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
