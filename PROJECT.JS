document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".work-card").forEach((card, index) => {
    card.style.setProperty("--card-order", index);
  });

  document.querySelectorAll(".screenshot-gallery a").forEach((link) => {
    link.setAttribute("aria-label", `Open full-size ${link.querySelector("span")?.textContent ?? "project"} screenshot`);
  });
});
