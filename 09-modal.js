/* ================= MODAL ================= */
let currentProductId = null;

function openModal(id){
  const p = PRODUCTS.find(x => x.id === id);
  if(!p) return;
  currentProductId = id;
  const overlay = document.getElementById("product-modal");
  const box = document.getElementById("modal-body");
  const revs = REVIEWS[id] || [];

  const orderMsg = currentLang === "de"
    ? "Hallo Emi Fashion, ich möchte bestellen: "
    : currentLang === "en"
    ? "Hello Emi Fashion, I would like to order: "
    : "Bonjour Emi Fashion, je veux commander : ";

  box.innerHTML = `
    <div class="modal-img"><img src="${IMAGES[p.img]}" alt="${p.name[currentLang]}"></div>
    <div class="modal-content">
      <span class="eyebrow">${CATEGORY_LABELS[currentLang][p.cat]}</span>
      <h2>${p.name[currentLang]}</h2>
      <div class="price">${formatPrice(p.price)}</div>
      <p class="desc">${p.desc[currentLang]}</p>
      <div class="order-box">
        <button class="add-to-cart-btn" onclick="addToCart('${id}')">${t("addToCart")}</button>
        <div class="add-to-cart-msg" id="add-to-cart-msg">${t("addedToCart")}</div>
      </div>
      <div class="reviews-box">
        <h4>${t("reviewsTitle")}</h4>
        <div id="reviews-list">
          ${revs.length ? revs.map(renderReview).join("") : `<p class="no-review">${t("noReview")}</p>`}
        </div>
        <form class="review-form" onsubmit="submitReview(event,'${id}')">
          <input type="text" placeholder="${t('rvNamePh')}" required id="rv-name">
          <div class="stars-input" id="stars-input">
            ${[1,2,3,4,5].map(n=>`<span data-v="${n}" onclick="setStar(${n})">★</span>`).join("")}
          </div>
          <textarea placeholder="${t('rvTextPh')}" required id="rv-text"></textarea>
          <div class="file-row">
            <label>${t('rvPhotoLabel')}</label>
            <input type="file" accept="image/*" id="rv-photo">
          </div>
          <button type="submit">${t('rvSubmit')}</button>
          <div class="form-msg" id="form-msg">${t('rvThanks')}</div>
        </form>
      </div>
    </div>
  `;
  currentStar = 0;
  overlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  document.getElementById("product-modal").classList.remove("show");
  document.body.style.overflow = "";
  currentProductId = null;
}

let currentStar = 0;
function setStar(n){
  currentStar = n;
  document.querySelectorAll("#stars-input span").forEach(s => s.classList.toggle("active", parseInt(s.dataset.v) <= n));
}

function renderReview(r){
  return `<div class="review-item">
    ${r.photo ? `<img src="${r.photo}" alt="review photo">` : ""}
    <div>
      <div class="r-name">${r.name}</div>
      <div class="r-stars">${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)}</div>
      <div class="r-text">${r.text}</div>
    </div>
  </div>`;
}

function submitReview(e, id){
  e.preventDefault();
  const name = document.getElementById("rv-name").value.trim();
  const text = document.getElementById("rv-text").value.trim();
  const fileInput = document.getElementById("rv-photo");
  const rating = currentStar || 5;
  const finish = (photoData) => {
    if(!REVIEWS[id]) REVIEWS[id] = [];
    REVIEWS[id].unshift({name, text, rating, photo: photoData});
    document.getElementById("reviews-list").innerHTML = REVIEWS[id].map(renderReview).join("");
    document.getElementById("form-msg").classList.add("show");
    e.target.reset();
    currentStar = 0;
  };
  if(fileInput.files && fileInput.files[0]){
    const reader = new FileReader();
    reader.onload = ev => finish(ev.target.result);
    reader.readAsDataURL(fileInput.files[0]);
  } else { finish(null); }
}
