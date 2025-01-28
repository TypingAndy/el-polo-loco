class CollisionChecker {
  constructor(world, level, character, statusCoinbar, statusBottlebar, throwableObjects) {
    this.world = world;
    this.level = level;
    this.character = character;
    this.statusCoinbar = statusCoinbar;
    this.statusBottlebar = statusBottlebar;
    this.throwableObjects = throwableObjects;
  }

  /**
   * Checks for collisions between the character and enemies, and handles the collisions.
   */
  checkCollisionsWithEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isDead) this.handleEnemyCollision(enemy);
    });
  }

  /**
   * Handles the collision between the character and an enemy.
   * @param {object} enemy - The enemy involved in the collision.
   */
  handleEnemyCollision(enemy) {
    const collisionType = this.character.isColliding(enemy);

    if (collisionType === "top" && this.world.checkCharacterFallingDown()) {
      this.world.jumpOnEnemyTop(enemy);
    } else if (collisionType) {
      this.world.characterGetHitByEnemy(enemy);
    }
  }

  /**
   * Checks for collisions between the character and coins, and handles the collisions.
   */
  checkCollisionsWithCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) this.handleCoinCollision(coin);
    });
  }

  /**
   * Handles the collision between the character and a coin by collecting it and updating the coin count.
   * @param {object} coin - The coin involved in the collision.
   */
  handleCoinCollision(coin) {
    this.character.collectCoin(coin);
    this.character.coinAmount += 1;
    this.statusCoinbar.setCoinAmount(this.character.coinAmount);
  }

  /**
   * Checks for collisions between the character and bottles, and handles the collisions.
   */
  checkCollisionsWithBottles() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) this.handleBottleCollision(bottle);
    });
  }

  /**
   * Handles the collision between the character and a bottle by collecting it and updating the bottle count.
   * @param {object} bottle - The bottle involved in the collision.
   */
  handleBottleCollision(bottle) {
    this.character.collectBottle(bottle);
    this.level.collectedBottles.push("bottleToThrow");
    this.statusBottlebar.setBottleAmount(this.level.collectedBottles.length);
  }

  /**
   * Checks for collisions between throwable bottles and enemies, and handles the collisions.
   */
  checkCollisionBottleWithEnemies() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) this.handleBottleEnemyCollision(bottle, bottleIndex, enemy);
      });
    });
  }

  /**
   * Handles the collision between a bottle and an enemy.
   * Plays the bottle smash sound, applies damage to the enemy, and changes the bottle to a broken one.
   * @param {object} bottle - The bottle involved in the collision.
   * @param {number} bottleIndex - The index of the bottle in the throwable objects array.
   * @param {object} enemy - The enemy involved in the collision.
   */
  handleBottleEnemyCollision(bottle, bottleIndex, enemy) {
    soundManager.stopSound("bottleSmash");
    soundManager.playSound("bottleSmash");

    if (enemy instanceof Endboss) {
      this.handleEndbossHit(enemy);
    } else {
      enemy.enemieHealthMinusOne();
    }

    this.world.changeThrownToBrokenBottle(bottle, bottleIndex);
  }

  /**
   * Handles the collision with the endboss and applies damage.
   * Triggers the alert animation if health is 3, and hurt/defeat animations accordingly.
   * @param {object} endboss - The endboss that was hit.
   */
  handleEndbossHit(endboss) {
    endboss.health -= 1;

    if (endboss.health === 3 && !endboss.isAlert) {
      endboss.playAlertAnimation();
    }

    if (endboss.health > 0) {
      endboss.playHurtAnimation();
    } else {
      endboss.animateDefeat();
    }
  }
}
