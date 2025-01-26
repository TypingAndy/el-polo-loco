class WinningScreen extends DrawableObject {
  IMAGES_WINNINGSCREEN = ["img/9_intro_outro_screens/win/win_2.png"];
  NEXT_LEVEL = ["img/11_buttons/level2.png"];
  RESTART_GAME = ["img/11_buttons/restart.png"];

  constructor() {
    super();
    this.loadImage(this.IMAGES_WINNINGSCREEN[0]);
    this.x = 0;
    this.y = 0;
    this.width = 720;
    this.height = 480;
    this.renderWinningScreen();
  }

  renderWinningScreen() {
    const overlay = this.createOverlay();
    const winImage = this.createWinImage();
    overlay.appendChild(winImage);

    if (selectedLevel === 1) {
      const nextLevelButton = this.createButton(this.NEXT_LEVEL[0], 2);
      overlay.appendChild(nextLevelButton);
    } else if (selectedLevel === 2) {
      const restartButton = this.createButton(this.RESTART_GAME[0], 1);
      overlay.appendChild(restartButton);
    }

    document.body.appendChild(overlay);
  }

  createOverlay() {
    const overlay = document.createElement("div");
    overlay.id = "winning-overlay";
    overlay.style.position = "absolute";
    overlay.style.width = `${this.width}px`;
    overlay.style.height = `${this.height}px`;
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "1000";

    const canvas = document.querySelector("canvas");
    const canvasRect = canvas.getBoundingClientRect();
    overlay.style.left = `${canvasRect.left + (canvasRect.width - this.width) / 2}px`;
    overlay.style.top = `${canvasRect.top + (canvasRect.height - this.height) / 2}px`;

    return overlay;
  }

  createWinImage() {
    const winImage = new Image();
    winImage.src = this.IMAGES_WINNINGSCREEN[0];
    winImage.style.position = "absolute";
    winImage.style.transform = "translate(-50%, -50%)";
    winImage.style.left = "50%";
    winImage.style.top = "50%";
    winImage.style.width = "60%";
    winImage.style.height = "auto";
    return winImage;
  }

  createButton(imageSrc, nextLevel) {
    const button = new Image();
    button.src = imageSrc;
    button.style.position = "absolute";
    button.style.bottom = "5%";
    button.style.left = "50%";
    button.style.transform = "translateX(-50%)";
    button.style.cursor = "pointer";
    button.style.width = "150px";
    button.style.height = "auto";
    button.addEventListener("click", () => this.goToNextLevel(nextLevel));
    return button;
  }

  goToNextLevel(nextLevel) {
    const overlay = document.getElementById("winning-overlay");
    if (overlay) overlay.remove();
    selectLevel(nextLevel);
    resumeGame();
  }
}
