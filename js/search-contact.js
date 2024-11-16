document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-contact");
  const convContainers = document.querySelectorAll(".conv--container");
  const contactContainer = document.querySelector(
    ".conv-reseau-all--container"
  );

  // Création de la fenêtre pour les résultats
  const searchOverlay = document.createElement("div");
  searchOverlay.style.position = "absolute";
  searchOverlay.style.top = `${contactContainer.offsetTop}px`;
  searchOverlay.style.left = `${contactContainer.offsetLeft}px`;
  searchOverlay.style.width = `${contactContainer.offsetWidth}px`;
  searchOverlay.style.height = `300px`; // Ajuster selon vos besoins
  searchOverlay.style.backgroundColor = "var(--police-black)";
  searchOverlay.style.overflowY = "auto";
  searchOverlay.style.zIndex = "1000";
  searchOverlay.style.display = "none";
  searchOverlay.style.borderRadius = "8px";
  document.body.appendChild(searchOverlay);

  // Événements de recherche
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    searchOverlay.innerHTML = "";

    if (query) {
      searchOverlay.style.display = "block";

      let resultsFound = false;

      convContainers.forEach((container) => {
        const name = container
          .querySelector(".name-people")
          .textContent.toLowerCase();

        if (name.includes(query)) {
          const clone = container.cloneNode(true);
          clone.classList.add("search-result");
          searchOverlay.appendChild(clone);
          resultsFound = true;
        }
      });

      if (!resultsFound) {
        searchOverlay.innerHTML =
          "<p style='color: white; padding: 16px;'>Aucun résultat trouvé.</p>";
      }
    } else {
      searchOverlay.style.display = "none";
    }
  });
});
