class Character extends MovableObject {
  height = 250;
  width = 100;
  hitBoxWidth = 72;
  hitBoxHeight = 145;
  hitBoxX = 12;
  hitBoxY = 95;
  color = "green";

  y = 180;

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONGIDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = ["img/2_character_pepe/4_hurt/H-41.png", "img/2_character_pepe/4_hurt/H-42.png", "img/2_character_pepe/4_hurt/H-43.png"];

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONGIDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animateCharacter();

    setInterval(() => {
      this.correctYPosition();
    }, 10);
  }

  moveCharacter() {
    if (this.ableMoveRight()) {
      this.moveRight();
      this.otherDirection = false;
      this.playWalkingSound();
    } else if (this.ableMoveLeft()) {
      this.moveLeft();
      this.otherDirection = true;
      this.playWalkingSound();
    } else {
      this.stopWalkingSound();
    }
    if (this.ableToJump()) {
      this.jump(25, 1);
    }
    this.world.camera_x = -this.x + 100;
  }

  ableMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  ableMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  playWalkingSound() {
    if (!soundManager.isSoundPlaying("walking")) {
      soundManager.playSound("walking", 1, true);
    }
  }

  stopWalkingSound() {
    if (soundManager.isSoundPlaying("walking")) {
      soundManager.stopSound("walking");
    }
  }

  ableToJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  playJumpAnimation() {
    if (this.shouldPlayJumpAnimation()) {
      if (this.currentAnimation !== "jump") {
        this.currentImage = 0;
        this.currentAnimation = "jump";
      }
      this.playAnimation(this.IMAGES_JUMPING);
    } else {
      if (this.currentAnimation === "jump") {
        this.currentAnimation = null;
      }
    }
  }

  playDieAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    }
  }

  walkingAnimation() {
    if ((this.world.keyboard.RIGHT && !this.isAboveGround() && !this.isHurt() && !this.isDead()) || (this.world.keyboard.LEFT && !this.isAboveGround() && !this.isHurt() && !this.isDead())) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  shouldPlayJumpAnimation() {
    return (this.isAboveGround() && !this.isHurt() && !this.isDead()) || (this.speedY > 0 && !this.isHurt() && !this.isDead());
  }

  checkIfCharIdle() {
    return !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround() && !this.isDead();
  }

  checkIfCharLongIdle(idleTime) {
    idleTime;
    return !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround() && !this.isDead() && idleTime > 20;
  }

  checkIfShouldPlayIdleAnimation(idleTime) {
    if (this.checkIfCharLongIdle(idleTime)) {
      this.playLongIdleAnimation();
    } else {
      this.stopLongIdleAnimation();
    }
  }

  playLongIdleAnimation() {
    this.playAnimation(this.IMAGES_LONGIDLE);
    soundManager.playSound("snoring", 0.5, true);
  }

  stopLongIdleAnimation() {
    soundManager.stopSound("snoring");
  }

  animateCharacter() {
    let isPlayingHurtSound = false;
    let idleTime = 0;
  
    this.moveCharacterInterval = setInterval(() => this.moveCharacter(), 50);
    this.walkingAnimationInterval = setInterval(() => this.walkingAnimation(), 50);
    this.playJumpAnimationInterval = setInterval(() => this.playJumpAnimation(), 110);
  
    this.playHurtAnimationInterval = setInterval(() => {
      if (this.isHurt() && !this.isDead()) {
        this.playAnimation(this.IMAGES_HURT);
        if (!isPlayingHurtSound) {
          let hurtSounds = [soundManager.sounds.hurt1, soundManager.sounds.hurt2, soundManager.sounds.hurt3, soundManager.sounds.hurt4, soundManager.sounds.hurt5];
          let randomSound = hurtSounds[Math.floor(Math.random() * hurtSounds.length)];
          randomSound.volume = 0.3;
          randomSound.play();
          isPlayingHurtSound = true;
        }
      } else {
        isPlayingHurtSound = false;
      }
    }, 30);
  
    this.playDieAnimationInterval = setInterval(() => this.playDieAnimation(), 250);
  
    this.playIdleAnimationInterval = setInterval(() => {
      if (this.checkIfCharIdle()) {
        this.playAnimation(this.IMAGES_IDLE);
        idleTime++;
      }
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.isAboveGround()) {
        idleTime = 0;
      }
    }, 300);
  
    this.playLongIdleAnimationInterval = setInterval(() => this.checkIfShouldPlayIdleAnimation(idleTime), 300);
  }
  

  correctYPosition() {
    let groundY = 180;
    if (this.y > groundY) {
      this.y = groundY;
    }
  }

  positionXBackToStart() {
    let startPoint = 40;
    if (this.x > startPoint) {
      this.x = startPoint;
    }
  }
}
