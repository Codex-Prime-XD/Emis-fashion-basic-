/* ================= HAMBURGER MENU ================= */
function toggleMenu(e){
  e.stopPropagation();
  document.getElementById("menu-dropdown").classList.toggle("show");
}
function closeMenu(){
  document.getElementById("menu-dropdown").classList.remove("show");
}
document.addEventListener("click", (e) => {
  const dd = document.getElementById("menu-dropdown");
  if(dd && !e.target.closest(".icon-bar")){
    dd.classList.remove("show");
  }
});

function applyLang(lang){
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if(i18n[lang][key]) el.textContent = i18n[lang][key];
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el=>{
    const key = el.getAttribute("data-i18n-ph");
    if(i18n[lang][key]) el.setAttribute("placeholder", i18n[lang][key]);
  });
  document.querySelectorAll(".lang-switch button").forEach(b=>{
    b.classList.toggle("active", b.dataset.lang===lang);
  });

  renderAllGrids();

  const modal = document.getElementById("product-modal");
  if(modal.classList.contains("show") && currentProductId){
    openModal(currentProductId);
  }
  const resBox = document.getElementById("search-results");
  resBox.classList.remove("show");
  document.getElementById("search-input").value = "";

  if(document.getElementById("cart-modal").classList.contains("show")){
    renderCart();
  }
}
