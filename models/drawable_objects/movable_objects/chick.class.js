class Chick extends MovableObject {
  width = 43;
  height = 43;
  hitBoxWidth = 35;
  hitBoxHeight = 35;
  hitBoxX = 5;
  hitBoxY = 5;
  color = "purple";
  y = 373;

  health;
  isDead = false; // Eigenschaft, um den Zustand des Chicks zu speichern

  IMAGES_WALKING = ["img/3_enemies_chicken/chicken_small/1_walk/1_w.png", "img/3_enemies_chicken/chicken_small/1_walk/2_w.png", "img/3_enemies_chicken/chicken_small/1_walk/3_w.png"];

  IMAGE_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  constructor(x, health) {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/2_w.png");
    this.loadImages(this.IMAGES_WALKING);

    if (x) {
      this.x = x;
      this.speed = 0.15 + Math.random() * 5.5;
    } else {
      this.x = 200 + Math.random() * 2000;
      this.speed = 0.15 + Math.random() * 0.5;
    }

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
        this.playAnimation(this.IMAGES_WALKING); // Animation nur, wenn das Chick nicht tot ist
      }
    }, 100);
  }

  stopAllAnimations() {
    clearInterval(this.moveInterval);
    clearInterval(this.animationInterval);

  }
}
