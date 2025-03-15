const $sidebar = document.querySelector(".sidebar");
const $window = document.querySelector(".window");

const $searchBar = document.querySelector("#search");
const $profilName = document.querySelectorAll(".profil-name");

const $tabContainer = document.querySelectorAll(".tab-container");

const $sidebarIcon = document.querySelector(".sidebar-icon-container");
const $moonIcon = document.querySelector(".moon-icon-container");

const $littleSidebarIcon = `<svg class="sidebar-transform-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 3V21M14 9L17 12L14 15M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" stroke="#09090B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const $defaultSidebarIcon = `<svg class="sidebar-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 3V21M16 15L13 12L16 9M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.4"/>
</svg>
`;

const $moonIconTransform = `<svg class="moon-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 3C10.8065 4.19347 10.136 5.81217 10.136 7.5C10.136 9.18783 10.8065 10.8065 12 12C13.1935 13.1935 14.8122 13.864 16.5 13.864C18.1878 13.864 19.8065 13.1935 21 12C21 13.78 20.4722 15.5201 19.4832 17.0001C18.4943 18.4802 17.0887 19.6337 15.4442 20.3149C13.7996 20.9961 11.99 21.1743 10.2442 20.8271C8.49836 20.4798 6.89472 19.6226 5.63604 18.364C4.37737 17.1053 3.5202 15.5016 3.17294 13.7558C2.82567 12.01 3.0039 10.2004 3.68509 8.55585C4.36628 6.91131 5.51983 5.50571 6.99987 4.51677C8.47991 3.52784 10.22 3 12 3Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.4"/>
</svg>
`;

const $sunIconTransform = `<svg class="sun-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2V4M12 20V22M4.93018 4.93005L6.34018 6.34005M17.6602 17.66L19.0702 19.07M2 12H4M20 12H22M6.34018 17.66L4.93018 19.07M19.0702 4.93005L17.6602 6.34005M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.4"/>
</svg>
`;

// Créer un élément pour la zone de déclenchement
const $sidebarTrigger = document.createElement("div");
$sidebarTrigger.className = "sidebar-trigger";
$window.appendChild($sidebarTrigger);

let hideTimeout;

// Si click sur $sidebarIcon alors basculer la sidebar en mode flottant
$sidebarIcon.addEventListener("click", () => {
  if ($sidebar.classList.contains("sidebar-float")) {
    // Revenir au mode normal
    $sidebar.classList.remove("sidebar-float");
    $sidebar.classList.remove("visible");
    $sidebarIcon.innerHTML = $defaultSidebarIcon;
  } else {
    // Passer en mode flottant
    $sidebar.classList.add("sidebar-float");
    $sidebarIcon.innerHTML = $littleSidebarIcon;
  }
});

// Afficher la sidebar lorsque la souris entre dans la zone de déclenchement
$sidebarTrigger.addEventListener("mouseenter", () => {
  if ($sidebar.classList.contains("sidebar-float")) {
    $sidebar.classList.add("visible");
    clearTimeout(hideTimeout);
  }
});

// Gérer l'affichage de la sidebar lorsque la souris entre dans la sidebar
$sidebar.addEventListener("mouseenter", () => {
  if ($sidebar.classList.contains("sidebar-float")) {
    $sidebar.classList.add("visible");
    clearTimeout(hideTimeout);
  }
});

// Cacher la sidebar après 2 secondes lorsque la souris quitte la sidebar
$sidebar.addEventListener("mouseleave", () => {
  if ($sidebar.classList.contains("sidebar-float")) {
    hideTimeout = setTimeout(() => {
      $sidebar.classList.remove("visible");
    }, 800);
  }
});

// Si les $profilName contiennent les lettres de $searchBar alors afficher sinon mettre .hidden à leur $tabContainer
$searchBar.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();

  $profilName.forEach((profilName, index) => {
    if (profilName.textContent.toLowerCase().includes(searchTerm)) {
      $tabContainer[index].classList.remove("hidden");
    } else {
      $tabContainer[index].classList.add("hidden");
    }
  });
});

// Dark/Light mode
$moonIcon.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    $moonIcon.innerHTML = $sunIconTransform;
  } else {
    $moonIcon.innerHTML = $moonIconTransform;
  }
});
