class Chicken extends MovableObject {
  width = 60;
  height = 60;
  hitBoxWidth = 50;
  hitBoxHeight = 50;
  hitBoxX = 5;
  hitBoxY = 5;
  color = 'orange'
  y = 362;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/2_w.png");
    this.loadImages(this.IMAGES_WALKING);

    this.x = 200 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.5;

    this.animateChicken();
  }

  animateChicken() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 150);
  }
}
