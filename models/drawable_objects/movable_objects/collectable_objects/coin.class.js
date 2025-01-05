class Coin extends MovableObject {
  width = 130;
  height = 130;
  hitBoxWidth = 40;
  hitBoxHeight = 40;
  hitBoxX = 44;
  hitBoxY = 44;
  color = 'yellow'

IMAGES_COIN = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];

  constructor(x, y) {
    super();
    this.loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COIN);
    this.x = x;
    this.y = y;
    this.animateCoin();
  }

  animateCoin() {

    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 500);
  }

}
