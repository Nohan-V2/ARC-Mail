const $sidebar = document.querySelector(".sidebar");
const $window = document.querySelector(".window");

const $searchBar = document.querySelector("#search");
const $profilName = document.querySelectorAll(".profil-name");

const $tabContainer = document.querySelectorAll(".tab-container");

const $sidebarIcon = document.querySelector(".sidebar-icon-container");
const $moonIcon = document.querySelector(".moon-icon-container");

const $littleSidebarIcon = `<svg class="sidebar-transform-icon" width="24"height="24"viewBox="0 0 24 24"fill="none"xmlns="http://www.w3.org/2000/svg"><path d="M9 3V21M14 9L17 12L14 15M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z"stroke="#09090B"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"/></svg>`;

const $defaultSidebar = `<svg class="sidebar-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 3V21M16 15L13 12L16 9M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.4"/>
</svg>
`;

// Créer un élément pour la zone de déclenchement
const $sidebarTrigger = document.createElement("div");
$sidebarTrigger.className = "sidebar-trigger";
$window.appendChild($sidebarTrigger);

let hideTimeout;

// Vérifier si l'utilisateur a sauvegardé ses préférences en matière de thème
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

// Si click sur $sidebarIcon alors basculer la sidebar en mode flottant
$sidebarIcon.addEventListener("click", () => {
  if ($sidebar.classList.contains("sidebar-float")) {
    // Revenir au mode normal
    $sidebar.classList.remove("sidebar-float");
    $sidebar.classList.remove("visible");
    $sidebarIcon.innerHTML = $defaultSidebar;
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

  // Save the current theme preference to localStorage
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});
