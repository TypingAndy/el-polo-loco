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
      world.level.enemies.push(new Endboss(3000, 5))
      setInterval(() => {
        world.level.enemies.push(new Chicken(3000, 1))
      }, 3000);
      setInterval(() => {
        world.level.enemies.push(new Chick(3090, 1))
      }, 2700);
  
      return 5; // Alle Münzen eingesammelt
    } else if (percentageCollected >= 80) {
      world.level.enemies.push(new Chick(3800, 1))
      world.level.enemies.push(new Chicken(3900, 1))
      world.level.enemies.push(new Chick(4200, 1))
      world.level.enemies.push(new Chick(4500, 1))
      return 4; // Mehr als 80% gesammelt
    } else if (percentageCollected >= 60) {
      world.level.enemies.push(new Chick(3500, 1))
      world.level.enemies.push(new Chicken(3600, 1))
      world.level.enemies.push(new Chick(3700, 1))
      return 3; // Mehr als 60% gesammelt
    } else if (percentageCollected >= 40) {
      world.level.enemies.push(new Chick(3500, 1))
      world.level.enemies.push(new Chicken(3600, 1))
      return 2; // Mehr als 40% gesammelt
    } else if (percentageCollected >= 20) {
      world.level.enemies.push(new Chick(3500, 1))
      return 1; // Mehr als 20% gesammelt
    } else {
      return 0; // Weniger als 20% gesammelt
    }
  }
}
