class CollectableBottle extends MovableObject {
  width = 60;
  height = 60;
  bottleSide = Math.random() < 0.5 ? 1 : 2;

  constructor(x) {
    super();
    this.loadImage(`img/6_salsa_bottle/${this.bottleSide}_salsa_bottle_on_ground.png`);
    this.x = x;
    this.y = 370;
  }
}
