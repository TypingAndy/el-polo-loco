/**
 * Hides an element by adding the "displayNone" class.
 * @param {string} id - The ID of the element to hide.
 */
function displayNone(id) {
  document.getElementById(id).classList.add("displayNone");
}

/**
 * Shows an element by removing the "displayNone" class.
 * If the selected level is 2, hides the "nextLevelButton" element.
 * @param {string} id - The ID of the element to show.
 */
function displayShow(id) {
  document.getElementById(id).classList.remove("displayNone");
  if (selectedLevel == 2) {
    displayNone("nextLevelButton");
  }
}

/**
 * Renders text content based on the specified template name.
 * @param {string} templateName - The name of the template to render.
 * @returns {string} The rendered template content.
 */
function renderText(templateName) {
  const templates = {
    controlTemplate: controlTemplate(),
    introductionsTemplate: introductionsTemplate(),
    impressumTemplate: impressumTemplate(),
  };
  let textContainer = document.getElementById("templateContent");
  textContainer.innerHTML = templates[templateName] || "<p>Template not found!</p>";
}
