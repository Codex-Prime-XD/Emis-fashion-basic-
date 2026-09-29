/* ================= CART ================= */
let CART = {}; // { productId: qty }

function addToCart(id){
  CART[id] = (CART[id] || 0) + 1;
  updateCartBadge();
  const msg = document.getElementById("add-to-cart-msg");
  if(msg){ msg.classList.add("show"); }
}

function changeCartQty(id, delta){
  if(!CART[id]) return;
  CART[id] += delta;
  if(CART[id] <= 0) delete CART[id];
  updateCartBadge();
  renderCart();
}

function removeFromCart(id){
  delete CART[id];
  updateCartBadge();
  renderCart();
}

function updateCartBadge(){
  const count = Object.values(CART).reduce((a,b)=>a+b,0);
  const badge = document.getElementById("cart-badge");
  if(!badge) return;
  if(count > 0){
    badge.textContent = count;
    badge.style.display = "flex";
  } else {
    badge.style.display = "none";
  }
}

function renderCart(){
  const box = document.getElementById("cart-items");
  const totalRow = document.getElementById("cart-total-row");
  const checkoutBtn = document.getElementById("cart-checkout-btn");
  const ids = Object.keys(CART);
  if(ids.length === 0){
    box.innerHTML = `<div class="cart-empty">${t("cartEmpty")}</div>`;
    totalRow.style.display = "none";
    checkoutBtn.style.display = "none";
    return;
  }
  let total = 0;
  box.innerHTML = ids.map(id => {
    const p = PRODUCTS.find(x => x.id === id);
    if(!p) return "";
    const qty = CART[id];
    total += p.price * qty;
    return `
      <div class="cart-item">
        <img src="${IMAGES[p.img]}" alt="${p.name[currentLang]}">
        <div class="ci-info">
          <div class="ci-name">${p.name[currentLang]}</div>
          <div class="ci-price">${formatPrice(p.price)}</div>
          <div class="ci-qty">
            <button onclick="changeCartQty('${id}',-1)">-</button>
            <span>${qty}</span>
            <button onclick="changeCartQty('${id}',1)">+</button>
          </div>
          <div class="ci-remove" onclick="removeFromCart('${id}')">${t("cartRemove")}</div>
        </div>
      </div>`;
  }).join("");
  totalRow.style.display = "flex";
  document.getElementById("cart-total-amount").textContent = formatPrice(total);
  checkoutBtn.style.display = "block";
  checkoutBtn.textContent = t("cartCheckout");

  const orderLines = ids.map(id => {
    const p = PRODUCTS.find(x => x.id === id);
    return p ? `${p.name[currentLang]} x${CART[id]} (${formatPrice(p.price * CART[id])})` : "";
  }).filter(Boolean).join("\n");
  const orderMsg = currentLang === "de"
    ? "Hallo Emi Fashion, ich möchte bestellen:\n"
    : currentLang === "en"
    ? "Hello Emi Fashion, I would like to order:\n"
    : "Bonjour Emi Fashion, je veux commander :\n";
  checkoutBtn.href = `https://wa.me/12135550142?text=${encodeURIComponent(orderMsg + orderLines + "\n" + t("cartTotal") + ": " + formatPrice(total))}`;
}

function openCart(){
  renderCart();
  document.getElementById("cart-modal").classList.add("show");
  document.body.style.overflow = "hidden";
}
function closeCart(){
  document.getElementById("cart-modal").classList.remove("show");
  document.body.style.overflow = "";
}
