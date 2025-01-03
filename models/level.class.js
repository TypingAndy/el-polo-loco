class Level {
  enemies;
  coins;
  bottles;
  clouds;
  backgroundObjects;
  level_end_x = 4300;

  constructor(enemies, clouds, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.coins = coins;
    this.bottles = bottles;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
