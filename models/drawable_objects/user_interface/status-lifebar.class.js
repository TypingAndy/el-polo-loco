class StatusLifebar extends DrawableObject {
  IMAGES_LIFEBAR = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES_LIFEBAR);
    this.x = 0;
    this.y = 0;
    this.width = 150;
    this.height = 45;
    this.setPercentageOfLifeBar(100);
  }

  /**
   * Sets the percentage of the life bar and updates the life bar image.
   * @param {number} percentage - The percentage of the life bar to set.
   */
  setPercentageOfLifeBar(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_LIFEBAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the image index for the life bar based on the percentage.
   * @returns {number} The index corresponding to the current life bar percentage.
   */
  resolveImageIndex() {
    if (this.percentage >= 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
