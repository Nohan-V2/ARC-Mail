document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("#search-contact");
  const convContainers = document.querySelectorAll(".conv--contain-all");

  // Cacher tous les conteneurs `.conv--contain-all` au chargement de la page
  convContainers.forEach((convContainer) => {
    convContainer.style.display = "none";
  });

  // Affiche les résultats de recherche lors de la saisie
  searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();

    convContainers.forEach((convContainer) => {
      const contacts = convContainer.querySelectorAll(".conv--container");
      let isAnyContactVisible = false;

      contacts.forEach((contact) => {
        const nameElement = contact.querySelector(".name-people");
        const name = nameElement.textContent.toLowerCase();

        if (name.includes(searchText)) {
          contact.style.display = "flex"; // Affiche le contact correspondant
          isAnyContactVisible = true;
        } else {
          contact.style.display = "none"; // Masque le contact non correspondant
        }
      });

      // Affiche `.conv--contain-all` seulement si un contact correspond
      convContainer.style.display = isAnyContactVisible ? "flex" : "none";
    });
  });

  // Gère l'affichage lors du focus et du blur de l'input
  searchInput.addEventListener("focus", () => {
    if (searchInput.value.trim() === "") {
      convContainers.forEach((convContainer) => {
        convContainer.style.display = "none";
      });
    }
  });

  searchInput.addEventListener("blur", () => {
    // Cache tous les `.conv--contain-all` et efface le texte de recherche lorsque l'input perd le focus
    convContainers.forEach((convContainer) => {
      convContainer.style.display = "none";
    });
    searchInput.value = ""; // Efface le texte dans l'input
  });
});
