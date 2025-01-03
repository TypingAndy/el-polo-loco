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
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

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
    this.level.clouds.forEach((cloud) => {
      cloud.move();
      this.addToMap(cloud);
    });

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

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.THROW) {
      let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 60);
      this.throwableObjects.push(bottle);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusLifebar.setPercentage(this.character.energy);
      }
    });
  }
}
