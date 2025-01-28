class Endboss extends MovableObject {
  width = 350;
  height = 350;
  hitBoxWidth = 330;
  hitBoxHeight = 310;
  hitBoxX = 17;
  hitBoxY = 40;
  color = "black";
  y = 100;

  health;
  hurtInterval;

  IMAGES = {
    walking: ["img/4_enemie_boss_chicken/1_walk/G1.png", "img/4_enemie_boss_chicken/1_walk/G2.png", "img/4_enemie_boss_chicken/1_walk/G3.png", "img/4_enemie_boss_chicken/1_walk/G4.png"],
    alert: [
      "img/4_enemie_boss_chicken/2_alert/G5.png",
      "img/4_enemie_boss_chicken/2_alert/G6.png",
      "img/4_enemie_boss_chicken/2_alert/G7.png",
      "img/4_enemie_boss_chicken/2_alert/G8.png",
      "img/4_enemie_boss_chicken/2_alert/G9.png",
      "img/4_enemie_boss_chicken/2_alert/G10.png",
      "img/4_enemie_boss_chicken/2_alert/G11.png",
      "img/4_enemie_boss_chicken/2_alert/G12.png",
    ],
    canon: [
      "img/4_enemie_boss_chicken/3_attack/G13.png",
      "img/4_enemie_boss_chicken/3_attack/G14.png",
      "img/4_enemie_boss_chicken/3_attack/G15.png",
      "img/4_enemie_boss_chicken/3_attack/G16.png",
      "img/4_enemie_boss_chicken/3_attack/G17.png",
      "img/4_enemie_boss_chicken/3_attack/G18.png",
      "img/4_enemie_boss_chicken/3_attack/G19.png",
      "img/4_enemie_boss_chicken/3_attack/G20.png",
    ],
    hurt: ["img/4_enemie_boss_chicken/4_hurt/G21.png", "img/4_enemie_boss_chicken/4_hurt/G22.png", "img/4_enemie_boss_chicken/4_hurt/G23.png"],
    defeat: ["img/4_enemie_boss_chicken/5_dead/G24.png", "img/4_enemie_boss_chicken/5_dead/G25.png", "img/4_enemie_boss_chicken/5_dead/G26.png"],
  };

  constructor(x, health, level) {
    super().loadImage(this.IMAGES.walking[0]);
    Object.keys(this.IMAGES).forEach((type) => this.loadImages(this.IMAGES[type]));
    this.x = x;
    this.health = health;
    this.level = level;
    this.isDefeated = false;
    this.isHurt = false;
    this.isAlert = false;
    this.isPlayingCanon = false;
    this.startWalkingAnimation();
    this.startCanonAnimation();
    this.checkBossDefeat();
  }

  /**
   * Periodically checks if the boss is defeated and triggers the appropriate actions.
   * Pauses the game and displays the winning screen when the boss is defeated.
   */
  checkBossDefeat() {
    const intervalId = setInterval(() => {
      if (this.isDefeated) {
        setTimeout(() => {
          pauseGame();
        }, 1000);

        setTimeout(() => {
          displayShow("winningscreenContainer");
          displayNone("ingameFullCanvasButtonContainer");
          displayNone("mobile-controls");
        }, 2000);

        clearInterval(intervalId);
      }
    }, 200);
  }

  /**
   * Starts the walking animation for the boss character.
   * Handles direction, speed, and animation playback while avoiding actions when the boss is alert, hurt, or playing a canon animation.
   */
  startWalkingAnimation() {
    this.startChickenSpawn();
    this.direction = 1;
    this.startX = this.x;
    this.maxDistance = 300;
    this.changeDirectionChance = 0.05;
    this.speed = 5;

    this.walkingInterval = setInterval(() => {
      if (!this.isAlert && !this.isHurt && !this.isPlayingCanon) {
        this.playAnimation(this.IMAGES.walking);
        this.switchBossSpeed();
      }
    }, 150);
  }

  /**
   * Starts spawning chickens at regular intervals.
   * Stops spawning when the boss is defeated.
   */
  startChickenSpawn() {
    this.chickenSpawnInterval = setInterval(() => {
      if (this.isDefeated) {
        clearInterval(this.chickenSpawnInterval);
        return;
      }
      const chicken = new Chicken(this.x, 1);
      this.level.enemies.push(chicken);
    }, 3000);
  }

  /**
   * Switches the boss's speed and direction based on its position and random chance.
   * Ensures the boss stays within the maximum distance and occasionally changes direction randomly.
   */
  switchBossSpeed() {
    if (this.x >= this.startX + this.maxDistance || this.x <= this.startX) {
      this.direction *= -1;
      this.speed = this.getRandomSpeed();
    }
    if (Math.random() < this.changeDirectionChance) {
      this.direction *= -1;
      this.speed = this.getRandomSpeed();
    }
    this.x += this.direction * this.speed;
  }

  /**
   * Generates a random speed for the boss within a predefined range.
   * @returns {number} A random speed between 6 and 13 (inclusive).
   */
  getRandomSpeed() {
    return Math.floor(Math.random() * 8) + 6;
  }

  /**
   * Starts the cannon animation at regular intervals.
   * Checks if the cannon action should be initiated and triggers it accordingly.
   */
  startCanonAnimation() {
    this.canonInterval = setInterval(() => {
      if (this.shouldStartCanonAction()) {
        this.startCanonAction();
      }
    }, this.getCanonAnimationDelay());
  }

  /**
   * Determines if the cannon action should start based on the boss's health and defeat status.
   * @returns {boolean} True if the boss's health is 3 or less and it is not defeated, false otherwise.
   */
  shouldStartCanonAction() {
    return this.health <= 3 && !this.isDefeated;
  }

  /**
   * Initiates the cannon action by stopping the walking animation, shooting chickens, and playing the cannon animation.
   * Sets the state to indicate the cannon action is in progress.
   */
  startCanonAction() {
    this.isPlayingCanon = true;
    this.stopWalkingAnimation();
    this.shootChickCanon();
    this.playCanonAnimation();
  }

  /**
   * Calculates the delay for the cannon animation based on a base delay and the length of the cannon images array.
   * @returns {number} The calculated delay in milliseconds.
   */
  getCanonAnimationDelay() {
    return 5000 + this.IMAGES.canon.length * 200;
  }

  /**
   * Plays the cannon animation by cycling through the cannon image frames.
   * Stops the animation when all frames have been played and resumes other animations.
   */
  playCanonAnimation() {
    let canonFrame = 0;
    const canonAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES.canon);
      canonFrame++;

      if (canonFrame >= this.IMAGES.canon.length) {
        clearInterval(canonAnimationInterval);
        this.isPlayingCanon = false;
        this.resumeAnimations();
      }
    }, 200);
    this.stopCanonInterval(canonAnimationInterval);
  }

  /**
   * Shoots chickens from the cannon by spawning three ChickCanon objects in sequence.
   * Each chicken is spawned with a delay between them.
   */
  shootChickCanon() {
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const chickCanon = new ChickCanon(this.x, 1);
          this.level.enemies.push(chickCanon);
        }, i * 300);
      }
    }, 1200);
  }

  /**
   * Stops the cannon animation interval after the animation duration has completed.
   * @param {number} canonAnimationInterval - The interval ID for the cannon animation.
   */
  stopCanonInterval(canonAnimationInterval) {
    setTimeout(() => {
      clearInterval(canonAnimationInterval);
    }, this.IMAGES.canon.length * 200);
  }

  /**
   * Plays the hurt animation if the character is not already hurt, defeated, alert, or performing a cannon action.
   * Temporarily sets the hurt state and manages sound and animation intervals.
   */
  playHurtAnimation() {
    if (!this.isHurt && !this.isDefeated && !this.isAlert && !this.isPlayingCanon) {
      this.isHurt = true;
      this.hurtInterval = setInterval(() => {
        this.playAnimation(this.IMAGES.hurt);
        soundManager.stopSound("endbossHurt");
        soundManager.playSound("endbossHurt");
      }, 200);
      setTimeout(() => {
        this.stopHurtAnimation();
        this.isHurt = false;
      }, 600);
    }
  }

  /**
   * Plays the alert animation if the character is not already in an alert state, defeated, or critically low on health.
   * Temporarily sets the alert state, adjusts health, and manages animation intervals.
   */
  playAlertAnimation() {
    if (this.health <= 2 || this.isDefeated || this.isAlert) return;

    this.isAlert = true;
    this.alertInterval = setInterval(() => {
      this.health = 3;
      this.playAnimation(this.IMAGES.alert);
    }, 200);

    setTimeout(() => {
      this.stopAlertAnimation();
      this.isAlert = false;
    }, 4000);
  }

  /**
   * Stops the alert animation by clearing the alert interval.
   * Resets the interval reference to null.
   */
  stopAlertAnimation() {
    if (this.alertInterval) {
      clearInterval(this.alertInterval);
      this.alertInterval = null;
    }
  }

  /**
   * Starts the defeat animation, marking the character as defeated and stopping the walking animation.
   * Cycles through the defeat animation frames and stops the animation once all frames are played.
   */
  startDefeatAnimation() {
    this.isDefeated = true;
    this.stopWalkingAnimation();

    let defeatedFrame = 0;
    this.defeatedInterval = setInterval(() => {
      this.playDefeatFrames(defeatedFrame++);
      if (defeatedFrame >= this.IMAGES.defeat.length) {
        this.stopDefeatAnimation();
      }
    }, 250);
  }

  /**
   * Initiates the defeat animation if the character is not already marked as defeated.
   */
  animateDefeat() {
    if (!this.isDefeated) {
      this.startDefeatAnimation();
    }
  }

  /**
   * Plays the defeat animation frames.
   * @param {number} defeatedFrame - The current frame index of the defeat animation.
   */
  playDefeatFrames(defeatedFrame) {
    this.playAnimation(this.IMAGES.defeat);
  }

  /**
   * Finalizes the defeat animation by setting the character's image to the last frame of the defeat animation.
   */
  finalizeDefeatAnimation() {
    this.img = this.imageCache[this.IMAGES.defeat[this.IMAGES.defeat.length - 1]];
  }

  /**
   * Stops all running animations and intervals associated with the character.
   * Includes walking, defeat, hurt, alert, cannon, and chicken spawn intervals.
   */
  stopAllAnimations() {
    this.stopWalkingAnimation();
    this.stopDefeatAnimation();
    this.stopHurtAnimation();
    this.stopAlertAnimation();
    this.stopCanonInterval();

    if (this.chickenSpawnInterval) {
      clearInterval(this.chickenSpawnInterval);
    }
  }

  /**
   * Stops the walking animation by clearing the walking interval.
   */
  stopWalkingAnimation() {
    clearInterval(this.walkingInterval);
  }

  /**
   * Stops the defeat animation by clearing the defeat interval.
   * Finalizes the animation by setting the character's image to the last frame.
   */
  stopDefeatAnimation() {
    clearInterval(this.defeatedInterval);
    this.finalizeDefeatAnimation();
  }

  /**
   * Stops the hurt animation by clearing the hurt interval.
   * Resets the hurt state to false.
   */
  stopHurtAnimation() {
    clearInterval(this.hurtInterval);
    this.isHurt = false;
  }

  /**
   * Resumes animations for the character unless it is defeated.
   * Restarts the walking animation and plays the hurt animation if the character is in a hurt state.
   */
  resumeAnimations() {
    if (this.isDefeated) return;
    this.startWalkingAnimation();
    if (this.isHurt) this.playHurtAnimation();
  }
}
