class StartScreen {
  canvas;
  context;
  startButton;
  helpButton;

  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
  }

  draw(imageSrc) {
    let image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);

      // Create buttons when the image is loaded
      this.createStartButton();
      this.createHelpButton();

      // Adjust buttons on resize
      window.addEventListener("resize", () => this.adjustButtonPositions());
    };
  }

  createStartButton() {
    this.startButton = document.createElement("img");
    this.startButton.src = "img/11_buttons/start_game.png";
    this.startButton.alt = "Start Game";
    this.startButton.style.position = "absolute";
    this.startButton.style.width = `${100}px`;
    this.startButton.style.height = `${50}px`;
    this.startButton.style.cursor = "pointer";
    this.startButton.style.transition = "transform 0.3s"; // Smooth transition for scaling
    document.body.appendChild(this.startButton);

    // Set initial position
    this.setPosition(this.startButton, 200, 50);

    // Add hover effect
    this.startButton.addEventListener("mouseover", () => {
      this.startButton.style.transform = "scale(1.1)";
    });
    this.startButton.addEventListener("mouseout", () => {
      this.startButton.style.transform = "scale(1)";
    });

    this.startButton.addEventListener("click", () => this.clickStartButton());
  }

  createHelpButton() {
    this.helpButton = document.createElement("img");
    this.helpButton.src = "img/11_buttons/help.png";
    this.helpButton.alt = "Help";
    this.helpButton.style.position = "absolute";
    this.helpButton.style.width = `${100}px`;
    this.helpButton.style.height = `${50}px`;
    this.helpButton.style.cursor = "pointer";
    this.helpButton.style.transition = "transform 0.3s"; // Smooth transition for scaling
    document.body.appendChild(this.helpButton);

    // Set initial position
    this.setPosition(this.helpButton, 400, 50);

    // Add hover effect
    this.helpButton.addEventListener("mouseover", () => {
      this.helpButton.style.transform = "scale(1.1)";
    });
    this.helpButton.addEventListener("mouseout", () => {
      this.helpButton.style.transform = "scale(1)";
    });

    this.helpButton.addEventListener("click", () => {
      this.showHelpText();
    });
  }

  setPosition(button, offsetX, offsetY) {
    button.style.left = `${this.canvas.offsetLeft + offsetX}px`;
    button.style.top = `${this.canvas.offsetTop + offsetY}px`;
  }

  adjustButtonPositions() {
    if (this.startButton) this.setPosition(this.startButton, 200, 50);
    if (this.helpButton) this.setPosition(this.helpButton, 400, 50);
  }

  clickStartButton() {
    // Remove start screen and buttons
    this.clearScreen();
    startLevel(1); // Start Level 1
  }

  clearScreen() {
    // Remove start screen
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Remove buttons
    if (this.startButton) this.startButton.remove();
    if (this.helpButton) this.helpButton.remove();

    // Remove resize listener
    window.removeEventListener("resize", () => this.adjustButtonPositions());
  }

  showHelpText() {
    let helpOverlay = document.createElement("div");
    helpOverlay.style.position = "fixed";
    helpOverlay.style.top = "0";
    helpOverlay.style.left = "0";
    helpOverlay.style.width = "100%";
    helpOverlay.style.height = "100%";
    helpOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    helpOverlay.style.display = "flex"; // Flexbox for centering
    helpOverlay.style.flexDirection = "column";
    helpOverlay.style.alignItems = "center";
    helpOverlay.style.justifyContent = "center";
    helpOverlay.style.color = "white";
    helpOverlay.style.fontSize = "20px";
    helpOverlay.style.fontFamily = "'Comic Sans MS', cursive, sans-serif";
    helpOverlay.style.padding = "20px";
    helpOverlay.style.zIndex = "1000";
    helpOverlay.style.overflowY = "auto";

    // Use helpTemplate to set innerHTML
    helpOverlay.innerHTML = this.helpTemplate();

    document.body.appendChild(helpOverlay);

    // Close button behavior
    const closeButton = document.getElementById("closeHelp");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        helpOverlay.remove();
      });
    }
  }

  helpTemplate() {
    return `
      <div style="text-align: center;">
        <h1 style="margin-bottom: 20px;">Game Help</h1>
        <ul style="list-style: none; padding: 0;">
          <li><b>Move Left:</b> Press <b>A</b></li>
          <li><b>Move Right:</b> Press <b>D</b></li>
          <li><b>Jump:</b> Press <b>Space</b></li>
          <li><b>Super Jump:</b> Jump on an enemy's head and press <b>Space</b></li>
          <li><b>Shoot:</b> Press <b>F</b></li>
          <li><b>Mute:</b> Press <b>M</b></li>
          <li><b>Objective:</b> Collect all coins to spawn the boss</li>
        </ul>
        <img id="closeHelp" src="img/11_buttons/close.png" alt="Close Help" style="
          display: block;
          margin: 20px auto;
          width: 100px;
          height: 50px;
          cursor: pointer;
        " />
      </div>
    `;
  }
}

