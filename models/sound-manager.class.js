class SoundManager {
  constructor() {
    this.sounds = {
      gameMusic: new Audio("audio/game_music1.mp3"),
      ambient: new Audio("audio/ambi.mp3"),
      collectCoin: new Audio("audio/pickupCoin.wav"),
      collectBottle: new Audio("audio/pickupBottle.wav"),
      walking: new Audio("audio/run.wav"),
      jump: new Audio("audio/jump1.wav"),
      hurt1: new Audio("audio/doh1.wav"),
      hurt2: new Audio("audio/doh2.wav"),
      hurt3: new Audio("audio/doh3.wav"),
      hurt4: new Audio("audio/doh4.wav"),
      hurt5: new Audio("audio/doh5.wav"),
      snoring: new Audio("audio/snoring.wav"),
      shooting: new Audio("audio/shoot.wav"),
      bottleSmash: new Audio("audio/bottleSmash.wav"),
      noBottle: new Audio("audio/doh1.wav"),
      squeezeChick: new Audio("audio/smallSquish.wav"),
      squeezeChicken: new Audio("audio/bigSquish.wav"),
      endbossHurt: new Audio("audio/hit_chicken1.wav"),
    };
    this.activeSounds = {}; // Verfolgt den Status aktiver Sounds
    this.isMuted = this.loadMuteSetting(); // Globaler Stummschaltungsstatus
  }

  playSound(name, volume = 1, loop = false) {
    if (this.isMuted) return; // Keine Sounds abspielen, wenn stummgeschaltet

    if (this.sounds[name]) {
      if (this.activeSounds[name]) return; // Sound spielt bereits
      this.sounds[name].volume = volume;
      this.sounds[name].loop = loop;
      this.sounds[name].play();
      this.activeSounds[name] = true; // Markiere Sound als aktiv
    }
  }

  stopSound(name) {
    if (this.sounds[name] && this.activeSounds[name]) {
      this.sounds[name].pause(); // Pause statt `currentTime` zurückzusetzen
      this.activeSounds[name] = false; // Markiere Sound als gestoppt
    }
  }

  stopAllSounds() {
    this.isMuted = true; // Aktiviert den globalen Stummschaltungsmodus
    this.saveMuteSetting(); // Speichert die Einstellung
    Object.keys(this.sounds).forEach((name) => {
      if (this.sounds[name]) {
        this.sounds[name].pause(); // Nur pausieren, nicht zurücksetzen
        this.activeSounds[name] = false;
      }
    });
  }

  resumeAllSounds() {
    this.isMuted = false; // Deaktiviert den globalen Stummschaltungsmodus
    this.saveMuteSetting(); // Speichert die Einstellung

    // Nur Sounds, die zur Hintergrundmusik gehören, wieder aufnehmen
    const backgroundSounds = ["gameMusic", "ambient"];
    backgroundSounds.forEach((name) => {
      if (this.sounds[name] && !this.activeSounds[name]) {
        this.sounds[name].play(); // Spielt von der letzten `currentTime` weiter
        this.activeSounds[name] = true;
      }
    });
  }

  isSoundPlaying(name) {
    return !!this.activeSounds[name];
  }

  initializeGameMusic() {
    if (!this.isSoundPlaying("gameMusic")) {
      this.sounds["gameMusic"].volume = 0.4;
      this.sounds["gameMusic"].loop = true;
      this.sounds["gameMusic"].play(); // Spielt von der aktuellen Position weiter
      this.activeSounds["gameMusic"] = true;
    }

    if (!this.isSoundPlaying("ambient")) {
      this.sounds["ambient"].volume = 0.3;
      this.sounds["ambient"].loop = true;
      this.sounds["ambient"].play(); // Spielt von der aktuellen Position weiter
      this.activeSounds["ambient"] = true;
    }
  }

  // Methode zum Laden der Mute-Einstellung aus localStorage
  loadMuteSetting() {
    const muteSetting = localStorage.getItem("isMuted");
    return muteSetting === "true"; // Konvertiert den String-Wert zu einem Boolean
  }

  // Methode zum Speichern der Mute-Einstellung in localStorage
  saveMuteSetting() {
    localStorage.setItem("isMuted", this.isMuted);
  }
}

const soundManager = new SoundManager();
