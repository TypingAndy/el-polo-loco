class DrawableObject {
  img;
  imageCache = {};
  x = 0;
  y = 0;
  width = 0;
  height = 0;

/**
 * Loads an image from the given path and stores it in the img property.
 * @param {string} path - The path to the image to load.
 */
loadImage(path) {
  this.img = new Image();
  this.img.src = path;
}

/**
 * Loads multiple images from an array of paths and stores them in the imageCache.
 * @param {Array<string>} arr - An array of image paths to load.
 */
loadImages(arr) {
  arr.forEach((path) => {
    let img = new Image();
    img.src = path;
    this.imageCache[path] = img;
  });
}

/**
 * Draws the loaded image on the given context at the specified position and size.
 * @param {CanvasRenderingContext2D} context - The canvas context to draw the image on.
 */
draw(context) {
  if (this.img) {
    context.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

}
