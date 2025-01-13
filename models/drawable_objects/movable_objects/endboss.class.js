class Endboss extends MovableObject {
  width = 350;
  height = 350;
  hitBoxWidth = 330;
  hitBoxHeight = 310;
  hitBoxX = 17;
  hitBoxY = 40;
  color = "black";
  y = 100;

  health;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEFEATED = [

    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
     "img/4_enemie_boss_chicken/5_dead/G26.png"
  ];



constructor(x, health) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEFEATED);
    this.x = x;
    this.health = health;
    this.isDefeated = false; // Status für Besiegt setzen
    this.isHurt = false; // Status für Hurt setzen
    this.startWalkingAnimation();
  }

  startWalkingAnimation() {
    this.walkingInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 150);
  }

  stopWalkingAnimation() {
    clearInterval(this.walkingInterval);
  }

  playHurtAnimation() {
  
    if (!this.isHurt && !this.isDefeated) {
      this.isHurt = true; // Verhindert mehrfaches Abspielen
      let hurtInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_HURT);
      }, 200);

      setTimeout(() => {
        clearInterval(hurtInterval);
        this.isHurt = false; // Nach der Hurt-Animation wieder zurücksetzen
      }, 1000); // Hurt-Animation läuft 500 ms
    }
  }

  animateDefeat() {
    if (!this.isDefeated) {
      this.startDefeatAnimation();
    }
  }
  
  startDefeatAnimation() {
    this.isDefeated = true;
    this.stopWalkingAnimation();
  
    let defeatedFrame = 0;
    let defeatedInterval = setInterval(() => {
      this.playDefeatFrames(defeatedFrame, defeatedInterval);
      defeatedFrame++;
    }, 250);
  }
  
  playDefeatFrames(defeatedFrame, defeatedInterval) {
    this.playAnimation(this.IMAGES_DEFEATED);
  
    if (defeatedFrame >= this.IMAGES_DEFEATED.length) {
      clearInterval(defeatedInterval);
      this.finalizeDefeatAnimation();
    }
  }
  
  finalizeDefeatAnimation() {
    console.log("Endboss besiegt und bleibt im letzten Bild der Animation!");
    this.img = this.imageCache[this.IMAGES_DEFEATED[this.IMAGES_DEFEATED.length - 1]];
  }
  
  
}