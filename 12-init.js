/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  initSearch();
  document.querySelectorAll(".lang-switch button").forEach(b=>{
    b.addEventListener("click", ()=>applyLang(b.dataset.lang));
  });
  applyLang("fr");
  updateCartBadge();
  window.__updateHeader = initHeaderScroll();
  const initial = window.location.hash ? window.location.hash.replace("#","") : "home";
  showPage(initial);
});
