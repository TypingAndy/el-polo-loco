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

  setBottleAmount(bottlesCollected) {
    this.bottlesCollected = bottlesCollected; // Aktualisiere die Anzahl der eingesammelten Münzen
    let path = this.IMAGES_BOTTLEBAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    // Berechne den Prozentsatz der eingesammelten Münzen
    let percentageCollected = (this.bottlesCollected / this.levelBottleAmount) * 100;

    // Bestimme das Statusbar-Level basierend auf dem Prozentsatz
    if (percentageCollected >= 100) {
      return 5; // Alle Münzen eingesammelt
    } else if (percentageCollected >= 80) {
      return 4; // Mehr als 80% gesammelt
    } else if (percentageCollected >= 60) {
      return 3; // Mehr als 60% gesammelt
    } else if (percentageCollected >= 40) {
      return 2; // Mehr als 40% gesammelt
    } else if (percentageCollected >= 20) {
      return 1; // Mehr als 20% gesammelt
    } else {
      return 0; // Weniger als 20% gesammelt
    }
  }
}