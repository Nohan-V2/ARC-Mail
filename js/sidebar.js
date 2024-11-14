const sideBar = document.querySelector("header");
const buttonSmallSideBar = document.querySelector(".button-small-side-bar");
const containSearchOnglet = document.querySelector(".search-onglet");
const pinnedContentP = document.querySelectorAll(".pinned-folder p");
const pinnedContentDiv = document.querySelectorAll(".pinned-folder div");

buttonSmallSideBar.addEventListener("click", function () {
  sideBar.classList.remove("sidebar");
  sideBar.classList.add("sidebar-small");
  containSearchOnglet.classList.add("none");

  /*   for (let i = 0; i < pinnedContentP.length; i++) {
    pinnedContentP[i].classList.add("none");
  }         ↓↓↓↓
*/
  pinnedContentP.forEach((e) => {
    e.classList.add("none");
  });

  pinnedContentDiv.forEach((e) => {
    e.classList.add("none");
  });
});
