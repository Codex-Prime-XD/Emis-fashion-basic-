/* ================= SEARCH ================= */
function initSearch(){
  const input = document.getElementById("search-input");
  const resBox = document.getElementById("search-results");
  if(!input) return;

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if(q.length === 0){ resBox.classList.remove("show"); resBox.innerHTML=""; return; }
    const matches = PRODUCTS.filter(p =>
      p.name[currentLang].toLowerCase().includes(q) || p.cat.toLowerCase().includes(q)
    ).slice(0,8);
    resBox.innerHTML = matches.length
      ? matches.map(p => `
          <div class="sr-item" onclick="document.getElementById('search-results').classList.remove('show'); openModal('${p.id}')">
            <img src="${IMAGES[p.img]}" alt="${p.name[currentLang]}">
            <div><div class="sr-name">${p.name[currentLang]}</div><div class="sr-price">${formatPrice(p.price)}</div></div>
          </div>`).join("")
      : `<div class="sr-empty">${t("searchEmpty")} « ${q} »</div>`;
    resBox.classList.add("show");
  });

  document.addEventListener("click", (e) => {
    if(!e.target.closest(".search-wrap") && !e.target.closest("#search-results")){
      resBox.classList.remove("show");
    }
  });
}
