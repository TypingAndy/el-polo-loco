class FullScreenButton extends DrawableObject {
  IMAGE_FULLSCREENBUTTON = ["img/11_buttons/fullscreen.png"];

  currentButton = this.IMAGE_FULLSCREENBUTTON;

  constructor() {
    super();
    this.loadImage(this.currentButton);
    this.x = 560;
    this.y = 36;
    this.width = 38;
    this.height = 38;
    this.addClickEvent();
    this.addMouseVisibilityHandler();
  }

  addClickEvent() {
    const canvas = document.querySelector("canvas");
    if (!canvas) {
      return;
    }

    canvas.addEventListener("click", (event) => {
      if (this.isClicked(event)) {
        this.toggleFullscreen(canvas);
      }
    });
  }

  addMouseVisibilityHandler() {
    document.addEventListener("fullscreenchange", () => {
      const canvas = document.querySelector("canvas");
      if (document.fullscreenElement) {
        canvas.style.cursor = "none"; // Hide the mouse
      } else {
        canvas.style.cursor = "default"; // Show the mouse
      }
    });
  }

  isClicked(event) {
    const canvas = document.querySelector("canvas");
    if (!canvas) {
      return false;
    }

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    return clickX >= this.x && clickX <= this.x + this.width && clickY >= this.y && clickY <= this.y + this.height;
  }

  toggleFullscreen(canvas) {
    if (!document.fullscreenElement) {
      canvas.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
  
}

// No export statement as per your requirement
