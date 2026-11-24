document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".service-card").forEach((card, index) => {
    card.style.setProperty("--card-order", index);
  });
});
