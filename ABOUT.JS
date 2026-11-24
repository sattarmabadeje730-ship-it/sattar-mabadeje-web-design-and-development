document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".values-grid article");
  cards.forEach((card, index) => card.style.setProperty("--card-order", index));
});
