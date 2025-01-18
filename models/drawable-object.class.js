class DrawableObject {
  img;
  imageCache = {};
  x = 0;

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
    context.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

//   drawFrame(context) {
//     if (
//       this instanceof Character ||
//       this instanceof Chicken ||
//       this instanceof Endboss ||
//       this instanceof Chick ||
//       this instanceof Coin ||
//       this instanceof ThrowableObject ||
//       this instanceof CollectableBottle
//     ) {
//       context.beginPath();
//       context.lineWidth = "2";
//       context.strokeStyle = this.color;
//       context.rect(this.x + this.hitBoxX, this.y + this.hitBoxY, this.hitBoxWidth, this.hitBoxHeight);
//       context.stroke();
//     }
//   }
}