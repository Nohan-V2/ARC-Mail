// Get the select element and the space name display element
const spaceSelect = document.querySelector(".select-space");
const spaceName = document.querySelector(".space-name");

// Update the space name when the selection changes
spaceSelect.addEventListener("change", (event) => {
  // Get the selected option's text
  const selectedOption = event.target.options[event.target.selectedIndex].text;

  // Update the text content while preserving emoji if it exists
  if (spaceName) {
    const emoji = spaceName.textContent.match(/\p{Emoji}/gu)?.[0] || "";
    spaceName.textContent = `${selectedOption} ${emoji}`;
  }
});
