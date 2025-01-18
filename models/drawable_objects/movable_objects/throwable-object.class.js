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

  startAnimation() {
    this.throwingAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_THROWING);
    }, 90);
  }

  stopAnimation() {
    clearInterval(this.throwingAnimationInterval);
    console.log("Wurf-Animation gestoppt");
  }

  startSplashAnimation() {
    this.splashAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
    }, 100);
  }

  stopSplashAnimation() {
    clearInterval(this.splashAnimationInterval);
    console.log("Splash-Animation gestoppt");
  }

  throw(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 25; // Initiale Wurfhöhe
    this.speedX = 10; // Horizontale Bewegung
    this.applyGravityForBottles(); // Bewegung durch Schwerkraft und X-Steuerung

    soundManager.playSound("shooting", 0.8);
  }

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
    console.log("Alle Animationen des ThrowableObject gestoppt");
  }

  startAllAnimations() {
    // Starte Wurfanimation erneut
    this.startAnimation();

    // Starte Splash-Animation erneut, falls aktiv
    if (this.splashAnimationInterval) {
      this.startSplashAnimation();
    }

    // Starte Gravitation erneut
    this.applyGravityForBottles();
    console.log("Alle Animationen des ThrowableObject erneut gestartet");
  }
}
