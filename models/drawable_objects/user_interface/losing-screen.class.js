class LosingScreen extends DrawableObject {
    IMAGES_LOSINGSCREEN = ["img/9_intro_outro_screens/game_over/game over.png"];
    RESTART_LEVEL = ["img/11_buttons/restart.png"];
  
    constructor() {
      super();
      this.loadImage(this.IMAGES_LOSINGSCREEN[0]); // Load the losing screen image
      this.x = 0;
      this.y = 0;
      this.width = 720;
      this.height = 480;
      this.renderLosingScreen();
    }
  
    renderLosingScreen() {
      // Create the overlay container for the losing screen and button
      const overlay = document.createElement('div');
      overlay.id = 'losing-overlay';
      overlay.style.position = 'absolute';
      overlay.style.width = `${this.width}px`;
      overlay.style.height = `${this.height}px`;
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      overlay.style.display = 'flex';
      overlay.style.flexDirection = 'column';
      overlay.style.justifyContent = 'center';
      overlay.style.alignItems = 'center';
      overlay.style.zIndex = '1000';
  
      // Center overlay within the canvas
      const canvas = document.querySelector('canvas');
      const canvasRect = canvas.getBoundingClientRect();
      overlay.style.left = `${canvasRect.left + (canvasRect.width - this.width) / 2}px`;
      overlay.style.top = `${canvasRect.top + (canvasRect.height - this.height) / 2}px`;
  
      // Create the losing screen image element
      const loseImage = new Image();
      loseImage.src = this.IMAGES_LOSINGSCREEN[0];
      loseImage.style.position = 'absolute';
      loseImage.style.top = '0';
      loseImage.style.left = '0';
      loseImage.style.width = '100%';
      loseImage.style.height = '100%';
      overlay.appendChild(loseImage);
  
      // Create the "Restart Level" button
      const restartButton = new Image();
      restartButton.src = this.RESTART_LEVEL[0];
      restartButton.style.position = 'absolute';
      restartButton.style.bottom = '10%'; // Position in the bottom 10% of the canvas
      restartButton.style.left = '50%';
      restartButton.style.transform = 'translateX(-50%)'; // Center horizontally
      restartButton.style.cursor = 'pointer';
      restartButton.style.width = '150px'; // Adjust the size of the button if needed
      restartButton.style.height = 'auto';
      restartButton.addEventListener('click', () => {
        this.restartLevel();
      });
      overlay.appendChild(restartButton);
  
      // Append overlay to the body
      document.body.appendChild(overlay);
    }
  
    restartLevel() {
      // Remove the overlay and restart the level
      const overlay = document.getElementById('losing-overlay');
      if (overlay) overlay.remove();
      selectLevel(1); // Implement the `restartGame` function in your game logic
      resumeGame();
    }
  }
  