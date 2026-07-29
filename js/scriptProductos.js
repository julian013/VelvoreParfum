// ============ scriptProductos.js ============
// Maneja los carruseles de productos (una fila por bloque) en las
// páginas de catálogo: catalogo-ofertas.html, catalogo-perfumes-arabes.html,
// catalogo-perfumes-nichos.html.
//
// Mobile/tablet: se desliza con el dedo de forma nativa (overflow-x + scroll-snap).
// Desktop: además se puede arrastrar con el mouse, y hay flechas para
// pasar de a una tarjeta.
//
// Nota: esto es independiente de js/script.js (que maneja el header y el
// "reveal" al hacer scroll) — cada página de catálogo carga ambos scripts.

document.querySelectorAll('.product-carousel-wrap').forEach(wrap => {
  const track = wrap.querySelector('.product-carousel-track');
  const prevBtn = wrap.querySelector('.product-carousel-arrow.prev');
  const nextBtn = wrap.querySelector('.product-carousel-arrow.next');
  if (!track) return;

  // Mover con las flechas: avanza el ancho de una tarjeta + el gap
  const scrollByCard = (direction) => {
    const firstCard = track.querySelector(':scope > *');
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const amount = firstCard ? firstCard.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  if (prevBtn) prevBtn.addEventListener('click', () => scrollByCard(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => scrollByCard(1));

  // Arrastrar con el mouse en desktop (el swipe táctil ya funciona solo)
  let isDown = false;
  let startX = 0;
  let scrollStart = 0;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('dragging');
    startX = e.pageX;
    scrollStart = track.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('dragging');
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.classList.remove('dragging');
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const delta = e.pageX - startX;
    track.scrollLeft = scrollStart - delta;
  });
});