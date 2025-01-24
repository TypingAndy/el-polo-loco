class WinningScreen extends DrawableObject {
  IMAGES_WINNINGSCREEN = ["img/9_intro_outro_screens/win/win_2.png"];
  NEXT_LEVEL = ['img/11_buttons/level2.png'];
  START_SCREEN = ['img/11_buttons/startscreen.png'];

  constructor() {
    super();
    this.loadImage(this.IMAGES_WINNINGSCREEN[0]); // Load the winning screen image
    this.x = 0;
    this.y = 0;
    this.width = 720;
    this.height = 480;
    this.renderWinningScreen();
  }

  renderWinningScreen() {
    // Create the overlay container for the winning screen and buttons
    const overlay = document.createElement('div');
    overlay.id = 'winning-overlay';
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

    // Create the winning screen image element
    const winImage = new Image();
    winImage.src = this.IMAGES_WINNINGSCREEN[0];
    winImage.style.position = 'absolute';
    winImage.style.transform = 'translate(-50%, -50%)'; // Center the image
    winImage.style.left = '50%';
    winImage.style.top = '50%';
    winImage.style.width = '60%'; // Adjusted size
    winImage.style.height = 'auto';
    overlay.appendChild(winImage);

    // Create the "Next Level" button in the bottom right corner
    const nextLevelButton = new Image();
    nextLevelButton.src = this.NEXT_LEVEL[0];
    nextLevelButton.style.position = 'absolute';
    nextLevelButton.style.bottom = '5%';
    nextLevelButton.style.right = '5%'; // Position in the bottom right corner
    nextLevelButton.style.cursor = 'pointer';
    nextLevelButton.style.width = '150px'; // Adjust the size of the button if needed
    nextLevelButton.style.height = 'auto';
    nextLevelButton.addEventListener('click', () => {
      this.goToNextLevel();
    });
    overlay.appendChild(nextLevelButton);

    // Create the "Start Screen" button in the bottom left corner
    const startScreenButton = new Image();
    startScreenButton.src = this.START_SCREEN[0];
    startScreenButton.style.position = 'absolute';
    startScreenButton.style.bottom = '5%';
    startScreenButton.style.left = '5%'; // Position in the bottom left corner
    startScreenButton.style.cursor = 'pointer';
    startScreenButton.style.width = '150px'; // Adjust the size of the button if needed
    startScreenButton.style.height = 'auto';
    startScreenButton.addEventListener('click', () => {
  
    });
    overlay.appendChild(startScreenButton);

    // Append overlay to the body
    document.body.appendChild(overlay);
  }

  goToNextLevel() {
    // Remove the overlay and trigger the next level logic
    const overlay = document.getElementById('winning-overlay');
    if (overlay) overlay.remove();
    selectLevel(2); // Implement the `selectLevel` function in your game logic
    resumeGame(); // Ensure game resumes or initializes next level
  }


}
