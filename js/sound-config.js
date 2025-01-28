let wasMutedBeforePause = false; // Neue Variable zum Speichern des Mute-Status vor der Pause
let isMute = false;

/**
 * Saves the current mute status of the sound manager.
 */
function saveMuteStatus() {
  wasMutedBeforePause = soundManager.isMuted;
}

/**
 * Checks and applies the saved mute status before starting the game.
 */
function checkMuteStatusBeforeStart() {
  const isMuted = soundManager.loadMuteSetting();
  if (isMuted) {
    muteAllSounds();
    isMute = true;
  } else {
    resumeSounds();
    isMute = false;
  }
}

/**
 * Mutes all sounds, updates the mute status, and toggles the mute button visibility.
 */
function muteAllSounds() {
  isMute = true;
  soundManager.stopAllSounds();
  displayShow("mutedButton");
  displayNone("soundOnButton");
}

/**
 * Resumes all sounds, updates the mute status, and toggles the sound button visibility.
 */
function resumeSounds() {
  isMute = false;
  soundManager.resumeAllSounds();
  displayShow("soundOnButton");
  displayNone("mutedButton");
}
