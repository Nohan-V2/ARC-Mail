document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("#search-contact");
  const folderContainers = document.querySelectorAll(".conv-reseau--container");

  // Initialisation : Tri alphabétique et masquage de `.conv--contain-all`
  folderContainers.forEach(folder => {
    const convContainer = folder.querySelector(".conv--contain-all");
    const contacts = Array.from(convContainer.querySelectorAll(".conv--container"));
    const arrowUp = folder.querySelector(".arrow-up.svg");
    const arrowDown = folder.querySelector(".arrow-down.svg");

    // Masquer le contenu par défaut et afficher `arrow-down.svg`
    convContainer.style.display = "none";
    arrowUp.style.display = "none";
    arrowDown.style.display = "inline";

    // Trier les contacts par ordre alphabétique en fonction de `.name-people`
    contacts.sort((a, b) => {
      const nameA = a.querySelector(".name-people").textContent.toLowerCase();
      const nameB = b.querySelector(".name-people").textContent.toLowerCase();
      return nameA.localeCompare(nameB);
    });

    // Remettre les contacts triés dans `.conv--contain-all`
    convContainer.innerHTML = "";
    contacts.forEach(contact => convContainer.appendChild(contact));

    // Toggle pour afficher/masquer `.conv--contain-all` et changer l'icône
    folder.addEventListener("click", () => {
      const isContentVisible = convContainer.style.display === "flex";
      convContainer.style.display = isContentVisible ? "none" : "flex";
      arrowUp.style.display = isContentVisible ? "none" : "inline";
      arrowDown.style.display = isContentVisible ? "inline" : "none";
    });
  });

  // Gestion de la recherche pour filtrer les résultats
  searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();

    folderContainers.forEach(folder => {
      const convContainer = folder.querySelector(".conv--contain-all");
      const contacts = convContainer.querySelectorAll(".conv--container");
      let isAnyContactVisible = false;

      contacts.forEach(contact => {
        const nameElement = contact.querySelector(".name-people");
        const name = nameElement.textContent.toLowerCase();

        if (name.includes(searchText)) {
          contact.style.display = "flex"; // Affiche le contact correspondant
          isAnyContactVisible = true;
        } else {
          contact.style.display = "none"; // Masque le contact non correspondant
        }
      });

      // Affiche ou masque `.conv--contain-all` si un contact correspond
      convContainer.style.display = isAnyContactVisible ? "flex" : "none";
    });
  });

  // Effacer le texte de recherche et masquer `.conv--contain-all` lors de la perte de focus
  searchInput.addEventListener("blur", () => {
    searchInput.value = ""; // Efface le texte de recherche
    folderContainers.forEach(folder => {
      const convContainer = folder.querySelector(".conv--contain-all");
      convContainer.style.display = "none";
    });
  });
});
