// ============ script-producto.js ============
// Maneja vista-producto.html: arma la ficha del producto según el
// parámetro "id" de la URL (ej: vista-producto.html?id=arabe-1), la
// galería de imágenes, videos de YouTube, el stepper de cantidad y los botones de compra.

const PRODUCTS = {
  "oferta-1": {
    nombre: "Velvore Noire",
    categoria: "Ofertas",
    badge: "Oferta",
    precio: "$ 18.000",
    precioAnterior: "$ 22.000",
    descripcionCorta: "Notas de ámbar, cuero y vainilla. Intensa y envolvente.",
    descripcionCompleta: "Velvore Noire es una fragancia intensa pensada para la noche: ámbar y cuero como base, con un toque final de vainilla que la hace envolvente sin ser empalagosa. Ideal para quienes buscan dejar una impresión duradera.",
    notas: { salida: "Bergamota, pimienta negra", corazon: "Cuero, incienso", fondo: "Ámbar, vainilla" },
    imagenes: [
      { src: "images/producto1.jpeg", alt: "Velvore Noire — Foto principal" },
      { src: "images/producto1-detalle.jpeg", alt: "Velvore Noire — Frasco de cerca" },
      { src: "images/producto1-caja.jpeg", alt: "Velvore Noire — Packaging" }
    ],
    // ID de YouTube (ejemplo: si el link es https://www.youtube.com/watch?v=dQw4w9WgXcQ, poné "dQw4w9WgXcQ")
    videoYoutubeId: "dQw4w9WgXcQ"
  },

  "arabe-1": {
    nombre: "Velvore Al-Asad",
    categoria: "Perfumes Árabes",
    badge: "Más vendido",
    precio: "$ 25.000",
    precioAnterior: "",
    descripcionCorta: "Oud, rosa y azafrán. Una fragancia árabe intensa y de larga fijación.",
    descripcionCompleta: "Velvore Al-Asad ('el león', en árabe) es nuestra fragancia árabe más pedida: concentrada, cálida y de una fijación que acompaña todo el día sin perder fuerza.",
    notas: { salida: "Azafrán, cardamomo", corazon: "Rosa turca, oud", fondo: "Almizcle, madera de agar" },
    imagenes: [
      { src: "images/arabe1.jpeg", alt: "Velvore Al-Asad — Foto principal" },
      { src: "images/arabe1-detalle.jpeg", alt: "Velvore Al-Asad — Detalle" }
    ],
    videoYoutubeId: null
  },

  "nicho-1": {
    nombre: "Velvore Iris Rare",
    categoria: "Perfumes Nichos",
    badge: "Exclusivo",
    precio: "$ 32.000",
    precioAnterior: "",
    descripcionCorta: "Iris, violeta y sándalo. Fragancia exclusiva, en edición limitada.",
    descripcionCompleta: "Velvore Iris Rare es una fragancia de nicho, elaborada en lotes reducidos: fresca al principio, con un corazón floral delicado y un fondo amaderado.",
    notas: { salida: "Bergamota, pomelo", corazon: "Iris, violeta", fondo: "Sándalo, almizcle blanco" },
    imagenes: [
      { src: "images/nicho1.jpeg", alt: "Velvore Iris Rare — Foto principal" }
    ],
    videoYoutubeId: null
  }
};

function getQueryParams() {
  return new URLSearchParams(window.location.search);
}

function buildFallbackProduct(params) {
  const nombre = params.get("nombre") || "Nombre del perfume";
  const badge = params.get("badge") || "";
  const precio = params.get("precio") || "$ ----";
  const precioAnterior = params.get("precioAnterior") || "";
  const imagenUrl = params.get("imagen") || "";

  return {
    nombre,
    categoria: "",
    badge,
    precio,
    precioAnterior,
    descripcionCorta: "Descripción breve de la fragancia y sus notas principales.",
    descripcionCompleta: "Todavía no cargaste la descripción completa de este producto en la base de datos JS.",
    notas: { salida: "—", corazon: "—", fondo: "—" },
    imagenes: [{ src: imagenUrl, alt: nombre }],
    videoYoutubeId: null
  };
}

function renderGallery(producto) {
  const mainImgTag = document.getElementById("pv-main-img-tag");
  const mainFrame = document.getElementById("pv-main-image");
  const thumbsWrap = document.getElementById("pv-thumbs");
  
  if (!thumbsWrap) return;
  thumbsWrap.innerHTML = "";

  const imagenes = producto.imagenes && producto.imagenes.length 
    ? producto.imagenes 
    : [{ src: "", alt: producto.nombre }];

  const setMain = (img) => {
    if (mainImgTag) {
      mainImgTag.src = img.src || "";
      mainImgTag.alt = img.alt || producto.nombre;
    }
    if (mainFrame) {
      mainFrame.setAttribute("data-label", img.alt || producto.nombre);
    }
  };

  setMain(imagenes[0]);

  // Si solo hay 1 imagen, no hace falta generar la barra de miniaturas
  if (imagenes.length <= 1) return;

  imagenes.forEach((img, i) => {
    const thumb = document.createElement("button");
    thumb.type = "button";
    thumb.className = "pv-thumb" + (i === 0 ? " active" : "");
    thumb.setAttribute("aria-label", `Ver imagen ${i + 1}`);

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

function renderVideo(producto) {
  const wrap = document.getElementById("pv-video-wrap");
  const frame = document.getElementById("pv-video-frame");

  if (!wrap || !frame) return;

  if (!producto.videoYoutubeId) {
    wrap.style.display = "none";
    frame.innerHTML = "";
    return;
  }

  wrap.style.display = "block";
  frame.innerHTML = `
    <iframe 
      width="100%" 
      height="315" 
      src="https://www.youtube.com/embed/${producto.videoYoutubeId}" 
      title="Video del producto" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen 
      loading="lazy">
    </iframe>`;
}

function renderProduct(producto) {
  const pageTitle = document.getElementById("pageTitle");
  if (pageTitle) pageTitle.textContent = `${producto.nombre} — Velvore Perfum`;

  const title = document.getElementById("pv-title");
  if (title) title.textContent = producto.nombre;

  const price = document.getElementById("pv-price");
  if (price) price.textContent = producto.precio;

  const oldPriceEl = document.getElementById("pv-price-old");
  if (oldPriceEl) {
    if (producto.precioAnterior) {
      oldPriceEl.textContent = producto.precioAnterior;
      oldPriceEl.style.display = "";
    } else {
      oldPriceEl.style.display = "none";
    }
  }

  const badgeEl = document.getElementById("pv-badge");
  if (badgeEl) {
    if (producto.badge) {
      badgeEl.textContent = producto.badge;
      badgeEl.style.display = "";
    } else {
      badgeEl.style.display = "none";
    }
  }

  const shortDesc = document.getElementById("pv-short-desc");
  if (shortDesc) shortDesc.textContent = producto.descripcionCorta;

  const fullDesc = document.getElementById("pv-full-desc");
  if (fullDesc) fullDesc.textContent = producto.descripcionCompleta;

  const topNotes = document.getElementById("pv-notes-top");
  if (topNotes) topNotes.textContent = producto.notas.salida;

  const heartNotes = document.getElementById("pv-notes-heart");
  if (heartNotes) heartNotes.textContent = producto.notas.corazon;

  const baseNotes = document.getElementById("pv-notes-base");
  if (baseNotes) baseNotes.textContent = producto.notas.fondo;

  renderGallery(producto);
  renderVideo(producto);
}

function initQtyStepper() {
  const input = document.getElementById("pv-qty");
  const minus = document.getElementById("pv-qty-minus");
  const plus = document.getElementById("pv-qty-plus");

  if (!input || !minus || !plus) return;

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

function initActions(producto) {
  const getCantidad = () => {
    const input = document.getElementById("pv-qty");
    return input ? input.value || 1 : 1;
  };

  const btnAddCart = document.getElementById("pv-add-cart");
  if (btnAddCart) {
    btnAddCart.addEventListener("click", () => {
      alert(`Agregado al carrito: ${getCantidad()} x ${producto.nombre}.`);
    });
  }

  const btnBuyNow = document.getElementById("pv-buy-now");
  if (btnBuyNow) {
    btnBuyNow.addEventListener("click", () => {
      alert(`Comprar ahora: ${getCantidad()} x ${producto.nombre}.`);
    });
  }
}

function initBackLink() {
  const backLink = document.getElementById("pv-back-link");
  if (backLink && document.referrer && document.referrer.includes(window.location.host)) {
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