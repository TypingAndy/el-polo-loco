let level2;
function initLevel2() {
  level2 = new Level(
    [new Chicken((x = 400), 1)],

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

    [
      new Coin(200, 110),
      new Coin(250, 110),
      new Coin(650, 110),
      new Coin(700, 70),
      new Coin(750, 70),
      new Coin(1200, 110),
      new Coin(1250, 110),
      new Coin(1300, 110),
      new Coin(1700, 110),
      new Coin(1750, 110),
      new Coin(1800, 110),
      new Coin(2100, 70),
      new Coin(2150, 70),
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
