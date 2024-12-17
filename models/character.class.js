class Character extends MovableObject {
  x = 45;
  y = 170;
  speed = 5;
  width = 90;
  height = 260;
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  world;
  walking_sound = new Audio("audio/run.wav");

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.applyGravity();
    this.animate();

  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;

        if (!this.walking_sound.isPlaying) {
          this.walking_sound.loop = true;
          this.walking_sound.play();
          this.walking_sound.isPlaying = true;
        }
      } else if (this.world.keyboard.LEFT && this.x > 0) {
        this.x -= this.speed;
        this.otherDirection = true;

        if (!this.walking_sound.isPlaying) {
          this.walking_sound.loop = true;
          this.walking_sound.play();
          this.walking_sound.isPlaying = true;
        }
      } else {
        if (this.walking_sound.isPlaying) {
          this.walking_sound.pause();
          this.walking_sound.isPlaying = false;
        }
      }

      this.world.camera_x = -this.x + 100;
    }, 50);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }

  jump() {}
}
