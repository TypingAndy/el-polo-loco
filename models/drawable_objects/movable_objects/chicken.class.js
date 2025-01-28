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
  isDead = false;

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

  /**
   * Starts intervals for movement and animation.
   * Movement and animation occur only if the character is not dead.
   */
  startIntervals() {
    this.moveInterval = setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    this.animationInterval = setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 150);
  }

  /**
   * Stops all running animations and movement intervals.
   * Clears both the movement and animation intervals.
   */
  stopAllAnimations() {
    clearInterval(this.moveInterval);
    clearInterval(this.animationInterval);
  }
}
