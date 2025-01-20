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

  IMAGES_WALKING = ["img/4_enemie_boss_chicken/1_walk/G1.png", "img/4_enemie_boss_chicken/1_walk/G2.png", "img/4_enemie_boss_chicken/1_walk/G3.png", "img/4_enemie_boss_chicken/1_walk/G4.png"];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_CANON = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = ["img/4_enemie_boss_chicken/4_hurt/G21.png", "img/4_enemie_boss_chicken/4_hurt/G22.png", "img/4_enemie_boss_chicken/4_hurt/G23.png"];

  IMAGES_DEFEATED = ["img/4_enemie_boss_chicken/5_dead/G24.png", "img/4_enemie_boss_chicken/5_dead/G25.png", "img/4_enemie_boss_chicken/5_dead/G26.png", "img/4_enemie_boss_chicken/5_dead/G26.png"];

  constructor(x, health) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_CANON);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEFEATED);
    this.x = x;
    this.health = health;
    this.isDefeated = false; // Status für Besiegt setzen
    this.isHurt = false; // Status für Hurt setzen
    this.isAlert = false; // Status für Hurt setzen
    this.isCanon = false; // Status für Hurt setzen
    this.startWalkingAnimation();
  }

  startWalkingAnimation() {
    let direction = 1; // 1 für vorwärts, -1 für rückwärts
    let maxDistance = 300; // Maximale Distanz in Pixeln
    let startX = this.x; // Startposition speichern
    let changeDirectionChance = 0.05; // 5% Chance pro Frame, die Richtung abrupt zu ändern
    let speed = 5; // Startgeschwindigkeit
  
    this.walkingInterval = setInterval(() => {
      if (!this.isAlert && !this.isHurt) {
        this.playAnimation(this.IMAGES_WALKING);
  
        // Bewegung implementieren
        this.x += direction * speed; // Bewegung mit aktueller Geschwindigkeit
  
        // Richtung ändern, wenn maximale Distanz erreicht ist
        if (this.x >= startX + maxDistance || this.x <= startX) {
          direction *= -1; // Richtung umkehren
          speed = this.getRandomSpeed(); // Geschwindigkeit anpassen
          console.log(`Grenze erreicht, neue Geschwindigkeit: ${speed}`);
        }
  
        // Gelegentlich die Richtung abrupt ändern
        if (Math.random() < changeDirectionChance) {
          direction *= -1; // Zufällige Richtungsumkehr
          speed = this.getRandomSpeed(); // Geschwindigkeit anpassen
          console.log(`Abrupter Richtungswechsel! Neue Geschwindigkeit: ${speed}`);
        }
  
        console.log(`Boss position: ${this.x}, direction: ${direction}, speed: ${speed}`);
      }
    }, 150); // Animation alle 150ms
  }
  
  // Hilfsmethode, um eine zufällige Geschwindigkeit zu generieren
  getRandomSpeed() {
    return Math.floor(Math.random() * 8) + 6; // Zufällige Geschwindigkeit zwischen 2 und 5
  }
  
  
  

  playHurtAnimation() {
    if (!this.isHurt && !this.isDefeated && !this.isAlert) {
      this.isHurt = true; // Verhindert mehrfaches Abspielen
      this.hurtInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_HURT);
        soundManager.stopSound("endbossHurt");
        soundManager.playSound("endbossHurt");
        console.log("is hurt");
      }, 200);

      setTimeout(() => {
        this.stopHurtAnimation();
        this.isHurt = false;
      }, 600); // Hurt-Animation läuft 1 Sekunde
    }
  }

  playAlertAnimation() {
    console.log("playAlertAnimation called, health:", this.health);
    if (this.health > 2 && !this.isDefeated && !this.isAlert) {
      console.log("Starting alert animation");
      this.isAlert = true; // Verhindert mehrfaches Abspielen
      this.alertInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_ALERT);
        console.log("is alert");
      }, 200);

      setTimeout(() => {
        this.stopAlertAnimation();
        this.isAlert = false;
        console.log("Alert animation stopped");
      }, 5000); // Alert-Animation läuft 1 Sekunde
    } else {
      console.log("Alert animation conditions not met");
    }
  }

  stopAlertAnimation() {
    if (this.alertInterval) {
      clearInterval(this.alertInterval);
      this.alertInterval = null; // Zurücksetzen, um Wiederverwendung zu ermöglichen
      console.log("Alert-Animation des Endbosses gestoppt");
    }
  }

  startDefeatAnimation() {
    this.isDefeated = true;
    this.stopWalkingAnimation();

    let defeatedFrame = 0;
    this.defeatedInterval = setInterval(() => {
      this.playDefeatFrames(defeatedFrame);
      defeatedFrame++;
      if (defeatedFrame >= this.IMAGES_DEFEATED.length) {
        this.stopDefeatAnimation();
      }
    }, 250);
  }

  animateDefeat() {
    if (!this.isDefeated) {
      this.startDefeatAnimation();
    }
  }

  playDefeatFrames(defeatedFrame) {
    this.playAnimation(this.IMAGES_DEFEATED);
  }

  finalizeDefeatAnimation() {
    console.log("Endboss besiegt und bleibt im letzten Bild der Animation!");
    this.img = this.imageCache[this.IMAGES_DEFEATED[this.IMAGES_DEFEATED.length - 1]];
  }

  stopAllAnimations() {
    this.stopWalkingAnimation();
    if (this.hurtInterval) {
      this.stopHurtAnimation();
    }
    if (this.defeatedInterval) {
      this.stopDefeatAnimation();
    }
    console.log("Alle Animationen des Endbosses gestoppt");
  }

  stopWalkingAnimation() {
    clearInterval(this.walkingInterval);
    console.log("Walking-Animation des Endbosses gestoppt");
  }

  stopHurtAnimation() {
    clearInterval(this.hurtInterval);
    this.isHurt = false;
    console.log("Hurt-Animation des Endbosses gestoppt");
  }

  stopDefeatAnimation() {
    clearInterval(this.defeatedInterval);
    this.finalizeDefeatAnimation();
    console.log("Defeat-Animation des Endbosses gestoppt");
  }

  resumeAnimations() {
    if (!this.isDefeated) {
      this.startWalkingAnimation();
      if (this.isHurt) {
        this.playHurtAnimation();
      }
    }
  }
}
