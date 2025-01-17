class Level {
  enemies;
  coins;
  bottles;
  clouds;
  backgroundObjects;
  collectedBottles;

  level_end_x = 4300;

  constructor(enemies, clouds, backgroundObjects, coins, bottles, collectedBottles) {
    this.enemies = enemies;
    this.coins = coins;
    this.bottles = bottles;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.collectedBottles = collectedBottles;
  }
}