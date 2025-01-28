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

  /**
   * Plays a sound if it is not muted and not already playing.
   * @param {string} name - The name of the sound to play.
   * @param {number} [volume=1] - The volume level of the sound (default is 1).
   * @param {boolean} [loop=false] - Whether the sound should loop (default is false).
   */
  playSound(name, volume = 1, loop = false) {
    if (this.isMuted) return;

    if (this.sounds[name]) {
      if (this.activeSounds[name]) return;
      this.sounds[name].volume = volume;
      this.sounds[name].loop = loop;
      this.sounds[name].play();
      this.activeSounds[name] = true;
    }
  }

  /**
   * Stops the currently playing sound by pausing it and marking it as inactive.
   * @param {string} name - The name of the sound to stop.
   */
  stopSound(name) {
    if (this.sounds[name] && this.activeSounds[name]) {
      this.sounds[name].pause();
      this.activeSounds[name] = false;
    }
  }

  /**
   * Stops all currently playing sounds by pausing them and setting the global mute setting to true.
   * Saves the mute setting to persist it.
   */
  stopAllSounds() {
    this.isMuted = true;
    this.saveMuteSetting();
    Object.keys(this.sounds).forEach((name) => {
      if (this.sounds[name]) {
        this.sounds[name].pause();
        this.activeSounds[name] = false;
      }
    });
  }

  /**
   * Resumes all sounds that belong to background music by playing them from the last `currentTime`.
   * Deactivates the global mute setting and saves the mute setting.
   */
  resumeAllSounds() {
    this.isMuted = false;
    this.saveMuteSetting();

    const backgroundSounds = ["gameMusic", "ambient"];
    backgroundSounds.forEach((name) => {
      if (this.sounds[name] && !this.activeSounds[name]) {
        this.sounds[name].play();
        this.activeSounds[name] = true;
      }
    });
  }

  /**
   * Checks if a specific sound is currently playing.
   * @param {string} name - The name of the sound to check.
   * @returns {boolean} True if the sound is playing, false otherwise.
   */
  isSoundPlaying(name) {
    return !!this.activeSounds[name];
  }

  /**
   * Initializes the game music and ambient sounds if they are not already playing.
   * Sets the volume and loop properties, and plays the sounds from their current position.
   */
  initializeGameMusic() {
    if (!this.isSoundPlaying("gameMusic")) {
      this.sounds["gameMusic"].volume = 0.4;
      this.sounds["gameMusic"].loop = true;
      this.sounds["gameMusic"].play();
      this.activeSounds["gameMusic"] = true;
    }

    if (!this.isSoundPlaying("ambient")) {
      this.sounds["ambient"].volume = 0.3;
      this.sounds["ambient"].loop = true;
      this.sounds["ambient"].play();
      this.activeSounds["ambient"] = true;
    }
  }

  /**
   * Loads the mute setting from localStorage and returns it as a boolean.
   * @returns {boolean} The current mute setting (true if muted, false otherwise).
   */
  loadMuteSetting() {
    const muteSetting = localStorage.getItem("isMuted");
    return muteSetting === "true";
  }

  /**
   * Saves the current mute setting to localStorage.
   */
  saveMuteSetting() {
    localStorage.setItem("isMuted", this.isMuted);
  }
}

const soundManager = new SoundManager();
