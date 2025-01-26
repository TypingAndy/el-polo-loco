class StartScreen extends DrawableObject {
  constructor(canvas, context) {
    super();
    this.canvas = canvas;
    this.context = context;
    this.loadImage("img/9_intro_outro_screens/start/startscreen_1.png");
    this.width = canvas.width; // Passe die Größe an die Canvas-Größe an
    this.height = canvas.height;
    this.x = 0;
    this.y = 0;
  }

  drawScreen() {
    // Zeichne den Hintergrund
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.draw(this.context);

    // Zeichne die Buttons
    this.createStartButton();
    this.createHelpButton();
    this.createImpressumButton();
  }

  createStartButton() {
    const startButton = document.createElement("img");
    startButton.src = "img/11_buttons/start_game.png";
    startButton.alt = "Start Game";
    startButton.style.position = "absolute";
    startButton.style.width = "100px";
    startButton.style.height = "50px";
    startButton.style.left = `${this.canvas.offsetLeft + 200}px`;
    startButton.style.top = `${this.canvas.offsetTop + 50}px`;
    startButton.style.cursor = "pointer";
    startButton.addEventListener("click", () => {
      this.startGame();
    });
    document.body.appendChild(startButton);
  }

  createHelpButton() {
    const helpButton = document.createElement("img");
    helpButton.src = "img/11_buttons/help.png";
    helpButton.alt = "Help";
    helpButton.style.position = "absolute";
    helpButton.style.width = "100px";
    helpButton.style.height = "50px";
    helpButton.style.left = `${this.canvas.offsetLeft + 400}px`;
    helpButton.style.top = `${this.canvas.offsetTop + 50}px`;
    helpButton.style.cursor = "pointer";
    helpButton.addEventListener("click", () => {
      this.showHelpText();
    });
    document.body.appendChild(helpButton);
  }

  createImpressumButton() {
    const impressumButton = document.createElement("img");
    impressumButton.src = "img/11_buttons/impressum.png";
    impressumButton.alt = "Impressum";
    impressumButton.style.position = "absolute";
    impressumButton.style.width = "80px";
    impressumButton.style.height = "40px";
    impressumButton.style.left = `${this.canvas.offsetLeft + 20}px`;
    impressumButton.style.top = `${this.canvas.offsetTop + this.canvas.height - 50}px`;
    impressumButton.style.cursor = "pointer";
    impressumButton.addEventListener("click", () => {
      this.showImpressumText();
    });
    document.body.appendChild(impressumButton);
  }

  startGame() {
    // Entferne den Startscreen und beginne das Spiel
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    document.querySelectorAll("img").forEach((btn) => btn.remove()); // Entferne Buttons
    startLevel(1); // Startlevel aufrufen
  }

  showHelpText() {
    const helpOverlay = document.createElement("div");
    helpOverlay.style.position = "fixed";
    helpOverlay.style.top = "0";
    helpOverlay.style.left = "0";
    helpOverlay.style.width = "100%";
    helpOverlay.style.height = "100%";
    helpOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    helpOverlay.style.display = "flex";
    helpOverlay.style.flexDirection = "column";
    helpOverlay.style.alignItems = "center";
    helpOverlay.style.justifyContent = "center";
    helpOverlay.style.color = "white";
    helpOverlay.style.fontSize = "20px";
    helpOverlay.style.fontFamily = "'Comic Sans MS', cursive, sans-serif";
    helpOverlay.style.padding = "20px";
    helpOverlay.style.zIndex = "1000";
    helpOverlay.style.overflowY = "auto";

    helpOverlay.innerHTML = `
      <div style="text-align: center;">
        <h1 style="margin-bottom: 20px;">Game Help</h1>
        <ul style="list-style: none; padding: 0;">
          <li><b>Move Left:</b> Press <b>A</b></li>
          <li><b>Move Right:</b> Press <b>D</b></li>
          <li><b>Jump:</b> Press <b>Space</b></li>
          <li><b>Super Jump:</b> Jump on an enemy's head and press <b>Space</b></li>
          <li><b>Shoot:</b> Press <b>F</b></li>
          <li><b>Mute:</b> Press <b>M</b> to toggle sound</li>
          <li><b>Pause:</b> Press <b>P</b> to pause or resume the game</li>
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

    document.body.appendChild(helpOverlay);

    const closeButton = document.getElementById("closeHelp");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        helpOverlay.remove();
      });
    }
  }

  showImpressumText() {
    const impressumOverlay = document.createElement("div");
    impressumOverlay.style.position = "fixed";
    impressumOverlay.style.top = "0";
    impressumOverlay.style.left = "0";
    impressumOverlay.style.width = "100%";
    impressumOverlay.style.height = "100%";
    impressumOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    impressumOverlay.style.display = "flex";
    impressumOverlay.style.flexDirection = "column";
    impressumOverlay.style.alignItems = "center";
    impressumOverlay.style.justifyContent = "center";
    impressumOverlay.style.color = "white";
    impressumOverlay.style.fontSize = "20px";
    impressumOverlay.style.fontFamily = "'Comic Sans MS', cursive, sans-serif";
    impressumOverlay.style.padding = "20px";
    impressumOverlay.style.zIndex = "1000";
    impressumOverlay.style.overflowY = "auto";

    impressumOverlay.innerHTML = `
      <div style="text-align: center;">
        <h1 style="margin-bottom: 20px;">Impressum</h1>
        <p><b>Angaben gemäß § 5 TMG</b></p>
        <p>Musterfirma GmbH<br>Musterstraße 123<br>12345 Musterstadt</p>
        <p><b>Vertreten durch</b></p>
        <p>Andreas Traar, Geschäftsführer</p>
        <p><b>Kontakt</b></p>
        <p>Telefon: +49 (0) 123 456 789<br>E-Mail: andreas.georg@outlook.com</p>
        <img id="closeImpressum" src="img/11_buttons/close.png" alt="Close Impressum" style="
          display: block;
          margin: 20px auto;
          width: 100px;
          height: 50px;
          cursor: pointer;
        " />
      </div>
    `;

    document.body.appendChild(impressumOverlay);

    const closeButton = document.getElementById("closeImpressum");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        impressumOverlay.remove();
      });
    }
  }
}
