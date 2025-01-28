class Character extends MovableObject {
  height = 250;
  width = 100;
  hitBoxWidth = 72;
  hitBoxHeight = 145;
  hitBoxX = 12;
  hitBoxY = 95;
  color = "green";
  y = 180;

  idleTime = 0;

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(IMAGES_IDLE);
    this.loadImages(IMAGES_LONGIDLE);
    this.loadImages(IMAGES_WALKING);
    this.loadImages(IMAGES_JUMPINGUP);
    this.loadImages(IMAGES_FALLINGDOWN);
    this.loadImages(IMAGES_LANDING);
    this.loadImages(IMAGES_DEAD);
    this.loadImages(IMAGES_HURT);

    this.intervals = {};

    this.startIntervals();

    setInterval(() => {
      this.correctYPosition();
    }, 10);
  }

  /**
   * Starts all necessary intervals for character actions and animations.
   * Ensures any previously running intervals are stopped before starting new ones.
   */
  startIntervals() {
    this.stopIntervals();

    this.intervals.moveCharacter = setInterval(() => this.moveCharacter(), 50);
    this.intervals.walkingAnimation = setInterval(() => this.playWalkingAnimation(), 50);
    this.intervals.playJumpAnimation = setInterval(() => this.playJumpAnimation(), 110);
    this.intervals.playHurtAnimation = setInterval(() => {
      if (this.isHurt() && !this.isDead()) {
        this.playAnimation(IMAGES_HURT);
      }
    }, 30);
    this.intervals.playDieAnimation = setInterval(() => this.playDieAnimation(), 250);
    this.intervals.playIdleAnimation = setInterval(() => this.playIdleAnimationLogic(), 300);
    this.applyGravityForCharacter();
  }

  /**
   * Handles the logic for playing the idle animation.
   * Increases idle time and plays the idle animation if the character is idle.
   */
  playIdleAnimationLogic() {
    if (this.checkIfCharIdle()) {
      this.idleTime++;
      this.playAnimation(IMAGES_IDLE);
    } else {
      this.idleTime = 0;
    }
    this.checkIfShouldPlayIdleAnimation();
  }

  /**
   * Stops all running intervals and clears the intervals object.
   */
  stopIntervals() {
    for (let key in this.intervals) {
      clearInterval(this.intervals[key]);
    }
    this.intervals = {};
  }

  /**
   * Handles character movement, including walking, jumping, and playing sounds.
   * Determines direction and checks if movement or jumping is possible.
   */
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
      this.stopWalkingSound();
    }
    if (this.ableToJump()) {
      this.jump(25, 1);
    }
    this.setLevelStartingPoint();
  }

  /**
   * Plays the walking sound if the character is on the ground.
   * Stops the sound if the character is above the ground.
   */
  playWalkingSoundIfOnGround() {
    if (!this.isAboveGround()) {
      if (!soundManager.isSoundPlaying("walking")) {
        this.playWalkingSound();
      }
    } else {
      this.stopWalkingSound();
    }
  }

  /**
   * Sets the camera position relative to the character's position.
   */
  setLevelStartingPoint() {
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Checks if the character is able to move right.
   * @returns {boolean} True if the character can move right, false otherwise.
   */
  ableMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  /**
   * Checks if the character is able to move left.
   * @returns {boolean} True if the character can move left, false otherwise.
   */
  ableMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  /**
   * Plays the walking animation if the character is walking on the ground and not hurt or dead.
   */
  playWalkingAnimation() {
    if ((this.world.keyboard.RIGHT && !this.isAboveGround() && !this.isHurt() && !this.isDead()) || (this.world.keyboard.LEFT && !this.isAboveGround() && !this.isHurt() && !this.isDead())) {
      this.playAnimation(IMAGES_WALKING);
    }
  }

  /**
   * Plays the walking sound if it is not already playing.
   */
  playWalkingSound() {
    if (!soundManager.isSoundPlaying("walking")) {
      soundManager.playSound("walking", 1, true);
    }
  }

  /**
   * Stops the walking sound if it is currently playing.
   */
  stopWalkingSound() {
    if (soundManager.isSoundPlaying("walking")) {
      soundManager.stopSound("walking");
    }
  }

  /**
   * Checks if the character is able to jump.
   * @returns {boolean} True if the SPACE key is pressed and the character is on the ground, false otherwise.
   */
  ableToJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  /**
   * Plays the long idle animation and starts the snoring sound.
   */
  playLongIdleAnimation() {
    this.playAnimation(IMAGES_LONGIDLE);
    soundManager.playSound("snoring", 0.5, true);
  }

  /**
   * Plays the death animation if the character is dead.
   * Stops intervals and displays the losing screen once the animation is complete.
   */
  playDieAnimation() {
    if (this.isDead()) {
      if (this.currentAnimation !== "dead") {
        this.currentAnimation = "dead";
        this.currentImage = 0;
      }

      if (this.currentImage < IMAGES_DEAD.length) {
        this.playAnimation(IMAGES_DEAD);
      }

      if (this.currentImage === IMAGES_DEAD.length - 1) {
        this.stopIntervals();
        pauseGame();
        setTimeout(() => {
          displayShow("losingscreenContainer");
          displayNone("ingameFullCanvasButtonContainer");
          displayNone("mobile-controls");
        }, 500);
      }
    }
  }

  /**
   * Applies gravity to the character, updating its position and speed over time.
   * Ensures the interval is cleared before starting a new one.
   */
  applyGravityForCharacter() {
    clearInterval(this.intervals.applyGravity);
    this.intervals.applyGravity = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.speedY = 0;
      }
    }, 1000 / 25);
  }

  /**
   * Corrects the character's Y position to ensure it does not fall below the ground level.
   */
  correctYPosition() {
    let groundY = 180;
    if (this.y > groundY) {
      this.y = groundY;
    }
  }

  /**
   * Resets the character's X position to the starting point if it exceeds the start position.
   */
  positionXBackToStart() {
    let startPoint = 100;
    if (this.x > startPoint) {
      this.x = startPoint;
    }
  }

  /**
   * Plays the jump animation based on the character's vertical movement.
   * Differentiates between jumping up and falling down animations.
   */
  playJumpAnimation() {
    if (this.isAboveGround() && !this.isHurt() && !this.isDead()) {
      if (this.speedY > 0) {
        if (this.currentAnimation !== "jumpUp") {
          this.currentImage = 0;
          this.currentAnimation = "jumpUp";
        }
        this.playAnimation(IMAGES_JUMPINGUP);

        if (this.currentImage === IMAGES_JUMPINGUP.length - 1) {
          this.stopAnimation();
        }
      } else {
        if (this.currentAnimation !== "fallingDown") {
          this.currentImage = 0;
          this.currentAnimation = "fallingDown";
        }
        this.playAnimation(IMAGES_FALLINGDOWN);

        if (this.currentImage === IMAGES_FALLINGDOWN.length - 1) {
          this.stopAnimation();
        }
      }
    }
  }

  /**
   * Checks if the character is moving horizontally.
   * @returns {boolean} True if the character's horizontal speed is not zero, false otherwise.
   */
  isMovingHorizontally() {
    return this.speedX !== 0;
  }

  /**
   * Stops the animation by capping the current image index to the maximum allowed value.
   */
  stopAnimation() {
    this.currentImage = Math.min(this.currentImage, IMAGES_JUMPINGUP.length - 1);
  }

  /**
   * Determines if the jump animation should be played.
   * @returns {boolean} True if the character is above ground or moving upward and not hurt or dead, false otherwise.
   */
  shouldPlayJumpAnimation() {
    return (this.isAboveGround() && !this.isHurt() && !this.isDead()) || (this.speedY > 0 && !this.isHurt() && !this.isDead());
  }

  /**
   * Checks if the character is idle (not moving, on the ground, and not dead).
   * @returns {boolean} True if the character is idle, false otherwise.
   */
  checkIfCharIdle() {
    return !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround() && !this.isDead();
  }

  /**
   * Checks if the long idle animation should be played based on idle time.
   * Plays the long idle animation if the character is idle for a long time; otherwise, stops it.
   * @param {number} idleTime - The current idle time of the character.
   */
  checkIfShouldPlayIdleAnimation(idleTime) {
    if (this.checkIfCharLongIdle(idleTime)) {
      this.playLongIdleAnimation();
    } else {
      this.stopLongIdleAnimation();
    }
  }

  /**
   * Checks if the character has been idle for a long duration.
   * @returns {boolean} True if the character is idle for more than 20 cycles and is not moving, above ground, or dead.
   */
  checkIfCharLongIdle() {
    return !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround() && !this.isDead() && this.idleTime > 20;
  }

  /**
   * Stops the long idle animation by stopping the snoring sound.
   */
  stopLongIdleAnimation() {
    soundManager.stopSound("snoring");
  }
}
