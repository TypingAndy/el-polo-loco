class CollisionChecker {
  constructor(world, level, character, statusCoinbar, statusBottlebar, throwableObjects) {
    this.world = world;
    this.level = level;
    this.character = character;
    this.statusCoinbar = statusCoinbar;
    this.statusBottlebar = statusBottlebar;
    this.throwableObjects = throwableObjects;
  }

  checkCollisionsWithEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isDead) this.handleEnemyCollision(enemy);
    });
  }

  handleEnemyCollision(enemy) {
    const collisionType = this.character.isColliding(enemy);

    if (collisionType === "top" && this.world.checkCharacterFallingDown()) {
      this.world.jumpOnEnemyTop(enemy);
    } else if (collisionType) {
      this.world.characterGetHitByEnemy(enemy);
    }
  }

  checkCollisionsWithCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) this.handleCoinCollision(coin);
    });
  }

  handleCoinCollision(coin) {
    this.character.collectCoin(coin);
    this.character.coinAmount += 1;
    this.statusCoinbar.setCoinAmount(this.character.coinAmount);
  }

  checkCollisionsWithBottles() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) this.handleBottleCollision(bottle);
    });
  }

  handleBottleCollision(bottle) {
    this.character.collectBottle(bottle);
    this.level.collectedBottles.push("bottleToThrow");
    this.statusBottlebar.setBottleAmount(this.level.collectedBottles.length);
  }

  checkCollisionBottleWithEnemies() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) this.handleBottleEnemyCollision(bottle, bottleIndex, enemy);
      });
    });
  }

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
