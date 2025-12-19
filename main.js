// Toggle Dark Mode Example
document.addEventListener("DOMContentLoaded", () => {
  const toggleDarkButton = document.getElementById("toggle-dark");

  if (toggleDarkButton) {
    toggleDarkButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode")
      );
    });
  }

  // Load dark mode preference
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
});

// Example: Dynamic cards for lessons (used in Lesson 15)
export function createCard(title, content) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
  return card;
}

// Automatically add example cards to main content (optional)
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".main-content");
  if (container) {
    const card1 = createCard("Welcome!", "This is a dynamic content card.");
    const card2 = createCard(
      "Tip",
      "You can create reusable components using this function."
    );
    container.appendChild(card1);
    container.appendChild(card2);
  }
});
