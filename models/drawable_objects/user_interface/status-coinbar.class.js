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
    let path = this.IMAGES_COINBAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    // Berechne den Prozentsatz der eingesammelten Münzen
    let percentageCollected = (this.coinsCollected / this.levelCoinAmount) * 100;

    // Bestimme das Statusbar-Level basierend auf dem Prozentsatz
    if (percentageCollected >= 100) {
      level1.enemies.push(new Endboss(3000, 5))
      setInterval(() => {
        level1.enemies.push(new Chicken(3000, 1))
      }, 3000);
      setInterval(() => {
        level1.enemies.push(new Chick(3090, 1))
      }, 2700);
  
      return 5; // Alle Münzen eingesammelt
    } else if (percentageCollected >= 80) {
      level1.enemies.push(new Chick(3800, 1))
      level1.enemies.push(new Chicken(3900, 1))
      level1.enemies.push(new Chick(4200, 1))
      level1.enemies.push(new Chick(4500, 1))
      return 4; // Mehr als 80% gesammelt
    } else if (percentageCollected >= 60) {
      level1.enemies.push(new Chick(3500, 1))
      level1.enemies.push(new Chicken(3600, 1))
      level1.enemies.push(new Chick(3700, 1))
      return 3; // Mehr als 60% gesammelt
    } else if (percentageCollected >= 40) {
      level1.enemies.push(new Chick(3500, 1))
      level1.enemies.push(new Chicken(3600, 1))
      return 2; // Mehr als 40% gesammelt
    } else if (percentageCollected >= 20) {
      level1.enemies.push(new Chick(3500, 1))
      return 1; // Mehr als 20% gesammelt
    } else {
      return 0; // Weniger als 20% gesammelt
    }
  }
}
