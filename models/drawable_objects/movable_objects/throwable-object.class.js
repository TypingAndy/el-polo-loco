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
      this.animateThrowableObject();
    } else {
      soundManager.stopSound("noBottle")
      soundManager.playSound("noBottle", 0.3);
    }
  }

  animateThrowableObject() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_THROWING);
    }, 90);
  }

  throw(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 25; // Initiale Wurfhöhe
    this.speedX = 10; // Horizontale Bewegung
    this.applyGravity(); // Bewegung durch Schwerkraft und X-Steuerung
  
    soundManager.playSound("shooting", 0.8);
  }

  triggerSplashAnimation() {
    this.speedX = 0; // Stoppe die horizontale Bewegung
    this.speedY = 0; // Stoppe die vertikale Bewegung
    this.loadImages(this.IMAGES_SPLASH); // Lade Splash-Bilder
    this.currentImage = 0; // Setze Animation zurück

    let splashInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
    }, 100);
  }
}
