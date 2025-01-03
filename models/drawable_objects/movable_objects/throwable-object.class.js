class ThrowableObject extends MovableObject {
  
  IMAGES_THROWING = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_THROWING);
    this.x = 100;
    this.y = 100;
    this.height = 50;
    this.width = 40;
    this.throw(x, y);
    this.animateThrowableObject();
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
    setInterval(() => {
      this.x += 6;
    }, 20);
  }
}
