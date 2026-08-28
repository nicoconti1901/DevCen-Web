const THEME_KEY = "devcen-theme";
const LIGHT_CSS = "css/theme-light.css";

function applyTheme(theme, save = true) {
  const root = document.documentElement;
  const isLight = theme === "light";

  root.classList.toggle("theme-light", isLight);
  root.classList.toggle("theme-dark", !isLight);

  let link = document.getElementById("theme-light-css");
  if (isLight) {
    if (!link) {
      link = document.createElement("link");
      link.id = "theme-light-css";
      link.rel = "stylesheet";
      link.href = `${LIGHT_CSS}?v=7`;
      document.head.appendChild(link);
    }
  } else {
    link?.remove();
  }

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.setAttribute("content", isLight ? "#f4f1eb" : "#070707");
  }

  document.querySelectorAll(".theme-switch-btn").forEach((btn) => {
    const active = btn.dataset.theme === theme;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });

  if (save) {
    localStorage.setItem(THEME_KEY, theme);
  }

  window.dispatchEvent(new CustomEvent("devcen-theme", { detail: { theme } }));
}

(function bootTheme() {
  const theme = localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
  applyTheme(theme, false);
})();

document.addEventListener("DOMContentLoaded", () => {
  const current = localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
  applyTheme(current, false);

  document.querySelectorAll(".theme-switch-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.theme === (document.documentElement.classList.contains("theme-light") ? "light" : "dark")) {
        return;
      }
      applyTheme(btn.dataset.theme);
    });
  });
});
