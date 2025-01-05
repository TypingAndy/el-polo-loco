class MovableObject extends DrawableObject {
  speed = 10;
  speedY = 0;
  acceleration = 2.5;
  otherDirection = false;
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

  jump() {
    this.speedY = 30;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
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

  //hier wird eine überlappung der beiden hitboxen geprüft, alle abfragen müssen eintreffen um eine true wert zurückzugben
  isColliding(object) {
    return (
      this.x + this.hitBoxX + this.hitBoxWidth > object.x + object.hitBoxX && // Rechte Kante von this überlappt linke Kante von object
      this.y + this.hitBoxY + this.hitBoxHeight > object.y + object.hitBoxY && // Untere Kante von this überlappt obere Kante von object
      this.x + this.hitBoxX < object.x + object.hitBoxX + object.hitBoxWidth && // Linke Kante von this überlappt rechte Kante von object
      this.y + this.hitBoxY < object.y + object.hitBoxY + object.hitBoxHeight // Obere Kante von this überlappt untere Kante von object
    );
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
      this.collect_coin_sound.play();
    }
  }

  collectBottle(bottle) {
    const index = this.world.level.bottles.indexOf(bottle);
    if (index !== -1) {
      this.world.level.bottles.splice(index, 1);
      this.collect_bottle_sound.currentTime = 0;
      this.collect_bottle_sound.play();
    }
  }
}
