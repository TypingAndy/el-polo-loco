document.getElementById("buttonLeft").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.LEFT = true;
});

document.getElementById("buttonLeft").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.LEFT = false;
});

document.getElementById("buttonRight").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.RIGHT = true;
});

document.getElementById("buttonRight").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.RIGHT = false;
});

document.getElementById("buttonJump").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.SPACE = true;
});

document.getElementById("buttonJump").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.SPACE = false;
});

document.getElementById("buttonShoot").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.THROW = true;
});

document.getElementById("buttonShoot").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.THROW = false;
});

// Tastenereignisse mit Pause-Check
document.addEventListener("keydown", (e) => {
  if (e.key === "p") {
    if (!isPaused) {
      pauseGame();
    } else {
      resumeGame();
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
    if (!isMute) {
      muteAllSounds();
    } else {
      resumeSounds();
    }
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
