class CollisionChecker {
  level;
  character;
  world;
  constructor(world, level, character, statusCoinbar, statusBottlebar, throwableObjects) {
    this.level = level;
    this.character = character;
    this.world = world;
    this.statusCoinbar = statusCoinbar;
    this.statusBottlebar = statusBottlebar;
    this.throwableObjects = throwableObjects;
  }

  checkCollisionsWithEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isDead) return;
      let collisionType = this.character.isColliding(enemy);
      if (collisionType === "top" && this.world.checkCharacterFallingDown()) {
        this.world.jumpOnEnemyTop(enemy);
      } else if (collisionType) {
        this.world.characterGetHitByEnemy(enemy);
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

        this.level.collectedBottles.push("bottleToThrow");
        this.statusBottlebar.setBottleAmount(this.level.collectedBottles.length);
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
              this.world.hurtEndbossAnimation(enemy);
            } else {
              enemy.animateDefeat();
            }
          } else {
            enemy.enemieHealthMinusOne();
          }

          this.world.changeThrownToBrokenBottle(bottle, bottleIndex);
        }
      });
    });
  }
}
