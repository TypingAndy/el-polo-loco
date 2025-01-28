class BrokenBottle extends MovableObject {
  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y) {
    super().loadImage(this.IMAGES_SPLASH[0]);
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;

    this.loadImages(this.IMAGES_SPLASH);
    this.startSplashAnimation();
  }

  /**
   * Starts the splash animation by cycling through splash images and stops it after a timeout.
   */
  startSplashAnimation() {
    this.splashInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
    }, 100);

    this.splashTimeout = setTimeout(() => {
      this.stopSplashAnimation();
      this.removeBottle();
    }, 600);
  }

  /**
   * Stops the splash animation by clearing the interval and timeout.
   */
  stopSplashAnimation() {
    if (this.splashInterval) {
      clearInterval(this.splashInterval);
    }
    if (this.splashTimeout) {
      clearTimeout(this.splashTimeout);
    }
  }

  /**
   * Starts the splash animation if it is not already running.
   */
  startSplashAnimation() {
    if (!this.splashTimeout) {
      this.splashInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_SPLASH);
      }, 100);

      this.splashTimeout = setTimeout(() => {
        this.stopSplashAnimation();
        this.removeBottle();
      }, 600);
    }
  }

  /**
   * Stops all animations related to this object.
   */
  stopAllAnimations() {
    this.stopSplashAnimation();
  }

  /**
   * Removes the bottle object from the list of throwable objects in the game world.
   */
  removeBottle() {
    const index = world.throwableObjects.indexOf(this);
    if (index > -1) {
      world.throwableObjects.splice(index, 1);
    }
  }
}
