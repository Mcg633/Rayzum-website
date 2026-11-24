const legacyTextileSections = new Set(["#teklif", "#cozumler", "#okul", "#otel", "#neden"]);

function forwardLegacyTextileLink() {
  if (location.pathname === "/" && legacyTextileSections.has(location.hash)) {
    location.replace(`/textile${location.search}${location.hash}`);
  }
}

forwardLegacyTextileLink();
window.addEventListener("hashchange", forwardLegacyTextileLink);
window.addEventListener("pageshow", forwardLegacyTextileLink);

const menuButton = document.querySelector(".menu-toggle");
const menu = document.getElementById("main-menu");

function setMenuOpen(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menu.classList.toggle("is-open", open);
}

menuButton.hidden = false;
menu.closest(".header-layout").setAttribute("data-menu-ready", "");
menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") === "false");
});
menu.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuButton.focus();
  }
});

const revealItems = document.querySelectorAll("[data-reveal]");
if (revealItems.length && "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      target.classList.remove("reveal-pending");
      observer.unobserve(target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((element) => {
    element.classList.add("reveal-pending");
    observer.observe(element);
  });
}
document.addEventListener("click", (event) => {
  const whatsappLink = event.target.closest('a[href*="wa.me"], a[href*="whatsapp.com"]');

  if (whatsappLink && typeof gtag === "function") {
    gtag("event", "whatsapp_click", {
      link_url: whatsappLink.href,
      link_text: whatsappLink.textContent.trim()
    });
  }
});
