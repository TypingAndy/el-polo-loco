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
  hurtInterval;

  IMAGES = {
    walking: ["img/4_enemie_boss_chicken/1_walk/G1.png", "img/4_enemie_boss_chicken/1_walk/G2.png", "img/4_enemie_boss_chicken/1_walk/G3.png", "img/4_enemie_boss_chicken/1_walk/G4.png"],
    alert: [
      "img/4_enemie_boss_chicken/2_alert/G5.png",
      "img/4_enemie_boss_chicken/2_alert/G6.png",
      "img/4_enemie_boss_chicken/2_alert/G7.png",
      "img/4_enemie_boss_chicken/2_alert/G8.png",
      "img/4_enemie_boss_chicken/2_alert/G9.png",
      "img/4_enemie_boss_chicken/2_alert/G10.png",
      "img/4_enemie_boss_chicken/2_alert/G11.png",
      "img/4_enemie_boss_chicken/2_alert/G12.png",
    ],
    canon: [
      "img/4_enemie_boss_chicken/3_attack/G13.png",
      "img/4_enemie_boss_chicken/3_attack/G14.png",
      "img/4_enemie_boss_chicken/3_attack/G15.png",
      "img/4_enemie_boss_chicken/3_attack/G16.png",
      "img/4_enemie_boss_chicken/3_attack/G17.png",
      "img/4_enemie_boss_chicken/3_attack/G18.png",
      "img/4_enemie_boss_chicken/3_attack/G19.png",
      "img/4_enemie_boss_chicken/3_attack/G20.png",
    ],
    hurt: ["img/4_enemie_boss_chicken/4_hurt/G21.png", "img/4_enemie_boss_chicken/4_hurt/G22.png", "img/4_enemie_boss_chicken/4_hurt/G23.png"],
    defeat: ["img/4_enemie_boss_chicken/5_dead/G24.png", "img/4_enemie_boss_chicken/5_dead/G25.png", "img/4_enemie_boss_chicken/5_dead/G26.png"],
  };

  constructor(x, health, level) {
    super().loadImage(this.IMAGES.walking[0]);
    Object.keys(this.IMAGES).forEach((type) => this.loadImages(this.IMAGES[type]));
    this.x = x;
    this.health = health;
    this.level = level;
    this.isDefeated = false;
    this.isHurt = false;
    this.isAlert = false;
    this.isPlayingCanon = false;
    this.startWalkingAnimation();
    this.startCanonAnimation();
  }

  startWalkingAnimation() {
    this.direction = 1;
    this.startX = this.x;
    this.maxDistance = 300;
    this.changeDirectionChance = 0.05;
    this.speed = 5;
    this.walkingInterval = setInterval(() => {
      if (!this.isAlert && !this.isHurt && !this.isPlayingCanon) {
        this.playAnimation(this.IMAGES.walking);
        this.switchBossSpeed();
      }
    }, 150);
  }

  switchBossSpeed() {
    if (this.x >= this.startX + this.maxDistance || this.x <= this.startX) {
      this.direction *= -1;
      this.speed = this.getRandomSpeed();
    }
    if (Math.random() < this.changeDirectionChance) {
      this.direction *= -1;
      this.speed = this.getRandomSpeed();
    }
    this.x += this.direction * this.speed;
  }

  getRandomSpeed() {
    return Math.floor(Math.random() * 8) + 6;
  }

  startCanonAnimation() {
    // Wiederholte Überprüfung, ob die Canon-Aktion starten soll
    this.canonInterval = setInterval(() => {
      if (this.shouldStartCanonAction()) {
        this.startCanonAction();
      }
    }, this.getCanonAnimationDelay());
  }

  // Überprüft, ob die Canon-Aktion gestartet werden soll
  shouldStartCanonAction() {
    return this.health <= 3 && !this.isDefeated;
  }

  // Startet die Canon-Aktion
  startCanonAction() {
    this.isPlayingCanon = true;
    this.stopWalkingAnimation();
    this.shootChickCanon();
    this.playCanonAnimation();
  }

  // Berechnet die Verzögerung für die Canon-Aktion basierend auf der Animation
  getCanonAnimationDelay() {
    return 5000 + this.IMAGES.canon.length * 200;
  }

  // Führt die Canon-Animation aus
  playCanonAnimation() {
    let canonFrame = 0;

    const canonAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES.canon);
      canonFrame++;

      // Beendet die Animation nach dem letzten Frame
      if (canonFrame >= this.IMAGES.canon.length) {
        clearInterval(canonAnimationInterval);
        this.isPlayingCanon = false;
        this.resumeAnimations();
      }
    }, 200);

    // Stellt sicher, dass das Intervall gestoppt wird
    this.stopCanonInterval(canonAnimationInterval);
  }

  // Schießt Chick-Canons mit einer Verzögerung
  shootChickCanon() {
    console.log(this.level);
    
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const chickCanon = new ChickCanon(this.x, 1);
          this.level.enemies.push(chickCanon); // Füge das Objekt zur Spielwelt hinzu
        }, i * 300); // 300ms Abstand zwischen jedem Schuss
      }
    }, 1200); // 1,2 Sekunden Verzögerung vor dem Schießen
  }

  // Optionale Methode, falls du Intervall-Management brauchst
  stopCanonInterval(canonAnimationInterval) {
    setTimeout(() => {
      clearInterval(canonAnimationInterval);
    }, this.IMAGES.canon.length * 200); // Stoppt das Intervall nach der Animation
  }

  stopCanonInterval(canonAnimationInterval) {
    const canonDuration = this.IMAGES.canon.length * 200;
    setTimeout(() => {
      clearInterval(canonAnimationInterval);
    }, canonDuration);
  }

  playHurtAnimation() {
    if (!this.isHurt && !this.isDefeated && !this.isAlert && !this.isPlayingCanon) {
      this.isHurt = true;
      this.hurtInterval = setInterval(() => {
        this.playAnimation(this.IMAGES.hurt);
        soundManager.stopSound("endbossHurt");
        soundManager.playSound("endbossHurt");
      }, 200);
      setTimeout(() => {
        this.stopHurtAnimation();
        this.isHurt = false;
      }, 600);
    }
  }

  playAlertAnimation() {
    if (this.health <= 2 || this.isDefeated || this.isAlert) return;
    this.isAlert = true;
    this.alertInterval = setInterval(() => {
      this.health = 3;
      this.playAnimation(this.IMAGES.alert);
    }, 200);

    setTimeout(() => {
      this.stopAlertAnimation();
      this.isAlert = false;
    }, 4000);
  }

  stopAlertAnimation() {
    if (this.alertInterval) {
      clearInterval(this.alertInterval);
      this.alertInterval = null;
    }
  }

  startDefeatAnimation() {
    this.isDefeated = true;
    this.stopWalkingAnimation();

    let defeatedFrame = 0;
    this.defeatedInterval = setInterval(() => {
      this.playDefeatFrames(defeatedFrame++);
      if (defeatedFrame >= this.IMAGES.defeat.length) this.stopDefeatAnimation();
    }, 250);
  }

  animateDefeat() {
    if (!this.isDefeated) {
      this.startDefeatAnimation();
    }
  }

  playDefeatFrames(defeatedFrame) {
    this.playAnimation(this.IMAGES.defeat);
  }

  finalizeDefeatAnimation() {
    this.img = this.imageCache[this.IMAGES.defeat[this.IMAGES.defeat.length - 1]];
  }

  stopAllAnimations() {
    ["stopWalkingAnimation", "stopHurtAnimation", "stopDefeatAnimation"].forEach((method) => {
      if (this[method]) {
        this[method]();
      }
    });
  }

  stopWalkingAnimation() {
    clearInterval(this.walkingInterval);
  }

  stopDefeatAnimation() {
    clearInterval(this.defeatedInterval);
    this.finalizeDefeatAnimation();
  }

  stopHurtAnimation() {
    clearInterval(this.hurtInterval);
    this.isHurt = false;
  }

  resumeAnimations() {
    if (this.isDefeated) return;
    this.startWalkingAnimation();
    if (this.isHurt) this.playHurtAnimation();
  }
}
