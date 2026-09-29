/* ================= HEADER SCROLL (overlay -> solid) ================= */
function initHeaderScroll(){
  const header = document.querySelector("header.main-header");
  const topbar = document.querySelector(".topbar-row");
  if(!header) return;
  const update = () => {
    const onHome = document.getElementById("page-home").classList.contains("show");
    const scrolled = !onHome || window.scrollY > 60;
    header.classList.toggle("scrolled", scrolled);
    if(topbar) topbar.classList.toggle("scrolled", scrolled);
    document.body.classList.toggle("not-home", !onHome);
  };
  window.addEventListener("scroll", update);
  window.addEventListener("hashchange", () => setTimeout(update, 0));
  update();
  return update;
}
