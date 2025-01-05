class ThrowableObject extends MovableObject {
  hitBoxWidth = 20;
  hitBoxHeight = 38;
  hitBoxX = 14;
  hitBoxY = 0;
  color = "blue";

  IMAGES_THROWING = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  shooting_sound = new Audio("audio/shoot.wav");
  noBottle_sound = new Audio("audio/doh1.wav");

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");

    this.loadImages(this.IMAGES_THROWING);
    if (level1.collectedBottles.length > 0) {
      level1.collectedBottles.splice(0, 1);
      this.x = 100;
      this.y = 100;
      this.height = 50;
      this.width = 40;
      this.throw(x, y);
      this.animateThrowableObject();
    } else {
      this.noBottle_sound.volume = 0.7;
      this.noBottle_sound.play();
    }
  }

  animateThrowableObject() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_THROWING);
    }, 90);
  }

  throw(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 30;
    this.applyGravity();
    this.shooting_sound.play();

    setInterval(() => {
      this.x += 6;
    }, 20);
  }
}
