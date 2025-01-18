class Chicken extends MovableObject {
  width = 60;
  height = 60;
  hitBoxWidth = 50;
  hitBoxHeight = 50;
  hitBoxX = 5;
  hitBoxY = 5;
  color = "orange";
  y = 362;

  health;
  isDead = false; // Neue Eigenschaft, um den Zustand des Huhns zu speichern

  IMAGES_WALKING = ["img/3_enemies_chicken/chicken_normal/1_walk/1_w.png", "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png", "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"];
  IMAGE_DEAD = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

  constructor(x, health) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/2_w.png");
    this.loadImages(this.IMAGES_WALKING);

    if (x) {
      this.x = x;
      this.speed = 1;
    } else {
      this.x = 400;
      this.speed = 0;
    }

    this.health = health;

    this.startIntervals();
  }

  startIntervals() {
    // Bewegung
    this.moveInterval = setInterval(() => {
      if (!this.isDead) {
        this.moveLeft(); // Bewegung nur, wenn das Huhn nicht tot ist
      }
    }, 1000 / 60);

    // Animation
    this.animationInterval = setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING); // Animation nur, wenn das Huhn nicht tot ist
      }
    }, 150);
  }

  stopAllAnimations() {
    clearInterval(this.moveInterval);
    clearInterval(this.animationInterval);
    console.log("Alle Intervalle für Chicken gestoppt");
  }
}
