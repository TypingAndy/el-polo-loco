let isPaused = false;

function pauseGame() {
  saveMuteStatus();
  muteAllSounds();
  displayNone("soundOnButton");
  displayShow("mutedButton");
  displayNone("pauseButton");
  displayShow("playButton");

  if (!isPaused) {
    pauseAnimations();
    isPaused = true; // Spiel pausieren
  }
}

function resumeGame() {
  displayShow("pauseButton");
  displayNone("playButton");

  if (!wasMutedBeforePause) {
    resumeSounds();
    displayShow("soundOnButton");
    displayNone("mutedButton");
  }

  if (isPaused) {
    resumeAnimations();
    isPaused = false; // Spiel fortsetzen
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
