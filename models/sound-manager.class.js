class SoundManager {
  constructor() {
    this.sounds = {
      gameMusic: new Audio("audio/game_music1.wav"),
      ambient: new Audio("audio/ambi.wav"),
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
  }

  playSound(name, volume = 1, loop = false) {
    if (this.sounds[name]) {
      if (this.activeSounds[name]) return; // Sound spielt bereits
      this.sounds[name].currentTime = 0; // Zurücksetzen
      this.sounds[name].volume = volume;
      this.sounds[name].loop = loop;
      this.sounds[name].play();
      this.activeSounds[name] = true; // Markiere Sound als aktiv
    }
  }

  stopSound(name) {
    if (this.sounds[name] && this.activeSounds[name]) {
      this.sounds[name].pause();
      this.sounds[name].currentTime = 0;
      this.activeSounds[name] = false; // Markiere Sound als gestoppt
    }
  }

  isSoundPlaying(name) {
    return !!this.activeSounds[name];
  }

  initializeGameMusic() {
    let startMusic = () => {
      soundManager.playSound("gameMusic", 0.4, true); // Game-Musik mit Schleife
      soundManager.playSound("ambient", 0.3, true); // Ambient-Sound mit Schleife

      // Entferne den Event-Listener, nachdem die Musik gestartet wurde
      document.removeEventListener("click", startMusic);
      document.removeEventListener("keydown", startMusic);
    };

    // Füge Event-Listener hinzu, um auf Benutzerinteraktion zu warten
    document.addEventListener("click", startMusic);
    document.addEventListener("keydown", startMusic);
  }
}

const soundManager = new SoundManager();