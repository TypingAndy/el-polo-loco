class ThrowableObject extends MovableObject {



  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = 100;
    this.y = 100;
    this.height = 50 ;
    this.width = 40;
    this.throw(x, y);
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
