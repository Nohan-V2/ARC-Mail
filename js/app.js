const $sidebar = document.querySelector(".sidebar");
const $window = document.querySelector(".window");
const $welcomeContianer = document.querySelector(".welcome-container");
const $connectContainer = document.querySelector(".connect-container");

const $searchBar = document.querySelector("#search");
const $btnWelcome = document.querySelector(".btn-welcome");

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

// Fonction de connexion à Message
function connectToMessage() {
  console.log("Connecting to Message...");
  // Vérifier si l'API Messages est disponible (macOS/iOS)
  if (window.webkit && window.webkit.messageHandlers) {
    // Intégration avec l'API Messages sur macOS/iOS
    console.log("Messages API detected, initiating connection...");
    // Afficher une interface de confirmation
    showConnectionModal("Message", "Connexion à Messages en cours...");
  } else {
    // Fallback pour les autres plateformes
    showConnectionModal(
      "Message",
      "L'API Messages n'est pas disponible sur cette plateforme."
    );
  }
}

// Fonction de connexion à Gmail
function connectToGmail() {
  console.log("Connecting to Gmail...");
  const clientId = "YOUR_GMAIL_CLIENT_ID";
  const redirectUri = encodeURIComponent(
    window.location.origin + "/gmail-callback.html"
  );
  const scope = encodeURIComponent(
    "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send"
  );
  const responseType = "token";
  const gmailAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&prompt=consent`;

  showConnectionModal(
    "Gmail",
    "Redirection vers la page d'authentification Gmail..."
  );
  // Ouvrir dans une nouvelle fenêtre pour l'authentification
  window.open(gmailAuthUrl, "gmailAuthWindow", "width=600,height=700");
}

// Fonction de connexion à WhatsApp
function connectToWhatsapp() {
  console.log("Connecting to WhatsApp...");
  // WhatsApp Business API nécessite une approbation et une configuration spécifique
  const whatsappBusinessId = "YOUR_WHATSAPP_BUSINESS_ID";
  const whatsappApiVersion = "v17.0";
  const whatsappAuthUrl = `https://business.facebook.com/wa/manage/phone-numbers/?business_id=${whatsappBusinessId}&version=${whatsappApiVersion}`;

  showConnectionModal(
    "WhatsApp",
    "Pour connecter WhatsApp, vous devez configurer l'API WhatsApp Business."
  );
  // Option pour ouvrir la page de configuration WhatsApp Business
  if (
    confirm("Voulez-vous ouvrir la page de configuration WhatsApp Business?")
  ) {
    window.open(whatsappAuthUrl, "_blank");
  }
}

// Fonction de connexion à Snapchat
function connectToSnapchat() {
  console.log("Connecting to Snapchat...");
  const snapchatClientId = "YOUR_SNAPCHAT_CLIENT_ID";
  const redirectUri = encodeURIComponent(
    window.location.origin + "/snapchat-callback.html"
  );
  const snapchatScopes = encodeURIComponent(
    "https://auth.snapchat.com/oauth2/api/user.display_name https://auth.snapchat.com/oauth2/api/user.bitmoji.avatar"
  );
  const snapchatAuthUrl = `https://accounts.snapchat.com/accounts/oauth2/auth?client_id=${snapchatClientId}&redirect_uri=${redirectUri}&response_type=code&scope=${snapchatScopes}`;

  showConnectionModal(
    "Snapchat",
    "Redirection vers la page d'authentification Snapchat..."
  );
  window.open(snapchatAuthUrl, "snapchatAuthWindow", "width=600,height=700");
}

// Fonction de connexion à Discord
function connectToDiscord() {
  console.log("Connecting to Discord...");
  const clientId = "YOUR_DISCORD_CLIENT_ID";
  const redirectUri = encodeURIComponent(
    window.location.origin + "/discord-callback.html"
  );
  const scopes = encodeURIComponent(
    "identify email connections guilds messages.read"
  );
  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes}`;

  showConnectionModal(
    "Discord",
    "Redirection vers la page d'authentification Discord..."
  );
  window.open(discordAuthUrl, "discordAuthWindow", "width=600,height=700");
}

// Fonction de connexion à Instagram
function connectToInstagram() {
  console.log("Connecting to Instagram...");
  const instagramAppId = "YOUR_INSTAGRAM_APP_ID";
  const redirectUri = encodeURIComponent(
    window.location.origin + "/instagram-callback.html"
  );
  const instagramScopes = encodeURIComponent("user_profile,user_media");
  const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${instagramAppId}&redirect_uri=${redirectUri}&scope=${instagramScopes}&response_type=code`;

  showConnectionModal(
    "Instagram",
    "Redirection vers la page d'authentification Instagram..."
  );
  window.open(instagramAuthUrl, "instagramAuthWindow", "width=600,height=700");
}

// Fonction pour afficher une modal de connexion
function showConnectionModal(serviceName, message) {
  // Créer une modal simple pour informer l'utilisateur
  const modal = document.createElement("div");
  modal.className = "connection-modal";
  modal.innerHTML = `
    <div class="connection-modal-content">
      <h3>Connexion à ${serviceName}</h3>
      <p>${message}</p>
      <div class="connection-loader"></div>
      <button class="connection-close-btn">Fermer</button>
    </div>
  `;

  document.body.appendChild(modal);

  // Gérer la fermeture de la modal
  const closeBtn = modal.querySelector(".connection-close-btn");
  closeBtn.addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  // Fermer automatiquement après 10 secondes si pas de redirection
  setTimeout(() => {
    if (document.body.contains(modal)) {
      document.body.removeChild(modal);
    }
  }, 10000);
}

// Fonction pour gérer les callbacks d'authentification
function handleAuthCallback(service, params) {
  console.log(
    `Handling ${service} authentication callback with params:`,
    params
  );
  // Implémenter la logique pour échanger le code contre un token d'accès
  // et stocker les informations d'authentification
}

// Basculer la sidebar en mode flottant au clic sur l'icône
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

// Afficher la sidebar quand la souris entre dans la zone de déclenchement
$sidebarTrigger.addEventListener("mouseenter", () => {
  if ($sidebar.classList.contains("sidebar-float")) {
    $sidebar.classList.add("visible");
    clearTimeout(hideTimeout);
  }
});

// Afficher la sidebar quand la souris entre dans celle-ci
$sidebar.addEventListener("mouseenter", () => {
  if ($sidebar.classList.contains("sidebar-float")) {
    $sidebar.classList.add("visible");
    clearTimeout(hideTimeout);
  }
});

// Cacher la sidebar quand la souris la quitte
$sidebar.addEventListener("mouseleave", () => {
  if ($sidebar.classList.contains("sidebar-float")) {
    hideTimeout = setTimeout(() => {
      $sidebar.classList.remove("visible");
    }, 800);
  }
});

// Filtrer les profils selon le texte saisi dans la barre de recherche
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

// Fonction pour définir le thème selon la préférence
function setTheme(darkMode) {
  if (darkMode) {
    document.body.classList.add("dark");
    $moonIcon.innerHTML = $sunIconTransform;
  } else {
    document.body.classList.remove("dark");
    $moonIcon.innerHTML = $moonIconTransform;
  }
}

// Vérifier la préférence système au chargement
function checkSystemThemePreference() {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  setTheme(prefersDarkMode);
}

// Écouter les changements de préférence système
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    setTheme(e.matches);
  });

// Initialiser le thème selon la préférence système
checkSystemThemePreference();

// Basculer entre mode clair/sombre au clic
$moonIcon.addEventListener("click", () => {
  const isDarkMode = !document.body.classList.contains("dark");
  setTheme(isDarkMode);
});

// Passer de l'écran d'accueil à l'écran de connexion
$btnWelcome.addEventListener("click", () => {
  $welcomeContianer.classList.add("hidden");
  $connectContainer.classList.remove("hidden");
});
