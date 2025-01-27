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

  IMAGES_JUMPINGUP = ["img/2_character_pepe/3_jump/J-34.png"];

  IMAGES_FALLINGDOWN = ["img/2_character_pepe/3_jump/J-35.png", "img/2_character_pepe/3_jump/J-36.png", "img/2_character_pepe/3_jump/J-37.png"];

  IMAGES_LANDING = ["img/2_character_pepe/3_jump/J-38.png", "img/2_character_pepe/3_jump/J-39.png"];

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

  idleTime = 0;

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONGIDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPINGUP);
    this.loadImages(this.IMAGES_FALLINGDOWN);
    this.loadImages(this.IMAGES_LANDING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);

    this.intervals = {}; // Objekt zur Verwaltung aller Intervalle

    this.startIntervals(); // Startet alle Animationen und Bewegung

    setInterval(() => {
      this.correctYPosition();
    }, 10);
  }

  startIntervals() {
    this.stopIntervals(); // Sicherstellen, dass keine doppelten Intervalle laufen

    this.intervals.moveCharacter = setInterval(() => this.moveCharacter(), 50);
    this.intervals.walkingAnimation = setInterval(() => this.playWalkingAnimation(), 50);
    this.intervals.playJumpAnimation = setInterval(() => this.playJumpAnimation(), 110);
    this.intervals.playHurtAnimation = setInterval(() => {
      if (this.isHurt() && !this.isDead()) {
        this.playAnimation(this.IMAGES_HURT);
      }
    }, 30);
    this.intervals.playDieAnimation = setInterval(() => this.playDieAnimation(), 250);
    this.intervals.playIdleAnimation = setInterval(() => this.playIdleAnimationLogic(), 300);
    this.applyGravityForCharacter();
  }

  playIdleAnimationLogic() {
    if (this.checkIfCharIdle()) {
      this.idleTime++;
      this.playAnimation(this.IMAGES_IDLE);
    } else {
      this.idleTime = 0; // Reset Idle-Time, wenn nicht im Leerlauf
    }
    this.checkIfShouldPlayIdleAnimation();
  }

  stopIntervals() {
    // Alle laufenden Intervalle beenden
    for (let key in this.intervals) {
      clearInterval(this.intervals[key]);
    }
    this.intervals = {}; // Leert das Intervallobjekt
  }

  moveCharacter() {
    if (this.ableMoveRight()) {
      this.moveRight();
      this.otherDirection = false;
      this.playWalkingSoundIfOnGround();
    } else if (this.ableMoveLeft()) {
      this.moveLeft();
      this.otherDirection = true;
      this.playWalkingSoundIfOnGround();
    } else {
      this.stopWalkingSound(); // Schrittgeräusche stoppen, wenn keine Bewegung stattfindet
    }
    if (this.ableToJump()) {
      this.jump(25, 1);
    }
    this.setLevelStartingPoint();
  }

  playWalkingSoundIfOnGround() {
    if (!this.isAboveGround()) {
      if (!soundManager.isSoundPlaying("walking")) {
        this.playWalkingSound(); // Sound nur starten, wenn er nicht bereits läuft
      }
    } else {
      this.stopWalkingSound(); // Sicherstellen, dass der Sound gestoppt wird, wenn der Charakter in der Luft ist
    }
  }

  setLevelStartingPoint() {
    this.world.camera_x = -this.x + 100;
  }

  ableMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  ableMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  playWalkingAnimation() {
    if ((this.world.keyboard.RIGHT && !this.isAboveGround() && !this.isHurt() && !this.isDead()) || (this.world.keyboard.LEFT && !this.isAboveGround() && !this.isHurt() && !this.isDead())) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  playWalkingSound() {
    if (!soundManager.isSoundPlaying("walking")) {
      soundManager.playSound("walking", 1, true);
    }
  }

  stopWalkingSound() {
    if (soundManager.isSoundPlaying("walking")) {
      soundManager.stopSound("walking");
    }
  }

  ableToJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  playLongIdleAnimation() {
    this.playAnimation(this.IMAGES_LONGIDLE);
    soundManager.playSound("snoring", 0.5, true);
  }

  playDieAnimation() {
    if (this.isDead()) {
      if (this.currentAnimation !== "dead") {
        this.currentAnimation = "dead";
        this.currentImage = 0; // Start animation from the first image
      }

      if (this.currentImage < this.IMAGES_DEAD.length) {
        this.playAnimation(this.IMAGES_DEAD);
      }

      if (this.currentImage === this.IMAGES_DEAD.length - 1) {
        this.stopIntervals(); // Stop character animations
        pauseGame(); // Pause the game
        setTimeout(() => {
          displayShow('losingscreenContainer'); // Show LosingScreen
        }, 500); // Short delay to ensure animation completes smoothly
      }
    }
  }

  applyGravityForCharacter() {
    clearInterval(this.intervals.applyGravity); // Schwerkraft doppelt vermeiden
    this.intervals.applyGravity = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.speedY = 0;
      }
    }, 1000 / 25);
  }

  correctYPosition() {
    let groundY = 180;
    if (this.y > groundY) {
      this.y = groundY;
    }
  }

  positionXBackToStart() {
    let startPoint = 100;
    if (this.x > startPoint) {
      this.x = startPoint;
    }
  }

  playJumpAnimation() {
    if (this.isAboveGround() && !this.isHurt() && !this.isDead()) {
      if (this.speedY > 0) {
        // Jumping up
        if (this.currentAnimation !== "jumpUp") {
          this.currentImage = 0;
          this.currentAnimation = "jumpUp";
        }
        this.playAnimation(this.IMAGES_JUMPINGUP);

        // Hold at the last frame of jump up
        if (this.currentImage === this.IMAGES_JUMPINGUP.length - 1) {
          this.stopAnimation(); // Stop changing frames
        }
      } else {
        // Falling down
        if (this.currentAnimation !== "fallingDown") {
          this.currentImage = 0;
          this.currentAnimation = "fallingDown";
        }
        this.playAnimation(this.IMAGES_FALLINGDOWN);

        // Hold at the last frame of falling down
        if (this.currentImage === this.IMAGES_FALLINGDOWN.length - 1) {
          this.stopAnimation();
        }
      }
    }
  }

  isMovingHorizontally() {
    return this.speedX !== 0;
  }

  // Helper function to stop animation
  stopAnimation() {
    // Stops the current frame from advancing
    this.currentImage = Math.min(this.currentImage, this.IMAGES_JUMPINGUP.length - 1); // Adjust as needed for other states
  }

  shouldPlayJumpAnimation() {
    return (this.isAboveGround() && !this.isHurt() && !this.isDead()) || (this.speedY > 0 && !this.isHurt() && !this.isDead());
  }

  checkIfCharIdle() {
    return !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround() && !this.isDead();
  }

  checkIfShouldPlayIdleAnimation(idleTime) {
    if (this.checkIfCharLongIdle(idleTime)) {
      this.playLongIdleAnimation();
    } else {
      this.stopLongIdleAnimation();
    }
  }

  checkIfCharLongIdle() {
    return !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround() && !this.isDead() && this.idleTime > 20;
  }

  stopLongIdleAnimation() {
    soundManager.stopSound("snoring");
  }
}
