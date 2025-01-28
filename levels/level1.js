let level1;
function initLevel1() {
  level1 = new Level(
    [ new ChickJumping((x = 1050), 1000, 10),   new Chicken(700, 1), new ChickJumping((x = 620), 1000, 10),  new Chicken(1400, 1),new ChickJumping((x = 1440), 1000, 18)],

    [new Clouds()],

    [
      new BackgroundObjects("img/5_background/layers/air.png", -719, 0.05),
      new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", -719, 0.3),
      new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", -719, 0.7),
      new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", -719, 1),
      new BackgroundObjects("img/5_background/layers/air.png", 0, 0.05),
      new BackgroundObjects("img/5_background/layers/3_third_layer/1.png", 0, 0.3),
      new BackgroundObjects("img/5_background/layers/2_second_layer/1.png", 0, 2),
      new BackgroundObjects("img/5_background/layers/1_first_layer/1.png", 0, 1),
      new BackgroundObjects("img/5_background/layers/air.png", 719, 0.05),
      new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", 719, 0.3),
      new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", 719, 0.7),
      new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", 719, 1),
      new BackgroundObjects("img/5_background/layers/air.png", 719 * 2, 0.05),
      new BackgroundObjects("img/5_background/layers/3_third_layer/1.png", 719 * 2, 0.3),
      new BackgroundObjects("img/5_background/layers/2_second_layer/1.png", 719 * 2, 0.7),
      new BackgroundObjects("img/5_background/layers/1_first_layer/1.png", 719 * 2, 1),
      new BackgroundObjects("img/5_background/layers/air.png", 719 * 3, 0.05),
      new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", 719 * 3, 0.3),
      new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", 719 * 3, 0.7),
      new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", 719 * 3, 1),
      new BackgroundObjects("img/5_background/layers/air.png", 719 * 4, 0.05),
      new BackgroundObjects("img/5_background/layers/3_third_layer/1.png", 719 * 4, 0.3),
      new BackgroundObjects("img/5_background/layers/2_second_layer/1.png", 719 * 4, 0.7),
      new BackgroundObjects("img/5_background/layers/1_first_layer/1.png", 719 * 4, 1),
      new BackgroundObjects("img/5_background/layers/air.png", 719 * 5, 0.05),
      new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", 719 * 5, 0.3),
      new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", 719 * 5, 0.7),
      new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", 719 * 5, 1),
      new BackgroundObjects("img/5_background/layers/air.png", 719 * 6, 0.05),
      new BackgroundObjects("img/5_background/layers/3_third_layer/1.png", 719 * 6, 0.3),
      new BackgroundObjects("img/5_background/layers/2_second_layer/1.png", 719 * 6, 0.7),
      new BackgroundObjects("img/5_background/layers/1_first_layer/1.png", 719 * 6, 1),
      new BackgroundObjects("img/5_background/layers/air.png", 719 * 7, 0.05),
      new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", 719 * 7, 0.3),
      new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", 719 * 7, 0.7),
      new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", 719 * 7, 1),
    ],

    [new Coin(200, 110), new Coin(250, 110), new Coin(500, 110), new Coin(550, 90), new Coin(600, 90), new Coin(650, 110), new Coin(1000, 50),new Coin(1000, 100),new Coin(1000, 150)
      ,new Coin(1300, 340),new Coin(1350, 340),new Coin(1450, 340),new Coin(1500, 340)
    ],

    [
      new CollectableBottle(0),
      new CollectableBottle(0),
      new CollectableBottle(0),
      new CollectableBottle(0),
      new CollectableBottle(0),
      new CollectableBottle(0),
      new CollectableBottle(0),
      new CollectableBottle(0),
    ],

 
    [],

    []
  );
}
