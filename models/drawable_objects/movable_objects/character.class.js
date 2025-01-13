class Character extends MovableObject {
  height = 250;
  width = 100;
  hitBoxWidth = 72;
  hitBoxHeight = 145;
  hitBoxX = 12;
  hitBoxY = 95;
  color = "green";

  y = 180;

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONGIDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = ["img/2_character_pepe/4_hurt/H-41.png", "img/2_character_pepe/4_hurt/H-42.png", "img/2_character_pepe/4_hurt/H-43.png"];

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONGIDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animateCharacter();

    // Korrektur der Y-Position in einem separaten Intervall
    setInterval(() => {
      this.correctYPosition();
    }, 10); // 60 FPS für flüssige Korrekturen
  }

  animateCharacter() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;

        if (!soundManager.isSoundPlaying("walking")) {
          soundManager.playSound("walking", 1, true);
        }
      } else if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;

        if (!soundManager.isSoundPlaying("walking")) {
          soundManager.playSound("walking", 1, true);
        }
      } else {
        if (soundManager.isSoundPlaying("walking")) {
          soundManager.stopSound("walking");
        }
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump(25, 1);
      }

      this.world.camera_x = -this.x + 100;
    }, 50);

    //interval for Walking
    setInterval(() => {
      if ((this.world.keyboard.RIGHT && !this.isAboveGround() && !this.isHurt() && !this.isDead()) || (this.world.keyboard.LEFT && !this.isAboveGround() && !this.isHurt() && !this.isDead())) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 50);

    //interval for Hurt
    let isPlayingHurtSound = false; // Zustand für den Sound

    // Interval for Hurt
    setInterval(() => {
      if (this.isHurt() && !this.isDead()) {
        this.playAnimation(this.IMAGES_HURT);

        if (!isPlayingHurtSound) {
          // Erstelle ein Array mit den Hurt-Sounds
          let hurtSounds = [soundManager.sounds.hurt1, soundManager.sounds.hurt2, soundManager.sounds.hurt3, soundManager.sounds.hurt4, soundManager.sounds.hurt5];

          // Wähle einen zufälligen Sound aus
          let randomSound = hurtSounds[Math.floor(Math.random() * hurtSounds.length)];

          randomSound.volume = 0.3; // Setze die Lautstärke
          randomSound.play(); // Spiele den Sound ab

          isPlayingHurtSound = true; // Verhindere mehrfaches Abspielen
        }
      } else {
        isPlayingHurtSound = false; // Setze den Zustand zurück, wenn der Charakter nicht mehr verletzt ist
      }
    }, 30);

    //interval for Jumping
    setInterval(() => {
      // Überprüfen, ob der Charakter springt
      if ((this.isAboveGround() && !this.isHurt() && !this.isDead()) || (this.speedY > 0 && !this.isHurt() && !this.isDead())) {
        if (this.currentAnimation !== "jump") {
          // Zurücksetzen der Animation, wenn ein neuer Sprung beginnt
          this.currentImage = 0;
          this.currentAnimation = "jump"; // Aktuelle Animation setzen
        }
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        // Setze die aktuelle Animation zurück, wenn der Charakter nicht springt
        if (this.currentAnimation === "jump") {
          this.currentAnimation = null; // Keine spezielle Animation aktiv
        }
      }
    }, 110);

    //interval for Die
    let time = 0;
    setInterval(() => {
      if (this.isDead() && time < 7) {
        this.playAnimation(this.IMAGES_DEAD);
        time++;
      }
    }, 250);

    //interval for Idle
    setInterval(() => {
      if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround() && !this.isDead()) {
        this.playAnimation(this.IMAGES_IDLE);
        time++;
      }
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.isAboveGround()) {
        time = 0;
      }
    }, 300);

    //interval for LongIdle
    setInterval(() => {
      if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround() && !this.isDead() && time > 20) {
        this.playAnimation(this.IMAGES_LONGIDLE);
        soundManager.playSound("snoring", 0.5, true);
      } else {
        soundManager.stopSound("snoring");
      }
    }, 300);
  }

  correctYPosition() {
    let groundY = 180; // Mindesthöhe über dem Boden
    if (this.y > groundY) {
      this.y = groundY; // Setze die Y-Position auf die Mindesthöhe
    }
  }
}
