class Chick extends MovableObject {
  width = 43;
  height = 43;
  hitBoxWidth = 35;
  hitBoxHeight = 35;
  hitBoxX = 5;
  hitBoxY = 5;
  color = 'purple'
  y = 373;


  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  constructor(x) {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/2_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = x;
    this.speed = 0.15 + Math.random() *0.5;

    this.animateChick();
  }

  animateChick() {
    setInterval(() => {
      this.moveLeft();
    }, 1000/60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }
}
