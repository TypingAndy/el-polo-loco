/**
 * Returns the HTML template for the game controls.
 * @returns {string} The HTML string for the controls template.
 */
function controlTemplate() {
  return /*html*/ `
          <h1>Controls</h1>
          <ul style="list-style: none; padding: 0">
            <li><b>Move Left:</b> Press <b>A</b></li>
            <li><b>Move Right:</b> Press <b>D</b></li>
            <li><b>Jump:</b> Press <b>Space</b></li>
            <li><b>Super Jump:</b> Jump on an enemy's head and press <b>Space</b></li>
            <li><b>Shoot:</b> Hold <b>F</b></li>
            <li><b>Mute:</b> Press <b>M</b> to toggle sound</li>
            <li><b>Pause:</b> Press <b>P</b> to pause or resume the game</li><br>
          </ul>
    `;
}

/**
 * Returns the HTML template for the game help section.
 * @returns {string} The HTML string for the introductions template.
 */
function introductionsTemplate() {
  return /*html*/ `
          <h1>Game Help</h1>
          <ul style="list-style: none; padding: 0">
            <li><b>Objective:</b> Collect all coins to spawn the boss</li><br>
            <li><b>Boss:</b> The boss has two phases. During the transition, it is invulnerable. In the second phase, it shoots small chickens.</li><br>
            <li><b>Bottles:</b> If your bottles are empty, they will respawn in the front half of the level.</li><br>
          </ul>
    `;
}

/**
 * Returns the HTML template for the impressum (legal notice) section.
 * @returns {string} The HTML string for the impressum template.
 */
function impressumTemplate() {
  return /*html*/ `
          <h1>Impressum</h1>
          <p><b>Angaben gemäß § 5 TMG</b></p>
          <p>Musterfirma GmbH<br />Musterstraße 123<br />12345 Musterstadt</p>
          <p><b>Vertreten durch</b></p>
          <p>Andreas Traar, Geschäftsführer</p>
          <p><b>Kontakt</b></p>
          <p>Telefon: +49 (0) 123 456 789<br />E-Mail: andreas.georg@outlook.com</p><br>
    `;
}
