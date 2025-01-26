let world;
let keyboard = new Keyboard();
let isPaused = false;
let wasMutedBeforePause = false; // Neue Variable zum Speichern des Mute-Status vor der Pause
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let startScreen = new StartScreen(canvas, context);
let selectedLevel;

function init() {
  resetGameState(); // Alles zurücksetzen
  const startScreen = new StartScreen(canvas, context);
  startScreen.drawScreen();
}

function checkMuteStatusBeforeStart() {
  const isMuted = soundManager.loadMuteSetting();
  if (isMuted) {
    soundManager.stopAllSounds();
  } else {
    soundManager.resumeAllSounds();
  }
}

function resetGameState() {
  // Entferne das Canvas aus dem DOM oder leere es
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height); // Leere das Canvas

  // Entferne das Overlay des WinningScreens
  const winningOverlay = document.getElementById("winning-overlay");
  if (winningOverlay) {
    winningOverlay.remove();
  }

  // Entferne Buttons oder Event-Listener, falls vorhanden
  document.querySelectorAll("img").forEach((btn) => btn.remove());

  // Deinitialisiere die Welt
  if (window.world) {
    window.world.deleteCanvas();
    window.world = null;
  }
}


function startLevel() {
  initLevel1();
  selectedLevel = 1;
  world = new World(canvas, keyboard);
  world.statusCoinbar.levelCoinAmount = level1.coins.length;
  checkMuteStatusBeforeStart();
}

function selectLevel(level) {
  switch (level) {

    case 1:
      startLevel1()
      break;
    case 2:
      startLevel2()
      break;
  }
}

function startLevel1() {
  initLevel1();
  resetCharacterStats();
  selectedLevel = 1;
  world.level = level1;
  world.statusCoinbar.levelCoinAmount = level1.coins.length;
  world.collisionChecker = new CollisionChecker(world, world.level, world.character, world.statusCoinbar, world.statusBottlebar, world.throwableObjects);
}

function startLevel2() {
  initLevel2();
  resetCharacterStats();
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

function pauseGame() {
  saveMuteStatus();
  muteAllSounds();
  updateMuteButton();

  if (!isPaused) {
    pauseAnimations();
    isPaused = true; // Spiel pausieren
  }
}

function saveMuteStatus() {
  wasMutedBeforePause = soundManager.isMuted;
}

function muteAllSounds() {
  soundManager.stopAllSounds();
}

function updateMuteButton() {
  if (world?.muteButton) {
    world.muteButton.currentButton = world.muteButton.IMAGE_MUTEBUTTON;
    world.muteButton.loadImage(world.muteButton.currentButton);
  }
}

function pauseAnimations() {
  pauseEnemies();
  pauseThrowables();
  world.character.stopIntervals();
}

function pauseEnemies() {
  world.level.enemies.forEach((enemy) => enemy.stopAllAnimations?.());
}

function pauseThrowables() {
  world.throwableObjects.forEach((throwable) => throwable.stopAllAnimations?.());
}


function resumeGame() {
  if (!wasMutedBeforePause) {
    resumeSounds();
    updateSoundButton();
  }

  if (isPaused) {
    resumeAnimations();
    isPaused = false; // Spiel fortsetzen
  }
}

function resumeSounds() {
  soundManager.resumeAllSounds();
}

function updateSoundButton() {
  if (world?.muteButton) {
    world.muteButton.currentButton = world.muteButton.IMAGE_SOUNDBUTTON;
    world.muteButton.loadImage(world.muteButton.currentButton);
  }
}

function resumeAnimations() {
  world.character.startIntervals();
  resumeEnemies();
  resumeThrowables();
}

function resumeEnemies() {
  world.level.enemies.forEach((enemy) => {
    enemy.startIntervals?.();
    handleEndbossSpecifics(enemy);
  });
}

function handleEndbossSpecifics(enemy) {
  if (enemy instanceof Endboss && !enemy.isDefeated) {
    enemy.startWalkingAnimation();
    if (enemy.isHurt) enemy.playHurtAnimation();
  }
}

function resumeThrowables() {
  world.throwableObjects.forEach((throwable) => throwable.startAllAnimations?.());
}


document.getElementById('buttonLeft').addEventListener('touchstart', (e) => {
  e.preventDefault();
  keyboard.LEFT = true;
})

document.getElementById('buttonLeft').addEventListener('touchend', (e) => {
  e.preventDefault();
  keyboard.LEFT = false;
})

document.getElementById('buttonRight').addEventListener('touchstart', (e) => {
  e.preventDefault();
  keyboard.RIGHT = true;
})

document.getElementById('buttonRight').addEventListener('touchend', (e) => {
  e.preventDefault();
  keyboard.RIGHT = false;
})

document.getElementById('buttonJump').addEventListener('touchstart', (e) => {
  e.preventDefault();
  keyboard.SPACE = true;
})

document.getElementById('buttonJump').addEventListener('touchend', (e) => {
  e.preventDefault();
  keyboard.SPACE = false;
})

document.getElementById('buttonShoot').addEventListener('touchstart', (e) => {
  e.preventDefault();
  keyboard.THROW = true;
})

document.getElementById('buttonShoot').addEventListener('touchend', (e) => {
  e.preventDefault();
  keyboard.THROW = false;
})

// Tastenereignisse mit Pause-Check
document.addEventListener("keydown", (e) => {
  if (e.key === "p") {
    // "P"-Taste soll immer funktionieren
    if (world && world.pauseButton) {
      world.pauseButton.toggleImageAndState();
    }
    return; // Keine weiteren Tasten verarbeiten
  }

  // Andere Tasten ignorieren, wenn das Spiel pausiert ist
  if (isPaused) return;

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
  if (e.key === "m") {
    world.muteButton.toggleImage();
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


function checkOrientation() {
  const warning = document.getElementById('orientation-warning');
  if (window.innerWidth < window.innerHeight) {
    warning.style.display = 'flex';
  } else {
    warning.style.display = 'none';
  }
}



window.addEventListener('resize', checkOrientation);
document.addEventListener('DOMContentLoaded', () => {
  checkOrientation();
});