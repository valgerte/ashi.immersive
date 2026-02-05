const preloader = document.querySelector(".preloader");
const firstBg = document.querySelector(".first-bg-image");

window.addEventListener("load", () => {
  setTimeout(() => {
    firstBg.classList.add("hide");
  }, 500);

  setTimeout(() => {
    firstBg.remove();
  }, 5000);
  setTimeout(() => {
    preloader.style.display = "none";

    document.dispatchEvent(new Event("app:ready"));
  }, 4000);
});
