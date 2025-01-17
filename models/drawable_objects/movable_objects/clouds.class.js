class Clouds extends MovableObject {
  y = 20;
  width = 720;
  height = 480;
  speed = 0.05 + Math.random() * 0.1; // Initial speed (0.05 to 0.15)
  targetSpeed = this.speed; // Target speed
  speedChangeInterval = 60000; // 60 seconds
  transitionDuration = 10000; // 10 seconds
  lastSpeedChange = Date.now();
  transitionStartTime = null;
  initialTransitionSpeed = this.speed;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = 480; // Starting position
  }

  move() {
    // Movement of the cloud
    this.x -= this.speed;

    // If the cloud leaves the screen on the left, it reappears on the right
    if (this.x + this.width < 0) {
      this.x = 480 + Math.random() * 200; // New position outside the screen on the right
    }

    // Gradually adjust speed
    this.adjustSpeed();
  }

  adjustSpeed() {
    this.checkSpeedChange();
    this.calculateTransitionSpeed();
    this.finalizeTransition();
  }
  
  checkSpeedChange() {
    let now = Date.now();
  
    if (now - this.lastSpeedChange >= this.speedChangeInterval) {
      this.lastSpeedChange = now;
      this.targetSpeed = 0.1 + Math.random() * 0.25;
      this.transitionStartTime = now;
      this.initialTransitionSpeed = this.speed;
    }
  }
  
  calculateTransitionSpeed() {
    let now = Date.now();
  
    if (this.transitionStartTime && now - this.transitionStartTime <= this.transitionDuration) {
      let elapsed = now - this.transitionStartTime;
      let t = elapsed / this.transitionDuration;
      this.speed = this.initialTransitionSpeed + t * (this.targetSpeed - this.initialTransitionSpeed);
    }
  }
  
  finalizeTransition() {
    let now = Date.now();
  
    if (this.transitionStartTime && now - this.transitionStartTime > this.transitionDuration) {
      this.speed = this.targetSpeed;
      this.transitionStartTime = null;
    }
  }
  
}