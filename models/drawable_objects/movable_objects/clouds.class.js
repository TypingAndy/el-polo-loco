class Clouds extends MovableObject {
  y = 20;
  width = 720;
  height = 480;
  speed = 0.05 + Math.random() * 0.1;
  targetSpeed = this.speed;
  speedChangeInterval = 60000;
  transitionDuration = 10000;
  lastSpeedChange = Date.now();
  transitionStartTime = null;
  initialTransitionSpeed = this.speed;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = 480;
  }

  /**
   * Moves the character to the left by reducing its X position.
   * Resets the position to a random point off-screen to the right if it moves out of view.
   * Adjusts the speed after updating the position.
   */
  move() {
    this.x -= this.speed;

    if (this.x + this.width < 0) {
      this.x = 480 + Math.random() * 200;
    }
    this.adjustSpeed();
  }

  /**
   * Adjusts the character's speed by checking for changes, calculating transition speed, and finalizing the adjustment.
   */
  adjustSpeed() {
    this.checkSpeedChange();
    this.calculateTransitionSpeed();
    this.finalizeTransition();
  }

  /**
   * Checks and updates the target speed if the speed change interval has passed.
   * Initializes values for the transition to the new speed.
   */
  checkSpeedChange() {
    let now = Date.now();

    if (now - this.lastSpeedChange >= this.speedChangeInterval) {
      this.lastSpeedChange = now;
      this.targetSpeed = 0.1 + Math.random() * 0.25;
      this.transitionStartTime = now;
      this.initialTransitionSpeed = this.speed;
    }
  }

  /**
   * Calculates the speed transition over time based on the elapsed duration of the transition.
   * Smoothly adjusts the speed from the initial to the target speed within the transition duration.
   */
  calculateTransitionSpeed() {
    let now = Date.now();

    if (this.transitionStartTime && now - this.transitionStartTime <= this.transitionDuration) {
      let elapsed = now - this.transitionStartTime;
      let t = elapsed / this.transitionDuration;
      this.speed = this.initialTransitionSpeed + t * (this.targetSpeed - this.initialTransitionSpeed);
    }
  }

  /**
   * Finalizes the speed transition once the transition duration has elapsed.
   * Sets the speed to the target speed and clears the transition start time.
   */
  finalizeTransition() {
    let now = Date.now();

    if (this.transitionStartTime && now - this.transitionStartTime > this.transitionDuration) {
      this.speed = this.targetSpeed;
      this.transitionStartTime = null;
    }
  }
}
