class StatusCoinbar extends DrawableObject {
  IMAGES_COINBAR = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  levelCoinAmount; //der muss auf level höhe, im game.js, auch für start des games
  coinsCollected;

  constructor() {
    super();
    this.loadImages(this.IMAGES_COINBAR);
    this.x = 0;
    this.y = 36;
    this.width = 150;
    this.height = 45;
    this.setCoinAmount(0); // Initiale Anzeige
  }

/**
 * Sets the amount of collected coins and updates the coin bar image.
 * @param {number} coinsCollected - The number of coins collected.
 */
setCoinAmount(coinsCollected) {
  this.coinsCollected = coinsCollected;
  let path = this.IMAGES_COINBAR[this.collectedCoinAmountIndex()];
  this.img = this.imageCache[path];
}

/**
 * Calculates the index for the collected coin amount based on the percentage of coins collected.
 * @returns {number} The index corresponding to the current collected coin percentage.
 */
collectedCoinAmountIndex() {
  let percentageCollected = (this.coinsCollected / this.levelCoinAmount) * 100;

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
