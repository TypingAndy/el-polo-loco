class World {
  character = new Character();
  statusLifebar = new StatusLifebar();
  statusCoinbar = new StatusCoinbar();
  statusBottlebar = new StatusBottlebar();

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
  }

  /**
   * Sets the world reference for the character to the current world instance.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Draws the game world, including background, clouds, enemies, coins, collectable bottles,
   * thrown bottles, user interface, and the character.
   * It also manages the camera translation and calls the repeatDrawMethod for continuous drawing.
   */
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

  /**
   * Clears the entire canvas.
   */
  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the character by adding it to the map.
   */
  drawCharacter() {
    this.addToMap(this.character);
  }

  /**
   * Draws all enemies by iterating over the level's enemies and adding each to the map.
   */
  drawEnemies() {
    this.level.enemies.forEach((enemie) => {
      this.addToMap(enemie);
    });
  }

  /**
   * Draws all coins by iterating over the level's coins and adding each to the map.
   */
  drawCoins() {
    this.level.coins.forEach((coins) => {
      this.addToMap(coins);
    });
  }

  /**
   * Draws all collectable bottles by iterating over the level's bottles and adding each to the map.
   */
  drawCollectableBottles() {
    this.level.bottles.forEach((collectableBottle) => {
      this.addToMap(collectableBottle);
    });
  }

  /**
   * Draws all thrown bottles by adding the throwable objects to the map.
   */
  drawThrownBottles() {
    this.addObjectsToMap(this.throwableObjects);
  }

  /**
   * Draws all clouds by moving them and adding each to the map.
   */
  drawClouds() {
    this.level.clouds.forEach((cloud) => {
      cloud.move();
      this.addToMap(cloud);
    });
  }

  /**
   * Draws the background objects by adding them to the map.
   */
  drawBackground() {
    this.addObjectsToMap(this.level.backgroundObjects);
  }

  /**
   * Draws the user interface elements (lifebar, coinbar, bottlebar) on the canvas.
   * Adjusts the translation for camera movement before drawing.
   */
  drawUserInterface() {
    this.context.translate(-this.camera_x, 0);
    this.addToMap(this.statusLifebar);
    this.addToMap(this.statusCoinbar);
    this.addToMap(this.statusBottlebar);

    this.context.translate(this.camera_x, 0);
  }

  /**
   * Requests the next frame to continuously redraw the game world.
   */
  repeatDrawMethod() {
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  /**
   * Adds a list of objects to the map.
   * @param {Array} objects - An array of objects to add to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds an object to the map, flipping the image if the object is facing the other direction.
   * @param {object} mo - The object to add to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.context);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips an image horizontally by scaling the context and adjusting the object's position.
   * @param {object} mo - The object whose image is to be flipped.
   */
  flipImage(mo) {
    this.context.save();
    this.context.translate(mo.width, 0);
    this.context.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Reverts the flip effect on the image and restores the canvas context.
   * @param {object} mo - The object whose image flip is to be reverted.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.context.restore();
  }

  /**
   * Respawns bottles if there are fewer than 7 in the level.
   * Adds a new collectable bottle at a random position within the defined range.
   */
  respawnBottles() {
    if (this.level.bottles.length < 7) {
      let randomX = Math.floor(Math.random() * (2500 - 200 + 1)) + 200;
      this.level.bottles.push(new CollectableBottle(randomX));
    }
  }

  /**
   * Sets up an interval to check for thrown objects periodically.
   * Calls the checkThrowObjects method every 300 milliseconds.
   */
  throwBottleInterval() {
    setInterval(() => {
      this.checkThrowObjects();
    }, 300);
  }

  /**
   * Checks if the throw action is triggered and creates a new throwable bottle.
   * Adds the created bottle to the list of throwable objects.
   */
  checkThrowObjects() {
    if (this.keyboard.THROW) {
      let bottle = new ThrowableObject(this.character.x + 65, this.character.y + 100);
      this.throwableObjects.push(bottle);
    }
  }

  /**
   * Starts an interval that periodically respawns bottles every 5 seconds.
   */
  startBottleRespawnInterval() {
    setInterval(() => {
      this.respawnBottles();
    }, 5000);
  }

  /**
   * Updates the bottle bar to reflect the current number of collected bottles.
   */
  updateBottleBar() {
    this.statusBottlebar.setBottleAmount(world.level.collectedBottles.length);
  }

  /**
   * Starts an interval that periodically updates the bottle bar every 100 milliseconds.
   */
  startStatusUpdateInterval() {
    setInterval(() => {
      this.updateBottleBar();
    }, 100);
  }

  /**
   * Starts an interval that checks for collisions with enemies, coins, and bottles every 10 milliseconds.
   */
  collisionDetectionSpeed() {
    setInterval(() => {
      this.collisionChecker.checkCollisionsWithEnemies();
      this.collisionChecker.checkCollisionsWithCoins();
      this.collisionChecker.checkCollisionsWithBottles();
      this.collisionChecker.checkCollisionBottleWithEnemies();
    }, 10);
  }

  /**
   * Checks if the character is falling down based on its vertical speed.
   * @returns {boolean} True if the character is falling down, false otherwise.
   */
  checkCharacterFallingDown() {
    return (this.character.fallingDown = this.character.speedY < 0);
  }

  /**
   * Makes the character jump on top of an enemy, with varying jump height depending on the space key.
   * Reduces the enemy's health by one.
   * @param {object} enemy - The enemy the character is jumping on.
   */
  jumpOnEnemyTop(enemy) {
    if (this.keyboard.SPACE) {
      this.character.jump(30, 0);
    } else {
      this.character.jump(18, 0);
    }
    enemy.enemieHealthMinusOne();
  }

  /**
   * Handles the character getting hit by an enemy, reducing the character's health.
   * Updates the lifebar to reflect the current energy.
   * @param {object} enemy - The enemy that hit the character.
   */
  characterGetHitByEnemy(enemy) {
    this.character.hit(enemy);
    this.statusLifebar.setPercentageOfLifeBar(this.character.energy);
  }

  /**
   * Changes a thrown bottle to a broken bottle and updates the throwable objects array.
   * @param {object} bottle - The bottle that was thrown.
   * @param {number} bottleIndex - The index of the thrown bottle in the throwable objects array.
   */
  changeThrownToBrokenBottle(bottle, bottleIndex) {
    let brokenBottle = new BrokenBottle(bottle.x, bottle.y);
    this.throwableObjects.splice(bottleIndex, 1);
    this.throwableObjects.push(brokenBottle);
  }
}
