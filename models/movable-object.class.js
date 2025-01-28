class MovableObject extends DrawableObject {
  speed = 10;
  speedY = 0;
  acceleration = 2.5;
  otherDirection = false;
  fallingDown = false;
  hurtSoundPlaying = false;
  lastHit = 0;
  currentImage = 0;
  energy = 100;
  bottleAmount = 0;
  coinAmount = 0;

  /**
   * Plays the animation by cycling through the images array and setting the current image.
   * @param {Array<string>} images - An array of image paths for the animation frames.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the character to the right by the current speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the character to the left by the current speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the character jump by setting the vertical speed and plays the jump sound.
   * @param {number} height - The height of the jump.
   * @param {number} jumpVolume - The volume for the jump sound.
   */
  jump(height, jumpVolume) {
    this.speedY = height;
    soundManager.stopSound("jump");
    soundManager.playSound("jump", jumpVolume);
  }

  /**
   * Decreases the enemy's health by one. If the health reaches zero, plays the squeeze animation and removes the enemy.
   */
  enemieHealthMinusOne() {
    if (this.health > 0) {
      this.health -= 1;
      if (this.health === 0) {
        this.playSqeezwAnimation();
        this.spliceEnemyOnHit();
      }
    }
  }

  /**
   * Plays the squeeze animation when the enemy's health reaches zero.
   * Also plays the appropriate sound based on the type of the enemy.
   */
  playSqeezwAnimation() {
    this.isDead = true;
    this.speed = 0;
    this.loadImage(this.IMAGE_DEAD);

    let soundName = this instanceof Chicken ? "squeezeChicken" : "squeezeChick";
    soundManager.stopSound(soundName);
    soundManager.playSound(soundName);
  }

  /**
   * Removes the enemy from the level after a delay of 3 seconds.
   */
  spliceEnemyOnHit() {
    setTimeout(() => {
      let index = world.level.enemies.indexOf(this);
      if (index > -1) {
        world.level.enemies.splice(index, 1);
      }
    }, 3000);
  }

  /**
   * Handles the character taking damage by reducing energy, playing the hurt sound, and updating the last hit time.
   */
  hit() {
    if (this.canTakeDamage()) {
      this.reduceEnergy(19);
      this.playHurtSound();
      this.updateLastHitTime();
    }
  }

  /**
   * Checks if the character can take damage based on the time elapsed since the last hit.
   * @returns {boolean} True if the character can take damage, false otherwise.
   */
  canTakeDamage() {
    const timePassed = (new Date().getTime() - this.lastHit) / 1000;
    return timePassed > 1;
  }

  /**
   * Reduces the character's energy by the specified amount, ensuring energy does not go below zero.
   * @param {number} amount - The amount of energy to reduce.
   */
  reduceEnergy(amount) {
    this.energy = Math.max(this.energy - amount, 0);
  }

  /**
   * Plays a random hurt sound.
   */
  playHurtSound() {
    const hurtSound = this.getRandomHurtSound();
    soundManager.playSound(hurtSound, 0.5, false);
  }

  /**
   * Updates the time of the last hit to the current time.
   */
  updateLastHitTime() {
    this.lastHit = new Date().getTime();
  }

  /**
   * Checks if the character is currently hurt, based on the time passed since the last hit.
   * @returns {boolean} True if the character is hurt (less than 1 second since the last hit), false otherwise.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Returns a random hurt sound from a predefined list.
   * @returns {string} The name of a random hurt sound.
   */
  getRandomHurtSound() {
    const hurtSounds = ["hurt1", "hurt2", "hurt3", "hurt4", "hurt5"];
    const randomIndex = Math.floor(Math.random() * hurtSounds.length);
    return hurtSounds[randomIndex];
  }

  /**
   * Checks if the character is dead (energy is zero).
   * @returns {boolean} True if the character is dead (energy equals zero), false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Collects a coin, removes it from the level, plays a collection sound, and spawns an Endboss if all coins are collected.
   * @param {object} coin - The coin object to collect.
   */
  collectCoin(coin) {
    let index = this.world.level.coins.indexOf(coin);
    if (index !== -1) {
      this.world.level.coins.splice(index, 1);
      soundManager.stopSound("collectCoin");
      soundManager.playSound("collectCoin", 1);
      if (this.world.statusCoinbar.coinsCollected + 1 === this.world.statusCoinbar.levelCoinAmount) {
        this.world.level.enemies.push(new Endboss(this.world.character.x + 400, 8, this.world.level));
      }
    }
  }

  /**
   * Collects a bottle, removes it from the level, and plays a collection sound.
   * @param {object} bottle - The bottle object to collect.
   */
  collectBottle(bottle) {
    let index = this.world.level.bottles.indexOf(bottle);
    if (index !== -1) {
      this.world.level.bottles.splice(index, 1);
      soundManager.stopSound("collectBottle", 1);
      soundManager.playSound("collectBottle", 1);
    }
  }

  /**
   * Applies gravity to bottles, adjusting their vertical and horizontal position.
   * Updates the position at regular intervals.
   */
  applyGravityForBottles() {
    this.applyGravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.speedY = 0;
      }

      if (typeof this.speedX !== "undefined" && this.speedX !== 0) {
        this.x += this.speedX;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if the object is above ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  /**
   * Checks if the current object is colliding with another object.
   * @param {object} object - The object to check for collision with.
   * @returns {string|boolean} The direction of the collision (top, bottom, left, right) or false if no collision.
   */
  isColliding(object) {
    let isColliding =
      this.x + this.hitBoxX + this.hitBoxWidth > object.x + object.hitBoxX &&
      this.y + this.hitBoxY + this.hitBoxHeight > object.y + object.hitBoxY &&
      this.x + this.hitBoxX < object.x + object.hitBoxX + object.hitBoxWidth &&
      this.y + this.hitBoxY < object.y + object.hitBoxY + object.hitBoxHeight;

    if (!isColliding) return false;
    let overlaps = this.calculateOverlap(object);
    return this.getCollisionDirection(overlaps);
  }

  /**
   * Calculates the overlap between the current object and another object.
   * @param {object} object - The object to calculate the overlap with.
   * @returns {object} An object containing the overlap distances for each side (left, right, top, bottom).
   */
  calculateOverlap(object) {
    let overlapLeft = this.x + this.hitBoxX + this.hitBoxWidth - (object.x + object.hitBoxX);
    let overlapRight = object.x + object.hitBoxX + object.hitBoxWidth - (this.x + this.hitBoxX);
    let overlapTop = this.y + this.hitBoxY + this.hitBoxHeight - (object.y + object.hitBoxY);
    let overlapBottom = object.y + object.hitBoxY + object.hitBoxHeight - (this.y + this.hitBoxY);

    return { overlapLeft, overlapRight, overlapTop, overlapBottom };
  }

  /**
   * Determines the direction of the collision based on the overlap distances.
   * @param {object} overlaps - The overlap distances (left, right, top, bottom).
   * @returns {string} The direction of the collision (top, bottom, left, or right).
   */
  getCollisionDirection({ overlapLeft, overlapRight, overlapTop, overlapBottom }) {
    let smallestOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

    if (smallestOverlap === overlapTop && this.speedY < 0) {
      return "top";
    } else if (smallestOverlap === overlapBottom) {
      return "bottom";
    } else if (smallestOverlap === overlapLeft) {
      return "left";
    } else if (smallestOverlap === overlapRight) {
      return "right";
    }
  }
}
