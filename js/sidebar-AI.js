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
    header.style.width = "40px";
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
        container.style.flexDirection = "column";
        container.style.alignItems = "center";
        container.style.gap = "16px";
        container.style.width = "100%";
      });
    });

    // Gérer les images de manière spécifique
    const allImages = header.querySelectorAll("img");
    allImages.forEach((img) => {
      // Images par défaut à 32px
      img.style.width = "32px";
      img.style.height = "32px";

      // Si c'est une image dans un label (input search)
      if (img.closest("label")) {
        img.style.padding = "8px";
        img.parentElement.style.background = "rgba(255, 255, 255, 0.12)";
        img.parentElement.style.width = "100%";
        img.parentElement.style.justifyContent = "center";
        img.parentElement.style.borderRadius = "8px";
      }

      // Si c'est une image de profil (dans contain-pp-contact)
      if (img.closest(".contain-pp-contact")) {
        img.style.width = "36px";
        img.style.height = "36px";
      }
    });
  } else {
    // Restaurer la sidebar
    header.style.width = "25vw";
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
