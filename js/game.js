let canvas;

let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  ctx = canvas.getContext("2d");

  console.log("My Character is", world.character);
  console.log("My Enemie is", world.enemies);
}


document.addEventListener('keydown', (e) => {
  if (e.key === 'a') {
    keyboard.LEFT = true;
    console.log('LEFT:', keyboard.LEFT);
  }
  if (e.key === 'd') {
    keyboard.RIGHT = true;
    console.log('RIGHT:', keyboard.RIGHT);
  }
  if (e.key === 'w') {
    keyboard.UP = true;
    console.log('UP:', keyboard.UP);
  }
  if (e.key === 's') {
    keyboard.DOWN = true;
    console.log('DOWN:', keyboard.DOWN);
  }
  if (e.key === ' ') {
    keyboard.SPACE = true;
    console.log('SPACE:', keyboard.SPACE);
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'a') {
    keyboard.LEFT = false;
    console.log('LEFT:', keyboard.LEFT);
  }
  if (e.key === 'd') {
    keyboard.RIGHT = false;
    console.log('RIGHT:', keyboard.RIGHT);
  }
  if (e.key === 'w') {
    keyboard.UP = false;
    console.log('UP:', keyboard.UP);
  }
  if (e.key === 's') {
    keyboard.DOWN = false;
    console.log('DOWN:', keyboard.DOWN);
  }
  if (e.key === ' ') {
    keyboard.SPACE = false;
    console.log('SPACE:', keyboard.SPACE);
  }
});