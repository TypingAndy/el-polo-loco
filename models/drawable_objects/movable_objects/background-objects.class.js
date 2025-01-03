class BackgroundObjects extends MovableObject {
  width = 720;
  height = 480;

  constructor(imagePath, x, speed) {
    super().loadImage(imagePath);
    this.y = 0;
    this.x = x;
  }
}
