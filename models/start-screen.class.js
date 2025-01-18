// class StartScreen {
//     constructor(canvas, context) {
//         this.canvas = canvas;
//         this.context = context;

//         // Hintergrundbild laden
//         this.image = new Image();
//         this.image.src = 'img/9_intro_outro_screens/start/startscreen_1.png';
//     }

//     drawBackground() {
//         // Hintergrundbild auf den Canvas zeichnen
//         this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);

//         // Optional: Text hinzufügen
//         this.context.fillStyle = 'white';
//         this.context.font = '30px Arial';
//         this.context.textAlign = 'center';
//         this.context.fillText('Drücke Enter, um zu starten!', this.canvas.width / 2, this.canvas.height - 50);
//     }
// }

// // Initialisierung und Game-Loop
// const canvas = document.getElementById('gameCanvas');
// const keyboard = new Keyboard();
// const world = new World(canvas, keyboard);

// window.addEventListener('keydown', (event) => world.handleInput(event));

// function gameLoop() {
//     world.context.clearRect(0, 0, canvas.width, canvas.height); // Canvas bereinigen
//     world.draw();
//     requestAnimationFrame(gameLoop);
// }

// gameLoop();
