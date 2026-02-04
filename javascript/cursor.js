const cursor = document.querySelector(".cursor-blur");

document.addEventListener("pointermove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});
