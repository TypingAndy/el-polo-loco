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
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
  
        // Buttons erstellen, wenn das Bild geladen ist
        this.createStartButton();
        this.createHelpButton();
      };
    }
  
    createStartButton() {
      this.startButton = document.createElement("button");
      this.startButton.innerText = "Start Game";
      this.startButton.style.position = "absolute";
      this.startButton.style.left = `${this.canvas.offsetLeft + 200}px`;
      this.startButton.style.top = `${this.canvas.offsetTop + 50}px`;
      this.startButton.style.width = `${100}px`;
      this.startButton.style.height = `${50}px`;
      document.body.appendChild(this.startButton);
  
      this.startButton.addEventListener("click", () => this.clickStartButton());
    }
  
    clickStartButton() {
      // Startscreen und Buttons entfernen
      this.clearScreen();
      startLevel(1); // Level 1 starten
    }
  
    createHelpButton() {
      this.helpButton = document.createElement("button");
      this.helpButton.innerText = "Help";
      this.helpButton.style.position = "absolute";
      this.helpButton.style.left = `${this.canvas.offsetLeft + 400}px`;
      this.helpButton.style.top = `${this.canvas.offsetTop + 50}px`;
      this.helpButton.style.width = `${100}px`;
      this.helpButton.style.height = `${50}px`;
      document.body.appendChild(this.helpButton);
  
      this.helpButton.addEventListener("click", () => {
        this.showHelpText();
      });
    }
  
    clearScreen() {
      // Startscreen entfernen
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
      // Buttons entfernen
      if (this.startButton) this.startButton.remove();
      if (this.helpButton) this.helpButton.remove();
    }
  
    showHelpText() {
      const helpOverlay = document.createElement("div");
      helpOverlay.style.position = "fixed";
      helpOverlay.style.top = "0";
      helpOverlay.style.left = "0";
      helpOverlay.style.width = "100%";
      helpOverlay.style.height = "100%";
      helpOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      helpOverlay.style.color = "white";
      helpOverlay.style.fontSize = "20px";
      helpOverlay.style.padding = "20px";
      helpOverlay.style.zIndex = "1000";
      helpOverlay.style.overflowY = "auto";
  
      helpOverlay.innerHTML = `
          <h1>Game Help</h1>
          <ul>
            <li><b>Move Left:</b> Press <b>A</b></li>
            <li><b>Move Right:</b> Press <b>D</b></li>
            <li><b>Jump:</b> Press <b>Space</b></li>
            <li><b>Super Jump:</b> Jump on an enemy's head and press <b>Space</b></li>
            <li><b>Shoot:</b> Press <b>F</b></li>
            <li><b>Mute:</b> Press <b>M</b></li>
            <li><b>Objective:</b> Collect all coins to spawn the boss</li>
          </ul>
          <button id="closeHelp" style="margin-top: 20px; padding: 10px 20px; font-size: 18px; cursor: pointer;">Close</button>
        `;
  
      document.body.appendChild(helpOverlay);
  
      document.getElementById("closeHelp").addEventListener("click", () => {
        helpOverlay.remove();
      });
    }
  }
  