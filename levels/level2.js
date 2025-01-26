let level2;
function initLevel2() {
  level2 = new Level(
    [
      new ChickJumping((x = 320), 1, 10),
      new Chicken(700, 1),
      new ChickJumping((x = 940), 1, 16),
      new Chicken(1250, 1),
      new Chicken(1200, 1),
      new ChickJumping((x = 1320), 1, 12),
      new Chicken(1600, 1),
      new Chicken(1700, 1),
      new Chicken(1750, 1),
      new Chicken(1850, 1),

      new ChickJumping((x = 1900), 1, 19),
      new ChickJumping((x = 2100), 1, 5),
   

      new Chicken(2500, 1),
      new Chicken(2600, 1),
      new Chicken(2700, 1),
    ],

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
      new BackgroundObjects("img/5_background/layers/air.png", 719 * 8, 0.05),
      new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", 719 * 8, 0.3),
      new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", 719 * 8, 0.7),
      new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", 719 * 8, 1),
    ],

    [
      new Coin(200, 180),
      new Coin(250, 160),
      new Coin(300, 160),
      new Coin(350, 180),

      new Coin(800, 340),
      new Coin(850, 340),
      new Coin(950, 340),
      new Coin(1000, 340),

      new Coin(1200, 130),
      new Coin(1250, 110),
      new Coin(1300, 110),
      new Coin(1350, 130),

      new Coin(1950, 300),
      new Coin(2000, 260),
      new Coin(2050, 220),

      new Coin(2500, 340),
      new Coin(2550, 340),
      new Coin(2600, 340),
    ],

    [
      new CollectableBottle(250),
      new CollectableBottle(400),
      new CollectableBottle(800),
      new CollectableBottle(1050),
      new CollectableBottle(1400),
      new CollectableBottle(2000),
      new CollectableBottle(2250),
      new CollectableBottle(2350),
    ],

    //bottle Placeholder "collectedBottles"
    [],
    //bottle Placeholder "thrownBottles"
    []
  );
}
