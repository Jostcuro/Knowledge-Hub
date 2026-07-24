const mobileToggle = document.getElementById("mobile-toggle");
const navLinks = document.getElementById("nav-links");

if (mobileToggle) {
  mobileToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

const heroSearch = document.getElementById("hero-search");
if (heroSearch) {
  heroSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = heroSearch.querySelector("input").value.trim();
    if (q) window.location.href = `/search?q=${encodeURIComponent(q)}`;
  });
}

const navSearchForm = document.getElementById("nav-search-form");
if (navSearchForm) {
  navSearchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = navSearchForm.querySelector("input").value.trim();
    if (q) window.location.href = `/search?q=${encodeURIComponent(q)}`;
  });
}

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    const heroInput = document.getElementById("hero-search-input");
    if (heroInput) {
      heroInput.focus();
      heroInput.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
});

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  const icon = type === "success" ? "\u2705" : "\u274C";
  const duration = type === "success" ? 3000 : 5000;

  const iconSpan = document.createElement("span");
  iconSpan.className = "toast-icon";
  iconSpan.textContent = icon;

  const msgSpan = document.createElement("span");
  msgSpan.className = "toast-message";
  msgSpan.textContent = message;

  const closeBtn = document.createElement("button");
  closeBtn.className = "toast-close";
  closeBtn.textContent = "\u2715";

  toast.appendChild(iconSpan);
  toast.appendChild(msgSpan);
  toast.appendChild(closeBtn);

  const removeToast = () => {
    toast.classList.add("toast-exit");
    toast.addEventListener("animationend", () => toast.remove());
  };

  closeBtn.addEventListener("click", removeToast);

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) removeToast();
  }, duration);
}
