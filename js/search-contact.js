document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-contact");
  const convContainers = document.querySelectorAll(".conv--container");
  const contactContainer = document.querySelector(
    ".conv-reseau-all--container"
  );
  const header = document.querySelector("header"); // Sélection du header pour la hauteur de référence

  // Création de la fenêtre pour afficher les résultats de recherche
  const searchOverlay = document.createElement("div");
  searchOverlay.style.position = "absolute";
  searchOverlay.style.top = `${contactContainer.offsetTop}px`; // Place la fenêtre à partir de .contain-pp-contact
  searchOverlay.style.left = `${contactContainer.offsetLeft}px`;
  searchOverlay.style.width = `${contactContainer.offsetWidth}px`;
  searchOverlay.style.height = `${
    header.offsetHeight - contactContainer.offsetTop
  }px`; // Ajuste la hauteur
  searchOverlay.style.backgroundColor = "var(--police-black)"; // Semi-transparent
  searchOverlay.style.overflowY = "auto"; // Permet de scroller verticalement
  searchOverlay.style.zIndex = "1000"; // Au-dessus du contenu
  searchOverlay.style.display = "none"; // Cachée par défaut
  searchOverlay.style.transition = "opacity 0.3s ease, transform 0.3s ease"; // Animation
  searchOverlay.style.opacity = "0";
  searchOverlay.style.transform = "translateY(-10px)";
  document.body.appendChild(searchOverlay);

  // Écouteur sur la barre de recherche
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    // Réinitialise les résultats
    searchOverlay.innerHTML = "";

    if (query) {
      searchOverlay.style.display = "block";
      setTimeout(() => {
        searchOverlay.style.opacity = "1";
        searchOverlay.style.transform = "translateY(0)";
      }, 10); // Lancement de l'animation

      let resultsFound = false;

      convContainers.forEach((container) => {
        const name = container
          .querySelector(".name-people")
          .textContent.toLowerCase();

        if (name.includes(query)) {
          const clone = container.cloneNode(true);
          clone.style.padding = "10px"; // Ajout de styles pour les résultats
          searchOverlay.appendChild(clone);
          resultsFound = true;
        }
      });

      if (!resultsFound) {
        searchOverlay.innerHTML =
          "<p style='color: white; padding: 16px;'>Aucun résultat trouvé.</p>";
      }
    } else {
      // Cache la fenêtre lorsque le champ est vide
      hideOverlay();
    }
  });

  // Masquer la fenêtre lorsque le champ perd le focus
  searchInput.addEventListener("blur", () => {
    setTimeout(() => {
      hideOverlay();
    }, 200); // Petit délai pour permettre la sélection
  });

  // Afficher la fenêtre de recherche à nouveau lors du focus sur le champ
  searchInput.addEventListener("focus", () => {
    const query = searchInput.value.toLowerCase().trim();
    if (query) {
      searchOverlay.style.display = "block";
      setTimeout(() => {
        searchOverlay.style.opacity = "1";
        searchOverlay.style.transform = "translateY(0)";
      }, 10); // Lancement de l'animation

      let resultsFound = false;

      convContainers.forEach((container) => {
        const name = container
          .querySelector(".name-people")
          .textContent.toLowerCase();

        if (name.includes(query)) {
          const clone = container.cloneNode(true);
          clone.style.padding = "10px"; // Ajout de styles pour les résultats
          searchOverlay.appendChild(clone);
          resultsFound = true;
        }
      });

      if (!resultsFound) {
        searchOverlay.innerHTML =
          "<p style='color: white; padding: 16px;'>Aucun résultat trouvé.</p>";
      }
    } else {
      // Si le champ est vide, cacher la fenêtre immédiatement
      hideOverlay();
    }
  });

  // Fonction pour masquer la fenêtre avec animation
  function hideOverlay() {
    searchOverlay.style.opacity = "0";
    searchOverlay.style.transform = "translateY(-10px)";
    setTimeout(() => {
      searchOverlay.style.display = "none";
      searchOverlay.innerHTML = ""; // Nettoie les résultats
    }, 300); // Temps correspondant à la durée de l'animation
  }
});
