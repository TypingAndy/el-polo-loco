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
  isDead = false;
  speedY = 0;
  acceleration = 0.5;
  jumpHeight = 8;

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

  /**
   * Starts intervals for applying gravity, jumping, and animations.
   * Executes actions only if the character is not dead.
   */
  startIntervals() {
    this.applyGravityForChickJumping();

    this.jumpInterval = setInterval(() => {
      if (!this.isDead && !this.isJumping) {
        this.jump(); // Perform jump if the character is not dead or already jumping
      }
    }, 1000);

    this.animationInterval = setInterval(() => {
      if (!this.isDead) {
        if (this.isJumping) {
          this.playAnimation(this.IMAGES_JUMPING); // Play jumping animation
        } else {
          this.playAnimation(this.IMAGES_STAYONGROUND); // Play standing animation
        }
      }
    }, 100);
  }

  /**
   * Makes the character jump if it is not already jumping.
   * Sets the vertical speed to the defined jump height.
   */
  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.speedY = this.jumpHeight; // Use individual jump height
    }
  }

  /**
   * Applies gravity to the character for smooth jumping and landing.
   * Ensures only one gravity interval runs at a time.
   */
  applyGravityForChickJumping() {
    clearInterval(this.intervals?.applyGravity);
    this.intervals = this.intervals || {};
    this.intervals.applyGravity = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.y = 373;
        this.speedY = 0;
        this.isJumping = false;
      }
    }, 1000 / 60);
  }

  /**
   * Checks if the character is above the ground level.
   * @returns {boolean} True if the character's Y position is above 373, false otherwise.
   */
  isAboveGround() {
    return this.y < 373;
  }

  /**
   * Stops all running animations and intervals related to the character.
   * Clears animation, gravity, and jump intervals.
   */
  stopAllAnimations() {
    clearInterval(this.animationInterval);
    clearInterval(this.intervals?.applyGravity);
    clearInterval(this.jumpInterval); // Clear the jump interval on stop
  }
}
