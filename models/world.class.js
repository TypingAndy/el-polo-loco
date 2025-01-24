class World {
  character = new Character();
  statusLifebar = new StatusLifebar();
  statusCoinbar = new StatusCoinbar();
  statusBottlebar = new StatusBottlebar();
  pauseButton = new PauseButton();
  muteButton = new MuteButton();
  fullScreenButton = new FullScreenButton();
  throwableObjects = [];

  level = level1;
  canvas;
  context;
  collisionChecker;

  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.collisionChecker = new CollisionChecker(this, this.level, this.character, this.statusCoinbar, this.statusBottlebar, this.throwableObjects);
    soundManager.initializeGameMusic();
    this.draw();
    this.setWorld();
    this.throwBottleInterval();
    this.collisionDetectionSpeed();
    this.respawnBottles();
    this.startBottleRespawnInterval();
    this.startStatusUpdateInterval();
    this.muteButton = new MuteButton();
    this.pauseButton = new PauseButton();
    this.fullScreenButton = new FullScreenButton();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.clearCanvas();
    this.context.translate(this.camera_x, 0);

    this.drawBackground();
    this.drawClouds();
    this.drawEnemies();
    this.drawCoins();
    this.drawCollectableBottles();
    this.drawThrownBottles();
    this.drawUserInterface();
    this.drawCharacter();

    this.context.translate(-this.camera_x, 0);
    this.repeatDrawMethod();
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawCharacter() {
    this.addToMap(this.character);
  }

  drawEnemies() {
    this.level.enemies.forEach((enemie) => {
      this.addToMap(enemie);
    });
  }

  drawCoins() {
    this.level.coins.forEach((coins) => {
      this.addToMap(coins);
    });
  }

  drawCollectableBottles() {
    this.level.bottles.forEach((collectableBottle) => {
      this.addToMap(collectableBottle);
    });
  }

  drawThrownBottles() {
    this.addObjectsToMap(this.throwableObjects);
  }

  drawClouds() {
    this.level.clouds.forEach((cloud) => {
      cloud.move();
      this.addToMap(cloud);
    });
  }

  drawBackground() {
    this.addObjectsToMap(this.level.backgroundObjects);
  }

  drawUserInterface() {
    this.context.translate(-this.camera_x, 0);
    this.addToMap(this.statusLifebar);
    this.addToMap(this.statusCoinbar);
    this.addToMap(this.statusBottlebar);
    this.addToMap(this.pauseButton);
    this.addToMap(this.muteButton);
    this.addToMap(this.fullScreenButton);
    this.context.translate(this.camera_x, 0);
  }

  repeatDrawMethod() {
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  deleteCanvas() {
    // Entferne das Canvas aus dem DOM
    if (this.canvas) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
    // Stoppe alle laufenden Animationen und Spielintervalle, wenn nötig
    cancelAnimationFrame(this.animationFrameId); // Vorausgesetzt, `this.animationFrameId` speichert `requestAnimationFrame`-IDs
    // Entferne zusätzliche Spielkomponenten, falls vorhanden
  }
  

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.context);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.context.save();
    this.context.translate(mo.width, 0);
    this.context.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.context.restore();
  }

  //bottles

  respawnBottles() {
    if (this.level.bottles.length < 7) {
      let randomX = Math.floor(Math.random() * (2500 - 200 + 1)) + 200;
      this.level.bottles.push(new CollectableBottle(randomX));
    }
  }

  throwBottleInterval() {
    setInterval(() => {
      this.checkThrowObjects();
    }, 300);
  }

  checkThrowObjects() {
    if (this.keyboard.THROW) {
      let bottle = new ThrowableObject(this.character.x + 65, this.character.y + 100);
      this.throwableObjects.push(bottle);
    }
  }

  startBottleRespawnInterval() {
    setInterval(() => {
      this.respawnBottles();
    }, 5000);
  }

  updateBottleBar() {
    this.statusBottlebar.setBottleAmount(world.level.collectedBottles.length);
  }

  startStatusUpdateInterval() {
    setInterval(() => {
      this.updateBottleBar();
    }, 100); // Aktualisiert den Status alle 100ms
  }

  //other methods

  collisionDetectionSpeed() {
    setInterval(() => {
      this.collisionChecker.checkCollisionsWithEnemies();
      this.collisionChecker.checkCollisionsWithCoins();
      this.collisionChecker.checkCollisionsWithBottles();
      this.collisionChecker.checkCollisionBottleWithEnemies();
    }, 30);
  }

  checkCharacterFallingDown() {
    return (this.character.fallingDown = this.character.speedY < 0);
  }

  jumpOnEnemyTop(enemy) {
    if (this.keyboard.SPACE) {
      this.character.jump(30, 0);
    } else {
      this.character.jump(10, 0);
    }
    enemy.enemieHealthMinusOne();
  }

  characterGetHitByEnemy(enemy) {
    this.character.hit(enemy);
    this.statusLifebar.setPercentageOfLifeBar(this.character.energy);
  }

  changeThrownToBrokenBottle(bottle, bottleIndex) {
    let brokenBottle = new BrokenBottle(bottle.x, bottle.y);
    this.throwableObjects.splice(bottleIndex, 1); // Entferne die geworfene Flasche
    this.throwableObjects.push(brokenBottle); // Füge die zerbrochene Flasche hinzu
  }
}
