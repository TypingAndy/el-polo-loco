class ChickJumping extends MovableObject {
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
  speedY = 0;
  acceleration = 0.5; // Gravity effect
  jumpHeight = 8; // Default jump height

  IMAGES_JUMPING = [
    "img/3_enemies_chicken/chicken_small/3_jump/1_j.png",
    "img/3_enemies_chicken/chicken_small/3_jump/2_j.png",
    "img/3_enemies_chicken/chicken_small/3_jump/3_j.png",
    "img/3_enemies_chicken/chicken_small/3_jump/4_j.png",
    "img/3_enemies_chicken/chicken_small/3_jump/5_j.png",
    "img/3_enemies_chicken/chicken_small/3_jump/6_j.png",
    "img/3_enemies_chicken/chicken_small/3_jump/7_j.png",
    "img/3_enemies_chicken/chicken_small/3_jump/8_j.png",
  ];

  IMAGES_STAYONGROUND = ["img/3_enemies_chicken/chicken_small/3_jump/1_j.png"];

  IMAGE_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  constructor(x, health, jumpHeight = 8) {
    super().loadImage("img/3_enemies_chicken/chicken_small/3_jump/1_j.png");
    this.loadImages(this.IMAGES_JUMPING);

    this.x = x;
    this.health = health;
    this.jumpHeight = jumpHeight; // Set individual jump height

    this.startIntervals();
    this.applyGravityForChickJumping(); // Ensure gravity starts
  }

  startIntervals() {
    this.applyGravityForChickJumping();
    this.jumpInterval = setInterval(() => {
      if (!this.isDead && !this.isJumping) {
        this.jump();
      }
    }, 1000);

    this.animationInterval = setInterval(() => {
      if (!this.isDead) {
        if (this.isJumping) {
          this.playAnimation(this.IMAGES_JUMPING); // Animation for jumping
        } else {
          this.playAnimation(this.IMAGES_STAYONGROUND); // Animation for standing still
        }
      }
    }, 100);
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.speedY = this.jumpHeight; // Use individual jump height
    }
  }

  applyGravityForChickJumping() {
    clearInterval(this.intervals?.applyGravity); // Avoid duplicate gravity intervals
    this.intervals = this.intervals || {};
    this.intervals.applyGravity = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.y = 373; // Ensure it lands on the ground
        this.speedY = 0;
        this.isJumping = false;
      }
    }, 1000 / 60); // Smooth gravity effect
  }

  isAboveGround() {
    return this.y < 373;
  }

  stopAllAnimations() {
    clearInterval(this.animationInterval);
    clearInterval(this.intervals?.applyGravity);
    clearInterval(this.jumpInterval); // Clear the jump interval on stop
  }
}
