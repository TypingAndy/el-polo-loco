function displayNone(id) {
  document.getElementById(id).classList.add("displayNone");

}

function displayShow(id) {
  document.getElementById(id).classList.remove("displayNone");
  if (selectedLevel == 2) {
    displayNone('nextLevelButton');
   }
}

function renderText(templateName) {
  const templates = {
    controlTemplate: controlTemplate(),
    introductionsTemplate: introductionsTemplate(),
    impressumTemplate: impressumTemplate(),
  };

  // Container für den Inhalt auswählen
  let textContainer = document.getElementById('templateContent');

  // Passendes Template setzen
  textContainer.innerHTML = templates[templateName] || '<p>Template not found!</p>';
}
