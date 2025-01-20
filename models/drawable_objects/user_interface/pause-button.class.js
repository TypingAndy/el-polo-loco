class PauseButton extends DrawableObject {
  IMAGE_PAUSEBUTTON = ["img/11_buttons/pause.png"];
  IMAGE_RESUMEBUTTON = ["img/11_buttons/resume.png"];
  currentButton = this.IMAGE_PAUSEBUTTON;

  constructor() {
    super();
    this.loadImage(this.currentButton);
    this.x = 660;
    this.y = 40;
    this.width = 20;
    this.height = 30;

    this.addClickEvent();
  }

  addClickEvent() {
    document.addEventListener("click", (event) => {
      if (this.isClicked(event)) {
        this.toggleImageAndState();
      }
    });
  }

  isClicked(event) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    return clickX >= this.x && clickX <= this.x + this.width && clickY >= this.y && clickY <= this.y + this.height;
  }

  toggleImageAndState() {
    if (this.currentButton === this.IMAGE_PAUSEBUTTON) {
      this.currentButton = this.IMAGE_RESUMEBUTTON;
      pauseGame();
    } else {
      this.currentButton = this.IMAGE_PAUSEBUTTON;
      resumeGame();
    }

    this.loadImage(this.currentButton);
  }
}
