class World {
  character = new Character();
  statusLifebar = new StatusLifebar();
  statusCoinbar = new StatusCoinbar();
  statusBottlebar = new StatusBottlebar();
  throwableObjects = [];

  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
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
    this.statusBottlebar.setBottleAmount(level1.collectedBottles.length);
  }

  startStatusUpdateInterval() {
    setInterval(() => {
      this.updateBottleBar();
    }, 100); // Aktualisiert den Status alle 100ms
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
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
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusLifebar);
    this.addToMap(this.statusCoinbar);
    this.addToMap(this.statusBottlebar);
    this.ctx.translate(this.camera_x, 0);
    // Space for fixed UI Objects

    this.addObjectsToMap(this.throwableObjects);

    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);

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
    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  //bottles
  throwBottleInterval() {
    setInterval(() => {
      this.checkThrowObjects();
    }, 300);
  }

  respawnBottles() {
    if (level1.bottles.length < 7) {
      // Zufällige X-Position zwischen 200 und 1500 berechnen
      let randomX = Math.floor(Math.random() * (2500 - 200 + 1)) + 200;

      // Neue Flasche mit zufälliger Position hinzufügen
      level1.bottles.push(new CollectableBottle(randomX));
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
      this.checkCollisionsWithEnemies();
      this.checkCollisionsWithCoins();
      this.checkCollisionsWithBottles();
      this.checkCollisionBottleWithEnemies();
    }, 30);
  }

  checkCollisionsWithEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isDead) return; // Überspringe tote Gegner
      let collisionType = this.character.isColliding(enemy);
      if (collisionType === "top" && this.checkCharacterFallingDown()) {
        this.jumpOnEnemyTop(enemy);
      } else if (collisionType) {
        this.characterGetHitByEnemy(enemy);
      }
    });
  }

  checkCharacterFallingDown() {
    return (this.character.fallingDown = this.character.speedY < 0); // Prüfen, ob der Charakter fällt
  }

  jumpOnEnemyTop(enemy) {
    if (this.keyboard.SPACE) {
      this.character.jump(30, 0); // Höherer Sprung, wenn SPACE gedrückt ist
    } else {
      this.character.jump(10, 0); // Normaler Sprung
    }
    enemy.enemieHealthMinusOne(); // Reduziere die Gesundheit des Gegners
  }

  characterGetHitByEnemy(enemy) {
    this.character.hit(enemy); // Charakter nimmt Schaden
    this.statusLifebar.setPercentage(this.character.energy);
  }

  checkCollisionsWithCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.collectCoin(coin);
        this.character.coinAmount += 1;
        this.statusCoinbar.setCoinAmount(this.character.coinAmount);
      }
    });
  }

  checkCollisionsWithBottles() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.collectBottle(bottle);

        level1.collectedBottles.push("bottleToThrow");
        this.statusBottlebar.setBottleAmount(level1.collectedBottles.length);
      }
    });
  }

  checkCollisionBottleWithEnemies() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          soundManager.stopSound("bottleSmash");
          soundManager.playSound("bottleSmash");

          if (enemy instanceof Endboss) {
            enemy.health -= 1;

            if (enemy.health > 0) {
              this.hurtEndbossAnimation(enemy);
            } else {
              enemy.animateDefeat();
            }
          } else {
            enemy.enemieHealthMinusOne();
          }

          this.changeThrownToBrokenBottle(bottle, bottleIndex);
        }
      });
    });
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
