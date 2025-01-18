class World {
  character = new Character();
  statusLifebar = new StatusLifebar();
  statusCoinbar = new StatusCoinbar();
  statusBottlebar = new StatusBottlebar();

  throwableObjects = [];

  level = level1;
  canvas;
  context;
  collision;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.collision = new Collision(this, this.level, this.character, this.statusCoinbar, this.statusBottlebar, this.throwableObjects);
    this.initializeGameMusic(); // Initialisiere die Musik
    this.draw();
    this.setWorld();
    this.throwBottleInterval();
    this.collisionDetectionSpeed();
    this.respawnBottles();
    this.startRespawnInterval();
    this.startStatusUpdateInterval();
   
  }

  setWorld() {
    this.character.world = this;
  }

  startRespawnInterval() {
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

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.level.clouds.forEach((cloud) => {
      cloud.move();
      this.addToMap(cloud);
    });

    this.level.enemies.forEach((enemie) => {
      this.addToMap(enemie);
    });

    this.level.coins.forEach((coins) => {
      this.addToMap(coins);
    });

    this.level.bottles.forEach((collectableBottle) => {
      this.addToMap(collectableBottle);
    });

    // Space for fixed UI Objects
    this.context.translate(-this.camera_x, 0);
    this.addToMap(this.statusLifebar);
    this.addToMap(this.statusCoinbar);
    this.addToMap(this.statusBottlebar);
    this.context.translate(this.camera_x, 0);
    // Space for fixed UI Objects

    this.addObjectsToMap(this.throwableObjects);

    this.addToMap(this.character);

    this.context.translate(-this.camera_x, 0);

    requestAnimationFrame(() => {
      this.draw();
    });
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
    // mo.drawFrame(this.context);
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
  throwBottleInterval() {
    setInterval(() => {
      this.checkThrowObjects();
    }, 300);
  }

  respawnBottles() {
    if (this.level.bottles.length < 7) {
      let randomX = Math.floor(Math.random() * (2500 - 200 + 1)) + 200;
      this.level.bottles.push(new CollectableBottle(randomX));
    }
  }

  checkThrowObjects() {
    if (this.keyboard.THROW) {
      let bottle = new ThrowableObject(this.character.x + 65, this.character.y + 100);
      this.throwableObjects.push(bottle);
    }
  }

  collisionDetectionSpeed() {
    setInterval(() => {
      this.collision.checkCollisionsWithEnemies();
      this.collision.checkCollisionsWithCoins();
      this.collision.checkCollisionsWithBottles();
      this.collision.checkCollisionBottleWithEnemies();
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
    this.statusLifebar.setPercentage(this.character.energy);
  }

  hurtEndbossAnimation(enemy) {
    enemy.playHurtAnimation(); // Hurt-Animation
    soundManager.stopSound("endbossHurt");
    soundManager.playSound("endbossHurt");
  }

  changeThrownToBrokenBottle(bottle, bottleIndex) {
    let brokenBottle = new BrokenBottle(bottle.x, bottle.y);
    this.throwableObjects.splice(bottleIndex, 1); // Entferne die geworfene Flasche
    this.throwableObjects.push(brokenBottle); // Füge die zerbrochene Flasche hinzu
  }

  // Methode zur Initialisierung der Musik
  initializeGameMusic() {
    let startMusic = () => {
      soundManager.playSound("gameMusic", 0.4, true); // Game-Musik mit Schleife
      soundManager.playSound("ambient", 0.3, true); // Ambient-Sound mit Schleife

      // Entferne den Event-Listener, nachdem die Musik gestartet wurde
      document.removeEventListener("click", startMusic);
      document.removeEventListener("keydown", startMusic);
    };

    // Füge Event-Listener hinzu, um auf Benutzerinteraktion zu warten
    document.addEventListener("click", startMusic);
    document.addEventListener("keydown", startMusic);
  }
}
