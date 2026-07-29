// ============ script-producto.js ============
// Maneja vista-producto.html: arma la ficha del producto según el
// parámetro "id" de la URL (ej: vista-producto.html?id=arabe-1), la
// galería de imágenes, el stepper de cantidad y los botones de compra.
//
// CÓMO CARGAR UN PRODUCTO REAL:
// Agregá una entrada al objeto PRODUCTS de acá abajo, usando como
// clave el mismo "id" que le pusiste en el link del catálogo
// (catalogo-ofertas.html, catalogo-perfumes-arabes.html o
// catalogo-perfumes-nichos.html). Con eso ya se completan fotos,
// video, precio, descripción y notas olfativas.
//
// Si un producto TODAVÍA no tiene entrada acá, la página igual
// funciona: arma una ficha genérica usando el nombre, precio y
// badge que vengan en la URL (?nombre=...&precio=...&badge=...),
// y deja las imágenes como placeholder hasta que la completes.

const PRODUCTS = {
  "oferta-1": {
    nombre: "Velvore Noire",
    categoria: "Ofertas",
    badge: "Oferta",
    precio: "$ ----",
    precioAnterior: "$ ----",
    descripcionCorta: "Notas de ámbar, cuero y vainilla. Intensa y envolvente.",
    descripcionCompleta: "Velvore Noire es una fragancia intensa pensada para la noche: ámbar y cuero como base, con un toque final de vainilla que la hace envolvente sin ser empalagosa. Ideal para quienes buscan dejar una impresión duradera.",
    notas: { salida: "Bergamota, pimienta negra", corazon: "Cuero, incienso", fondo: "Ámbar, vainilla" },
    // Reemplazá estas rutas por las fotos reales del producto (podés poner hasta 5 o 6)
    imagenes: [
      { src: "", alt: "Velvore Noire — foto principal" },
      { src: "", alt: "Velvore Noire — frasco de cerca" },
      { src: "", alt: "Velvore Noire — packaging" }
    ],
    // Video opcional: ID de YouTube (lo que va después de "v=" en la URL del video). Dejalo en null si no hay video.
    videoYoutubeId: null
  },

  "arabe-1": {
    nombre: "Perfume árabe 1",
    categoria: "Perfumes Árabes",
    badge: "Más vendido",
    precio: "$ ----",
    precioAnterior: "",
    descripcionCorta: "Fragancia árabe intensa y de larga fijación.",
    descripcionCompleta: "Una fragancia árabe clásica, concentrada, pensada para durar todo el día en la piel. Ideal para quienes buscan un aroma presente sin volverse invasivo.",
    notas: { salida: "Azafrán, cardamomo", corazon: "Rosa, oud", fondo: "Almizcle, madera de agar" },
    imagenes: [
      { src: "", alt: "Perfume árabe 1 — foto principal" },
      { src: "", alt: "Perfume árabe 1 — frasco de cerca" }
    ],
    videoYoutubeId: null
  },

  "nicho-1": {
    nombre: "Perfume nicho 1",
    categoria: "Perfumes Nichos",
    badge: "Exclusivo",
    precio: "$ ----",
    precioAnterior: "",
    descripcionCorta: "Fragancia exclusiva, en edición limitada.",
    descripcionCompleta: "Una fragancia de nicho, elaborada en lotes reducidos, pensada para quienes buscan algo distinto a lo que se consigue en cualquier lado.",
    notas: { salida: "Bergamota, pomelo", corazon: "Iris, violeta", fondo: "Sándalo, almizcle blanco" },
    imagenes: [
      { src: "", alt: "Perfume nicho 1 — foto principal" },
      { src: "", alt: "Perfume nicho 1 — frasco de cerca" }
    ],
    videoYoutubeId: null
  }

  // Agregá más productos acá abajo con el mismo formato, separados por coma.
};

function getQueryParams(){
  return new URLSearchParams(window.location.search);
}

function buildFallbackProduct(params){
  const nombre = params.get("nombre") || "Nombre del perfume";
  const badge = params.get("badge") || "";
  const precio = params.get("precio") || "$ ----";
  return {
    nombre,
    categoria: "",
    badge,
    precio,
    precioAnterior: "",
    descripcionCorta: "Descripción breve de la fragancia y sus notas principales.",
    descripcionCompleta: "Todavía no cargaste la descripción completa de este producto. Agregá una entrada para este id en PRODUCTS, dentro de js/script-producto.js, con fotos, precio y descripción reales.",
    notas: { salida: "—", corazon: "—", fondo: "—" },
    imagenes: [{ src: "", alt: nombre }],
    videoYoutubeId: null
  };
}

function renderGallery(producto){
  const mainImgTag = document.getElementById("pv-main-img-tag");
  const mainFrame = document.getElementById("pv-main-image");
  const thumbsWrap = document.getElementById("pv-thumbs");
  thumbsWrap.innerHTML = "";

  const imagenes = producto.imagenes && producto.imagenes.length ? producto.imagenes : [{ src: "", alt: producto.nombre }];

  const setMain = (img) => {
    mainImgTag.src = img.src || "";
    mainImgTag.alt = img.alt || producto.nombre;
    mainFrame.setAttribute("data-label", img.alt || producto.nombre);
  };
  setMain(imagenes[0]);

  imagenes.forEach((img, i) => {
    const thumb = document.createElement("button");
    thumb.type = "button";
    thumb.className = "pv-thumb" + (i === 0 ? " active" : "");
    thumb.setAttribute("aria-label", "Ver imagen " + (i + 1));
    const thumbImg = document.createElement("img");
    thumbImg.src = img.src || "";
    thumbImg.alt = img.alt || producto.nombre;
    thumb.appendChild(thumbImg);

    thumb.addEventListener("click", () => {
      setMain(img);
      thumbsWrap.querySelectorAll(".pv-thumb").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
    });

    thumbsWrap.appendChild(thumb);
  });
}

function renderVideo(producto){
  const wrap = document.getElementById("pv-video-wrap");
  const frame = document.getElementById("pv-video-frame");
  if (!producto.videoYoutubeId){
    wrap.hidden = true;
    return;
  }
  wrap.hidden = false;
  frame.innerHTML = `<iframe src="https://www.youtube.com/embed/${producto.videoYoutubeId}" title="Video del producto" allowfullscreen loading="lazy"></iframe>`;
}

function renderProduct(producto){
  document.getElementById("pageTitle").textContent = producto.nombre + " — Velvore Perfum";
  document.getElementById("pv-title").textContent = producto.nombre;
  document.getElementById("pv-price").textContent = producto.precio;

  const oldPriceEl = document.getElementById("pv-price-old");
  if (producto.precioAnterior){
    oldPriceEl.textContent = producto.precioAnterior;
    oldPriceEl.style.display = "";
  } else {
    oldPriceEl.style.display = "none";
  }

  const badgeEl = document.getElementById("pv-badge");
  if (producto.badge){
    badgeEl.textContent = producto.badge;
    badgeEl.style.display = "";
  } else {
    badgeEl.style.display = "none";
  }

  document.getElementById("pv-short-desc").textContent = producto.descripcionCorta;
  document.getElementById("pv-full-desc").textContent = producto.descripcionCompleta;
  document.getElementById("pv-notes-top").textContent = producto.notas.salida;
  document.getElementById("pv-notes-heart").textContent = producto.notas.corazon;
  document.getElementById("pv-notes-base").textContent = producto.notas.fondo;

  renderGallery(producto);
  renderVideo(producto);
}

function initQtyStepper(){
  const input = document.getElementById("pv-qty");
  const minus = document.getElementById("pv-qty-minus");
  const plus = document.getElementById("pv-qty-plus");

  minus.addEventListener("click", () => {
    const value = Math.max(1, (parseInt(input.value, 10) || 1) - 1);
    input.value = value;
  });
  plus.addEventListener("click", () => {
    const value = (parseInt(input.value, 10) || 1) + 1;
    input.value = value;
  });
  input.addEventListener("change", () => {
    if (!input.value || parseInt(input.value, 10) < 1) input.value = 1;
  });
}

function initActions(producto){
  const cantidad = () => document.getElementById("pv-qty").value || 1;

  document.getElementById("pv-add-cart").addEventListener("click", () => {
    alert(`Agregado al carrito (demo): ${cantidad()} x ${producto.nombre}. Conectá esto a tu sistema de carrito/tienda real.`);
  });

  document.getElementById("pv-buy-now").addEventListener("click", () => {
    alert(`Compra ahora (demo): ${cantidad()} x ${producto.nombre}. Conectá esto a tu pasarela de pago o a WhatsApp para coordinar la compra.`);
  });
}

function initBackLink(){
  const backLink = document.getElementById("pv-back-link");
  // Si vino de una página del mismo sitio (un catálogo), "Volver" lleva ahí.
  // Si no (por ejemplo entró directo por este link), lleva al inicio.
  if (document.referrer && document.referrer.includes(window.location.host)){
    backLink.href = document.referrer;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const params = getQueryParams();
  const id = params.get("id");
  const producto = (id && PRODUCTS[id]) ? PRODUCTS[id] : buildFallbackProduct(params);

  renderProduct(producto);
  initQtyStepper();
  initActions(producto);
  initBackLink();
});