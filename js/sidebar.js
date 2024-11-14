const sideBar = document.querySelector("header");
const buttonSmallSideBar = document.querySelector(".sidebar-button");
const containSearchOnglet = document.querySelector(".contain-contact");
const pinnedContentP = document.querySelectorAll(".pinned-folder p");
const pinnedContentDiv = document.querySelectorAll(".pinned-folder div");

let toggleValue = true;

buttonSmallSideBar.addEventListener("click", function () {
  if (toggleValue) {
    sideBar.classList.remove("sidebar");
    sideBar.classList.add("sidebar-small");
    containSearchOnglet.classList.add("none");

    pinnedContentP.forEach((e) => {
      e.classList.add("none");
    });

    pinnedContentDiv.forEach((e) => {
      e.classList.add("none");
    });
    toggleValue = false;
  } else {
    sideBar.classList.add("sidebar");
    sideBar.classList.remove("sidebar-small");
    containSearchOnglet.classList.remove("none");

    pinnedContentP.forEach((e) => {
      e.classList.remove("none");
    });

    pinnedContentDiv.forEach((e) => {
      e.classList.remove("none");
    });

    toggleValue = true;
  }
});
