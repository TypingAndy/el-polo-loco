class ThrowableObject extends MovableObject {
  hitBoxWidth = 20;
  hitBoxHeight = 38;
  hitBoxX = 14;
  hitBoxY = 0;
  color = "blue";

  IMAGES_THROWING = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_THROWING);

    if (world.level.collectedBottles.length > 0) {
      world.level.collectedBottles.splice(0, 1);
      this.x = x;
      this.y = y;
      this.height = 50;
      this.width = 40;
      this.throw(x, y);
      this.startAnimation();
    } else {
      soundManager.stopSound("noBottle");
      soundManager.playSound("noBottle", 0.3);
    }
  }

  /**
   * Starts the throwing animation by periodically cycling through the throwing images.
   */
  startAnimation() {
    this.throwingAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_THROWING);
    }, 90);
  }

  /**
   * Stops the throwing animation by clearing the throwing animation interval.
   */
  stopAnimation() {
    clearInterval(this.throwingAnimationInterval);
  }

  /**
   * Starts the splash animation by periodically cycling through the splash images.
   */
  startSplashAnimation() {
    this.splashAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
    }, 100);
  }

  /**
   * Stops the splash animation by clearing the splash animation interval.
   */
  stopSplashAnimation() {
    clearInterval(this.splashAnimationInterval);
  }

  /**
   * Throws the object to the specified position and applies gravity.
   * Sets initial vertical and horizontal speed, then plays a shooting sound.
   * @param {number} x - The target x-coordinate for the throw.
   * @param {number} y - The target y-coordinate for the throw.
   */
  throw(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 25;
    this.speedX = 10;
    this.applyGravityForBottles();
    soundManager.playSound("shooting", 0.8);
  }

  /**
   * Stops all running animations and intervals, including throwing, splash, and gravity intervals.
   */
  stopAllAnimations() {
    if (this.throwingAnimationInterval) {
      clearInterval(this.throwingAnimationInterval);
    }
    if (this.splashAnimationInterval) {
      clearInterval(this.splashAnimationInterval);
    }
    if (this.applyGravityInterval) {
      clearInterval(this.applyGravityInterval);
    }
  }

  /**
   * Starts all relevant animations and processes, including the throwing animation, splash animation (if active), and gravity.
   */
  startAllAnimations() {
    this.startAnimation();

    if (this.splashAnimationInterval) {
      this.startSplashAnimation();
    }

    this.applyGravityForBottles();
  }
}
