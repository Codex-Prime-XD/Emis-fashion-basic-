/* ================= GRIDS ================= */
function renderGrid(containerId, list){
  const el = document.getElementById(containerId);
  if(!el) return;
  if(list.length === 0){
    el.innerHTML = `<div class="empty-state">${t("emptyState")}</div>`;
    return;
  }
  el.innerHTML = list.map(p => `
    <div class="product-card" onclick="openModal('${p.id}')">
      <div class="img-wrap">
        <span class="tag">${CATEGORY_LABELS[currentLang][p.cat]}</span>
        <img src="${IMAGES[p.img]}" alt="${p.name[currentLang]}" loading="lazy">
      </div>
      <div class="info">
        <div class="name">${p.name[currentLang]}</div>
        <div class="price">${formatPrice(p.price)}</div>
      </div>
    </div>
  `).join("");
}

function renderAllGrids(){
  renderGrid("grid-femme", PRODUCTS.filter(p=>p.cat==="femme"));
  renderGrid("grid-homme", PRODUCTS.filter(p=>p.cat==="homme"));
  renderGrid("grid-chaussures", PRODUCTS.filter(p=>p.cat==="chaussures"));
  renderGrid("grid-sacs", PRODUCTS.filter(p=>p.cat==="sacs"));
  renderGrid("grid-accessoires", PRODUCTS.filter(p=>p.cat==="accessoires"));
  renderGrid("grid-featured", ["f3","s7","c3","a7","f5","c2"].map(id=>PRODUCTS.find(p=>p.id===id)));
}
