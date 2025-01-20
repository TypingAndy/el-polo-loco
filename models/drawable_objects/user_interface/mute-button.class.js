class MuteButton extends DrawableObject {
  IMAGE_SOUNDBUTTON = ["img/11_buttons/sound.png"];
  IMAGE_MUTEBUTTON = ["img/11_buttons/muted.png"];
  currentButton = this.IMAGE_SOUNDBUTTON;

  constructor() {
    super();
    this.loadImage(this.currentButton);
    this.x = 610;
    this.y = 36;
    this.width = 38;
    this.height = 38;

    this.addClickEvent();
  }

  addClickEvent() {
    document.addEventListener("click", (event) => {
      if (this.isClicked(event)) {
        this.toggleImage();
      }
    });
  }

  isClicked(event) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    return clickX >= this.x && clickX <= this.x + this.width && clickY >= this.y && clickY <= this.y + this.height;
  }

  toggleImage() {
    if (this.currentButton === this.IMAGE_SOUNDBUTTON) {
      this.currentButton = this.IMAGE_MUTEBUTTON;
      soundManager.stopAllSounds();
    } else {
      this.currentButton = this.IMAGE_SOUNDBUTTON;
      soundManager.resumeAllSounds(); // Nur relevante Sounds fortsetzen
      soundManager.initializeGameMusic(); // Sicherstellen, dass Musik aktiv bleibt
    }
  
    this.loadImage(this.currentButton);
  }
}
