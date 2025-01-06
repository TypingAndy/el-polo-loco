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
    mo.drawFrame(this.ctx);
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
      const randomX = Math.floor(Math.random() * (2500 - 200 + 1)) + 200;

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
    }, 100);
  }

  checkCollisionsWithEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit(enemy);
        this.statusLifebar.setPercentage(this.character.energy);
      }
    });
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
      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (bottle.isColliding(enemy)) {
          this.throwableObjects.splice(bottleIndex, 1); // Flasche entfernen
  
          if (enemy instanceof Endboss) {
            enemy.health -= 1; // Gesundheit reduzieren
            console.log(`Endboss getroffen! Verbleibende Gesundheit: ${enemy.health}`);
  
            if (enemy.health > 0) {
              enemy.playHurtAnimation(); // Hurt-Animation abspielen
            } else if (enemy.health <= 0) {
              enemy.animateDefeat(); // Besiegt-Animation abspielen
            }
          } else {
            this.level.enemies.splice(enemyIndex, 1); // Entferne normalen Feind
            console.log("Flasche hat einen Feind getroffen!");
          }
        }
      });
    });
  }
  
  
  
}
