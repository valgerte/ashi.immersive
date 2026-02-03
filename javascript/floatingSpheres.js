const floatingSpheresContainer = document.querySelector(".floating-spheres");

window.addEventListener("load", () => {
  setTimeout(() => floatingSpheresContainer.classList.add("explode"), 300);

  setTimeout(() => {
    floatingSpheresContainer.classList.remove("explode");
    floatingSpheresContainer.classList.add("gather");
  }, 1300);

  setTimeout(() => {
    floatingSpheresContainer.classList.remove("gather");
    floatingSpheresContainer.classList.add("to-column");
  }, 2300);
});
