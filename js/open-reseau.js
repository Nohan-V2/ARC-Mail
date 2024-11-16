// Sélectionne tous les containers contenant les discussions
const convContainers = document.querySelectorAll(".conv-reseau--container");

convContainers.forEach((container) => {
  // Sélectionne le bouton toggle dans chaque container
  const toggleButton = container.querySelector(".discution-container");
  const arrowDown = toggleButton.querySelector(
    ".action-button-reduce-grow img:not(.none)"
  );
  const arrowUp = toggleButton.querySelector(
    ".action-button-reduce-grow img.none"
  );
  const convContent = container.querySelector(".conv--contain-all");

  // Ajoute un gestionnaire d'événements pour le clic sur .discution-container
  toggleButton.addEventListener("click", (e) => {
    // Empêche le clic de se propager au container parent
    e.stopPropagation();

    // Alterne la classe .none sur les flèches
    arrowDown.classList.toggle("none");
    arrowUp.classList.toggle("none");

    // Alterne l'affichage de la conversation
    convContent.classList.toggle("none");
  });
});
