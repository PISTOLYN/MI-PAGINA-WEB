/*
  CONFIGURACIÓN RÁPIDA
  Cambia los datos de esta sección para personalizar tu página.
  WhatsApp: escribe el número con código de país, sin + ni espacios.
  Ejemplo México: 528111111111
*/
const CONFIG = {
  brandName: "DESAFÍOS LOCOS MONTERREY",
  announcement: "🎉 ¡Diversión, juegos y entretenimiento para chicos y grandes!",
  heroTitle: "¡La diversión llega con <span>DESAFÍOS LOCOS!</span>",
  heroText: "Show 100% interactivo, dinámico y familiar. Conoce nuestras actividades, mira los videos y aparta tu fecha por WhatsApp.",
  whatsappNumber: "528110276858", // WhatsApp de Desafíos Locos Monterrey
  whatsappMessage: "Hola, quiero más información. Vi tu página web.",
  social: [
    { name: "Facebook", url: "https://www.facebook.com/profile.php?id=100064167999650", icon: "f" },
    { name: "TikTok", url: "https://www.tiktok.com/@desafioslocosmty", icon: "♪" },
    { name: "YouTube", url: "", icon: "▶" },
    { name: "Instagram", url: "", icon: "◎" }
  ],
  products: [
    { name: "Producto de ejemplo 1", category: "Categoría 1", description: "Aquí puedes escribir una breve descripción de tu producto.", price: "Consultar precio", image: "", emoji: "📦" },
    { name: "Producto de ejemplo 2", category: "Categoría 1", description: "Agrega información útil para que tus clientes lo conozcan.", price: "Consultar precio", image: "", emoji: "🎁" },
    { name: "Producto de ejemplo 3", category: "Categoría 2", description: "Puedes colocar una fotografía y todos sus detalles.", price: "Consultar precio", image: "", emoji: "✨" }
  ],
  videos: [
    // Agrega videos de YouTube usando su ID. Ejemplo: https://www.youtube.com/watch?v=XXXXXXXXXXX
    // { title: "Nuestro video", youtubeId: "XXXXXXXXXXX" }
  ]
};

const $ = (selector) => document.querySelector(selector);
const waUrl = (message = CONFIG.whatsappMessage) => CONFIG.whatsappNumber
  ? `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`
  : "https://wa.me/?text=" + encodeURIComponent(message);

function applyBrand() {
  document.title = `${CONFIG.brandName} | Productos, videos y juegos`;
  $("#brandName").textContent = CONFIG.brandName;
  $("#footerBrand").textContent = CONFIG.brandName;
  $("#copyrightBrand").textContent = CONFIG.brandName;
  $("#announcement").textContent = CONFIG.announcement;
  $("#heroTitle").innerHTML = CONFIG.heroTitle.replace(/(extraordinario|divertido|especial)/i, '<span>$1</span>');
  $("#heroText").textContent = CONFIG.heroText;
  $("#year").textContent = new Date().getFullYear();
  ["#headerWhatsApp", "#heroWhatsApp", "#floatingWhatsApp"].forEach(sel => $(sel).href = waUrl());
}

function renderProducts(category = "Todos") {
  const categories = ["Todos", ...new Set(CONFIG.products.map(p => p.category))];
  $("#categoryFilters").innerHTML = categories.map(c =>
    `<button class="filter-chip ${c === category ? "active" : ""}" data-category="${escapeHTML(c)}">${escapeHTML(c)}</button>`
  ).join("");
  const products = CONFIG.products.filter(p => category === "Todos" || p.category === category);
  $("#productGrid").innerHTML = products.length ? products.map((p, i) => `
    <article class="product-card">
      <div class="product-image">${p.image ? `<img src="${escapeAttr(p.image)}" alt="${escapeAttr(p.name)}" loading="lazy">` : `<span>${escapeHTML(p.emoji || "📦")}</span>`}</div>
      <div class="product-info"><span class="product-category">${escapeHTML(p.category)}</span>
        <h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.description)}</p>
        <div class="product-bottom"><span class="product-price">${escapeHTML(p.price)}</span>
          <button class="product-ask" data-product="${i}">Preguntar ↗</button></div>
      </div>
    </article>`).join("") : '<div class="empty-products">Pronto agregaremos productos a esta categoría.</div>';
}

function renderVideos() {
  const videos = CONFIG.videos;
  $("#videoGrid").innerHTML = videos.length ? videos.map(v => `
    <article class="video-card"><div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.youtubeId)}" title="${escapeAttr(v.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="video-caption">${escapeHTML(v.title)}</div></article>`
  ).join("") : '<div class="video-card"><div class="video-placeholder">▶<br><br>Agrega aquí tus videos de YouTube.<br>También puedes compartir enlaces de TikTok y Facebook.</div></div><div class="video-card"><div class="video-placeholder">✦<br><br>Esta sección puede mostrar tus novedades,<br>demostraciones y promociones.</div></div>';
}

function renderSocial() {
  $("#socialLinks").innerHTML = CONFIG.social.map(s =>
    `<a class="social-link" href="${s.url ? escapeAttr(s.url) : "#redes"}" ${s.url ? 'target="_blank" rel="noopener"' : 'aria-disabled="true"'}><span>${escapeHTML(s.icon)}</span> ${escapeHTML(s.name)} ↗</a>`
  ).join("");
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function escapeAttr(value = "") { return escapeHTML(value); }

$("#categoryFilters").addEventListener("click", e => {
  const button = e.target.closest("[data-category]");
  if (button) renderProducts(button.dataset.category);
});
$("#productGrid").addEventListener("click", e => {
  const button = e.target.closest("[data-product]");
  if (!button) return;
  const p = CONFIG.products[Number(button.dataset.product)];
  window.open(waUrl(`Hola, me interesa ${p.name}. ¿Me puedes dar más información?`), "_blank", "noopener");
});
$("#menuToggle").addEventListener("click", () => {
  const open = $("#mainNav").classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded", String(open));
});
$("#mainNav").addEventListener("click", e => {
  if (e.target.closest("a")) {
    $("#mainNav").classList.remove("open");
    $("#menuToggle").setAttribute("aria-expanded", "false");
  }
});

// Juego de memoria
const symbols = ["🎈", "⭐", "🍀", "🎁", "🦄", "🎉"];
let deck = [], firstCard = null, lockBoard = false, moveCount = 0, matchCount = 0;
function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
function startGame() {
  deck = shuffle([...symbols, ...symbols]);
  firstCard = null; lockBoard = false; moveCount = 0; matchCount = 0;
  $("#moves").textContent = "0"; $("#matches").textContent = "0/6";
  $("#memoryBoard").innerHTML = deck.map((symbol, i) =>
    `<button class="memory-card" data-index="${i}" aria-label="Carta ${i + 1}">?</button>`
  ).join("");
}
$("#memoryBoard").addEventListener("click", e => {
  const card = e.target.closest(".memory-card");
  if (!card || lockBoard || card.classList.contains("revealed") || card.classList.contains("matched")) return;
  const index = Number(card.dataset.index);
  card.textContent = deck[index]; card.classList.add("revealed");
  if (!firstCard) { firstCard = card; return; }
  moveCount++; $("#moves").textContent = moveCount;
  const firstIndex = Number(firstCard.dataset.index);
  if (deck[firstIndex] === deck[index]) {
    firstCard.classList.add("matched"); card.classList.add("matched");
    firstCard = null; matchCount++; $("#matches").textContent = `${matchCount}/6`;
    if (matchCount === 6) setTimeout(() => alert(`¡Lo lograste! Encontraste todas las parejas en ${moveCount} movimientos.`), 250);
  } else {
    lockBoard = true;
    const previous = firstCard; firstCard = null;
    setTimeout(() => {
      previous.textContent = "?"; card.textContent = "?";
      previous.classList.remove("revealed"); card.classList.remove("revealed");
      lockBoard = false;
    }, 850);
  }
});
$("#restartGame").addEventListener("click", startGame);

applyBrand();
renderProducts();
renderVideos();
renderSocial();
startGame();