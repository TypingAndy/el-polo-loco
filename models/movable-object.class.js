class MovableObject extends DrawableObject {
  speed = 10;
  speedY = 0;
  acceleration = 2.5;
  otherDirection = false;
  fallingDown = false;
  lastHit = 0;
  currentImage = 0;
  energy = 100;
  bottleAmount = 0;
  coinAmount = 0;

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump(height, jumpVolume) {
    this.speedY = height;
    soundManager.stopSound("jump");
    soundManager.playSound("jump", jumpVolume);
  }

  applyGravityForBottles() {
    this.applyGravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.speedY = 0;
      }

      if (typeof this.speedX !== "undefined" && this.speedX !== 0) {
        this.x += this.speedX;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }


  isColliding(object) {
    let isColliding =
      this.x + this.hitBoxX + this.hitBoxWidth > object.x + object.hitBoxX &&
      this.y + this.hitBoxY + this.hitBoxHeight > object.y + object.hitBoxY &&
      this.x + this.hitBoxX < object.x + object.hitBoxX + object.hitBoxWidth &&
      this.y + this.hitBoxY < object.y + object.hitBoxY + object.hitBoxHeight;

    if (!isColliding) return false;
    let overlaps = this.calculateOverlap(object);
    return this.getCollisionDirection(overlaps);
  }

  calculateOverlap(object) {
    let overlapLeft = this.x + this.hitBoxX + this.hitBoxWidth - (object.x + object.hitBoxX);
    let overlapRight = object.x + object.hitBoxX + object.hitBoxWidth - (this.x + this.hitBoxX);
    let overlapTop = this.y + this.hitBoxY + this.hitBoxHeight - (object.y + object.hitBoxY);
    let overlapBottom = object.y + object.hitBoxY + object.hitBoxHeight - (this.y + this.hitBoxY);

    return { overlapLeft, overlapRight, overlapTop, overlapBottom };
  }

  getCollisionDirection({ overlapLeft, overlapRight, overlapTop, overlapBottom }) {
    let smallestOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

    if (smallestOverlap === overlapTop && this.speedY < 0) {
      return "top";
    } else if (smallestOverlap === overlapBottom) {
      return "bottom";
    } else if (smallestOverlap === overlapLeft) {
      return "left";
    } else if (smallestOverlap === overlapRight) {
      return "right";
    }
  }

  enemieHealthMinusOne() {
    if (this.health > 0) {
      this.health -= 1;
      if (this.health === 0) {
        this.playSqeezwAnimation();
        this.spliceEnemyOnHit();
      }
    }
  }

  playSqeezwAnimation() {
    this.isDead = true;
    this.speed = 0;
    this.loadImage(this.IMAGE_DEAD);

    let soundName = this instanceof Chicken ? "squeezeChicken" : "squeezeChick";
    soundManager.stopSound(soundName);
    soundManager.playSound(soundName);
  }

  spliceEnemyOnHit() {
    setTimeout(() => {
      let index = world.level.enemies.indexOf(this);
      if (index > -1) {
        world.level.enemies.splice(index, 1);
      }
    }, 3000);
  }

  hit() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    if (timepassed > 1) {
      this.energy -= 19;
    }

    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  collectCoin(coin) {
    let index = this.world.level.coins.indexOf(coin);
    if (index !== -1) {
      this.world.level.coins.splice(index, 1);
      soundManager.stopSound("collectCoin");
      soundManager.playSound("collectCoin", 1);
    }
  }

  collectBottle(bottle) {
    let index = this.world.level.bottles.indexOf(bottle);
    if (index !== -1) {
      this.world.level.bottles.splice(index, 1);
      soundManager.stopSound("collectBottle", 1);
      soundManager.playSound("collectBottle", 1);
    }
  }
}
