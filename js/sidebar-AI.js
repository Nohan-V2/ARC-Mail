// Sélectionner les éléments nécessaires
const sidebarButton = document.querySelector(".sidebar-button");
const header = document.querySelector("header");

// État initial
let isExpanded = true;

// Fonction pour gérer le toggle
const toggleSidebar = () => {
  isExpanded = !isExpanded;

  if (!isExpanded) {
    // Réduire la sidebar
    header.style.width = "4vw";
    header.style.padding = "10px 0px";

    // Cacher uniquement les textes et éléments de texte
    const elementsToHide = [
      ".select-space",
      ".space-name",
      ".name-reseau-discution",
      "label input",
      ".contain-info-write",
      ".contain-info-date-number",
    ];

    elementsToHide.forEach((selector) => {
      const elements = header.querySelectorAll(selector);
      elements.forEach((el) => (el.style.display = "none"));
    });

    // Réorganiser tous les conteneurs en colonne
    const containersToColumn = [
      ".discution-container",
      ".contain-action-button",
      ".contain-two-action-button",
      ".contain-pp-contact",
      ".discution-img-title-container",
      ".conv-reseau--container",
    ];

    containersToColumn.forEach((selector) => {
      const containers = header.querySelectorAll(selector);
      containers.forEach((container) => {
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.alignItems = "center";
        container.style.width = "100%";

        // Modifie le gap pour les conteneurs spécifiques
        if (container.classList.contains("contain-pp-contact")) {
          container.style.gap = "8px"; // Définit le gap à 8px pour contain-pp-contact
        } else if (container.classList.contains("contain-two-action-button")) {
          container.style.gap = "0px";
        } else if (container.classList.contains("discution-container")) {
          container.style.gap = "4px"; // Définit le gap à 0px pour discution-container
          container.style.padding = "4px 8px";
        } else {
          container.style.gap = "8px"; // Définit le gap à 16px pour les autres éléments
        }
      });
    });

    // Gérer les images de manière spécifique
    const allImages = header.querySelectorAll("img");
    allImages.forEach((img) => {
      // Si c'est une image dans un label (input search)
      if (img.closest("label")) {
        img.parentElement.style.background = "rgba(255, 255, 255, 0.12)";
        img.parentElement.style.width = "100%";
        img.parentElement.style.justifyContent = "center";
      }

      if (img.closest(".conv--container")) {
        img.style.margin = "0px";
      }

      // Si c'est une image de profil (dans contain-pp-contact)
      if (img.closest(".contain-pp-contact")) {
        img.style.width = "100%";
        img.style.height = "48px";
      }
    });
  } else {
    // Restaurer la sidebar
    header.style.width = "30vw";
    header.style.padding = "10px 8px 0px 0px";

    // Réafficher les éléments cachés
    const elementsToShow = [
      ".select-space",
      ".space-name",
      ".name-reseau-discution",
      "label input",
      ".contain-info-write",
      ".contain-info-date-number",
    ];

    elementsToShow.forEach((selector) => {
      const elements = header.querySelectorAll(selector);
      elements.forEach((el) => (el.style.display = ""));
    });

    // Restaurer les layouts originaux
    const containersToRestore = [
      ".discution-container",
      ".contain-action-button",
      ".contain-two-action-button",
      ".contain-pp-contact",
      ".discution-img-title-container",
      ".conv-reseau--container",
    ];

    containersToRestore.forEach((selector) => {
      const containers = header.querySelectorAll(selector);
      containers.forEach((container) => {
        container.style.padding = "";
        container.style.display = "";
        container.style.flexDirection = "";
        container.style.alignItems = "";
        container.style.gap = "";
        container.style.width = "";
      });
    });

    // Restaurer les styles des images
    const allImages = header.querySelectorAll("img");
    allImages.forEach((img) => {
      img.style.width = "";
      img.style.height = "";
      img.style.padding = "";

      if (img.closest(".conv--container")) {
        img.style.margin = "0px";
      }

      // Restaurer le style du label si c'est une image de recherche
      if (img.closest("label")) {
        img.parentElement.style.background = "";
        img.parentElement.style.width = "";
        img.parentElement.style.justifyContent = "";
        img.parentElement.style.borderRadius = "";
      }
    });
  }
};

// Ajouter l'écouteur d'événement au bouton
sidebarButton.addEventListener("click", toggleSidebar);

// Ajouter les transitions CSS pour une animation fluide
header.style.transition = "all 0.3s ease";
const style = document.createElement("style");
style.textContent = `
    header * {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);
