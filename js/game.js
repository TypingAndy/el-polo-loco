let world;
let keyboard = new Keyboard();
let isPaused = false;
let wasMutedBeforePause = false; // Neue Variable zum Speichern des Mute-Status vor der Pause
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let startScreen = new StartScreen(canvas, context);

function init() {
  showStartScreen();
}

function checkMuteStatusBeforeStart() {
  const isMuted = soundManager.loadMuteSetting();
  if (isMuted) {
    soundManager.stopAllSounds();
  } else {
    soundManager.resumeAllSounds();
  }
}

function showStartScreen() {
  startScreen.draw("img/9_intro_outro_screens/start/startscreen_1.png");
}

function startLevel() {
  initLevel1();
  world = new World(canvas, keyboard);
  world.statusCoinbar.levelCoinAmount = level1.coins.length;
  checkMuteStatusBeforeStart();
}

function selectLevel(level) {
  switch (level) {
    case 1:
      initLevel1();
      resetCharacterStats();
      world.level = level1;
      world.statusCoinbar.levelCoinAmount = level1.coins.length;
      world.collisionChecker = new CollisionChecker(world, world.level, world.character, world.statusCoinbar, world.statusBottlebar, world.throwableObjects);
      break;
    case 2:
      initLevel2();
      resetCharacterStats();
      world.level = level2;
      world.statusCoinbar.levelCoinAmount = level2.coins.length;
      world.collisionChecker = new CollisionChecker(world, world.level, world.character, world.statusCoinbar, world.statusBottlebar, world.throwableObjects);
      break;
  }
}

function selectLevel1() {
  initLevel1();
  resetCharacterStats();
  world.level = level1;
  world.statusCoinbar.levelCoinAmount = level1.coins.length;
  world.collisionChecker = new CollisionChecker(world, world.level, world.character, world.statusCoinbar, world.statusBottlebar, world.throwableObjects);
}

function selectLevel2() {
  initLevel2();
  resetCharacterStats();
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
  wasMutedBeforePause = soundManager.isMuted; // Speichere, ob der Ton vor der Pause gemutet war
  soundManager.stopAllSounds();

  if (world && world.muteButton) {
    world.muteButton.currentButton = world.muteButton.IMAGE_MUTEBUTTON; // Setze das Bild auf "Ton aus"
    world.muteButton.loadImage(world.muteButton.currentButton);
  }

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

function resumeGame() {
  if (!wasMutedBeforePause) {
    soundManager.resumeAllSounds(); // Nur wieder aktivieren, wenn vor der Pause nicht gemutet war
    if (world && world.muteButton) {
      world.muteButton.currentButton = world.muteButton.IMAGE_SOUNDBUTTON; // Setze das Bild auf "Sound aktiv"
      world.muteButton.loadImage(world.muteButton.currentButton);
    }
  }

  if (isPaused) {
    // Animationen und Bewegungen neu starten
    world.character.startIntervals();
    world.level.enemies.forEach((enemy) => {
      if (enemy.startIntervals) {
        enemy.startIntervals();
      }
      // Endboss spezifisch behandeln
      if (enemy instanceof Endboss && !enemy.isDefeated) {
        enemy.startWalkingAnimation();
        if (enemy.isHurt) {
          enemy.playHurtAnimation();
        }
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
