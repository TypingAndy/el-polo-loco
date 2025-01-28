let wasMutedBeforePause = false; // Neue Variable zum Speichern des Mute-Status vor der Pause

function saveMuteStatus() {
  wasMutedBeforePause = soundManager.isMuted;
}

function checkMuteStatusBeforeStart() {
  const isMuted = soundManager.loadMuteSetting();
  if (isMuted) {
    muteAllSounds();
  } else {
    resumeSounds();
  }
}

function muteAllSounds() {
  soundManager.stopAllSounds();
  displayShow("mutedButton");
  displayNone("soundOnButton");
}

function resumeSounds() {
  soundManager.resumeAllSounds();
  displayShow("soundOnButton");
  displayNone("mutedButton");
}
