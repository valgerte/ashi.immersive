const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.style.display = "none";

    document.dispatchEvent(new Event("app:ready"));
  }, 4000);
});
