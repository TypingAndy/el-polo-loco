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

  collect_coin_sound = new Audio("audio/pickupCoin.wav");
  collect_bottle_sound = new Audio("audio/pickupBottle.wav");

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

  jump(height) {
    this.speedY = height;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.speedY = 0; // Stop vertical movement when landed
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

  isFallingDown() {
    const falling = this.speedY < 0;
    console.log("Is falling down:", falling);
    return falling;
  }

  //hier wird eine überlappung der beiden hitboxen geprüft, alle abfragen müssen eintreffen um eine true wert zurückzugben
  isColliding(object) {
    const isColliding =
      this.x + this.hitBoxX + this.hitBoxWidth > object.x + object.hitBoxX &&
      this.y + this.hitBoxY + this.hitBoxHeight > object.y + object.hitBoxY &&
      this.x + this.hitBoxX < object.x + object.hitBoxX + object.hitBoxWidth &&
      this.y + this.hitBoxY < object.y + object.hitBoxY + object.hitBoxHeight;
  
    if (!isColliding) return false; // Keine Kollision
  
    // Berechnung der Überlappung
    const overlapLeft = this.x + this.hitBoxX + this.hitBoxWidth - (object.x + object.hitBoxX);
    const overlapRight = object.x + object.hitBoxX + object.hitBoxWidth - (this.x + this.hitBoxX);
    const overlapTop = this.y + this.hitBoxY + this.hitBoxHeight - (object.y + object.hitBoxY);
    const overlapBottom = object.y + object.hitBoxY + object.hitBoxHeight - (this.y + this.hitBoxY);
  
    const smallestOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
  
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
  

  healthMinusOne() {
    if (this.health > 0) {
      this.health -= 1; // Reduziere die Health des Chicks um 1

      if (this.health === 0) {
        this.isDead = true; // Markiere das Chick als tot
        this.speed = 0; // Stoppe die Bewegung
        this.loadImage(this.IMAGE_DEAD); // Zeichne das Bild des toten Chicks

        setTimeout(() => {
          const index = this.level.enemies.indexOf(this); // Finde das Chick im Array
          if (index > -1) {
            this.level.enemies.splice(index, 1); // Entferne das Chick
          }
        }, 3000); // Entferne nach 3 Sekunden
      }
    }
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
    const index = this.world.level.coins.indexOf(coin);
    if (index !== -1) {
      this.world.level.coins.splice(index, 1);
      this.collect_coin_sound.currentTime = 0;
      this.collect_coin_sound.volume = 1;
      this.collect_coin_sound.play();
    }
  }

  collectBottle(bottle) {
    const index = this.world.level.bottles.indexOf(bottle);
    if (index !== -1) {
      this.world.level.bottles.splice(index, 1);
      this.collect_bottle_sound.currentTime = 1;
      this.collect_bottle_sound.play();
    }
  }
}
