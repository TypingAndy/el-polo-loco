class StatusCoinbar extends DrawableObject {
  IMAGES_COINBAR = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  

  levelCoinAmount = level1.coins.length;

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
    this.spawnNewEnemies();
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

  spawnNewEnemies() {
    // Bestimme das Statusbar-Level basierend auf dem Prozentsatz
    if (this.collectedCoinAmountIndex() == 5) {
      world.level.enemies.push(new Endboss(3000, 5));
      setInterval(() => {
        world.level.enemies.push(new Chicken(3000, 1));
      }, 3000);
      setInterval(() => {
        world.level.enemies.push(new Chick(3090, 1));
      }, 2700);
    } else if (this.collectedCoinAmountIndex() == 4) {
      world.level.enemies.push(new Chick(3800, 1));
      world.level.enemies.push(new Chicken(3900, 1));
      world.level.enemies.push(new Chick(4200, 1));
      world.level.enemies.push(new Chick(4500, 1));
      return 4; // Mehr als 80% gesammelt
    } else if (this.collectedCoinAmountIndex() == 3) {
      world.level.enemies.push(new Chick(3500, 1));
      world.level.enemies.push(new Chicken(3600, 1));
      world.level.enemies.push(new Chick(3700, 1));
      return 3; // Mehr als 60% gesammelt
    } else if (this.collectedCoinAmountIndex() == 2) {
      world.level.enemies.push(new Chick(3500, 1));
      world.level.enemies.push(new Chicken(3600, 1));
      return 2; // Mehr als 40% gesammelt
    } else if (this.collectedCoinAmountIndex() == 1) {
      world.level.enemies.push(new Chick(3500, 1));
      return 1; // Mehr als 20% gesammelt
    } else {
      return 0; // Weniger als 20% gesammelt
    }
  }
}
