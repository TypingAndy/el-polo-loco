class StatusBottlebar extends DrawableObject {
  IMAGES_BOTTLEBAR = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  levelBottleAmount = level1.bottles.length;

  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLEBAR);
    this.x = 0;
    this.y = 72;
    this.width = 150;
    this.height = 45;
    this.setBottleAmount(0);
  }

/**
 * Sets the amount of collected bottles and updates the bottle bar image.
 * @param {number} bottlesCollected - The number of bottles collected.
 */
setBottleAmount(bottlesCollected) {
  this.bottlesCollected = bottlesCollected;
  let path = this.IMAGES_BOTTLEBAR[this.collectedBottleAmountIndex()];
  this.img = this.imageCache[path];
}


/**
 * Calculates the index for the collected bottle amount based on the percentage of bottles collected.
 * @returns {number} The index corresponding to the current collected bottle percentage.
 */
collectedBottleAmountIndex() {
  let percentageCollected = (this.bottlesCollected / this.levelBottleAmount) * 100;

  if (percentageCollected >= 100) {
    return 5;
  } else if (percentageCollected >= 80) {
    return 4;
  } else if (percentageCollected >= 60) {
    return 3;
  } else if (percentageCollected >= 40) {
    return 2;
  } else if (percentageCollected >= 20) {
    return 1;
  } else {
    return 0;
  }
}

}
