class ChickCanon extends MovableObject {
  width = 43;
  height = 43;
  hitBoxWidth = 35;
  hitBoxHeight = 35;
  hitBoxX = 5;
  hitBoxY = 5;
  color = "purple";
  y = 300;

  health;
  isDead = false; // Eigenschaft, um den Zustand des Chicks zu speichern

  IMAGES_ROLLING = [
    "img/3_enemies_chicken/chicken_small/4_canon/8_c.png",
    "img/3_enemies_chicken/chicken_small/4_canon/7_c.png",
    "img/3_enemies_chicken/chicken_small/4_canon/6_c.png",
    "img/3_enemies_chicken/chicken_small/4_canon/5_c.png",
    "img/3_enemies_chicken/chicken_small/4_canon/4_c.png",
    "img/3_enemies_chicken/chicken_small/4_canon/3_c.png",
    "img/3_enemies_chicken/chicken_small/4_canon/2_c.png",
    "img/3_enemies_chicken/chicken_small/4_canon/1_c.png",
  ];

  IMAGE_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  constructor(endbossX, health) {
    super().loadImage("img/3_enemies_chicken/chicken_small/4_canon/1_c.png");
    this.loadImages(this.IMAGES_ROLLING);

    this.x = endbossX;
    this.speed = 2.5;

    this.health = health;

    this.startIntervals();
  }

  startIntervals() {
    this.moveInterval = setInterval(() => {
      if (!this.isDead) {
        this.moveLeft(); // Bewegung nur, wenn das Chick nicht tot ist
      }
    }, 1000 / 60);

    this.animationInterval = setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_ROLLING); // Animation nur, wenn das Chick nicht tot ist
      }
    }, 100);
  }

  stopAllAnimations() {
    clearInterval(this.moveInterval);
    clearInterval(this.animationInterval);
  }
}
