let level1;
function initLevel1() {
  level1 = new Level(
    [new Chick((x = 400), 1), new ChickJumping((x=300),(health = 1), (jumpHeight = 16)), new ChickJumping((x=200),(health = 1), (jumpHeight = 10))],

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
      new Coin(450, 110),
      new Coin(500, 110),
      new Coin(550, 110),
      new Coin(600, 110),
      new Coin(650, 110),
    ],

    [
      new CollectableBottle(550),
      new CollectableBottle(500),
      new CollectableBottle(1000),
      new CollectableBottle(1250),
      new CollectableBottle(1500),
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
