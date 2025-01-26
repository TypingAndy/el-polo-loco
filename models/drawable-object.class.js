class DrawableObject {
  img;
  imageCache = {};
  x = 0;
  y = 0;
  width = 0;
  height = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(context) {
    if (this.img) {
      context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }
}
