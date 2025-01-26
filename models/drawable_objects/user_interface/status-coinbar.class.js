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

  setCoinAmount(coinsCollected) {
    this.coinsCollected = coinsCollected; // Aktualisiere die Anzahl der eingesammelten Münzen
    let path = this.IMAGES_COINBAR[this.collectedCoinAmountIndex()];
    this.img = this.imageCache[path];
  }

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
