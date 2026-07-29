// Carrusel de navegación: arrastrar con el mouse en desktop
// (en celular/tablet ya se puede deslizar con el dedo de forma nativa)
const navLinks = document.querySelector('.nav-links');
if (navLinks){
  let isDown = false;
  let startX = 0;
  let scrollStart = 0;

  navLinks.addEventListener('mousedown', (e) => {
    isDown = true;
    navLinks.classList.add('dragging');
    startX = e.pageX;
    scrollStart = navLinks.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    isDown = false;
    navLinks.classList.remove('dragging');
  });

  navLinks.addEventListener('mouseleave', () => {
    isDown = false;
    navLinks.classList.remove('dragging');
  });

  navLinks.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const delta = e.pageX - startX;
    navLinks.scrollLeft = scrollStart - delta;
  });

  // Evita que un arrastre se interprete como click en el link
  let dragDistance = 0;
  navLinks.addEventListener('mousedown', (e) => { dragDistance = 0; startX = e.pageX; });
  navLinks.addEventListener('mousemove', (e) => { if (isDown) dragDistance += Math.abs(e.pageX - startX); });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', (e) => {
      if (dragDistance > 5) e.preventDefault();
    });
  });

  // Flechas del carrusel de navegación (header)
  const navPrevBtn = document.querySelector('.nav-carousel-wrap .carousel-arrow.prev');
  const navNextBtn = document.querySelector('.nav-carousel-wrap .carousel-arrow.next');
  const scrollNavBy = (direction) => {
    const item = navLinks.querySelector('li');
    const gap = parseFloat(getComputedStyle(navLinks).gap) || 0;
    const step = item ? item.getBoundingClientRect().width + gap : navLinks.clientWidth * 0.4;
    navLinks.scrollBy({ left: direction * step * 3, behavior: 'smooth' });
  };
  if (navPrevBtn) navPrevBtn.addEventListener('click', () => scrollNavBy(-1));
  if (navNextBtn) navNextBtn.addEventListener('click', () => scrollNavBy(1));
}

// ============ CARRUSELES (Colección / Testimonios) ============
// En celular/tablet: se desliza con el dedo de forma nativa (overflow-x + scroll-snap).
// En desktop: además se puede arrastrar con el mouse, y hay flechas para pasar de a una tarjeta.
document.querySelectorAll('.carousel-wrap').forEach(wrap => {
  const track = wrap.querySelector('.carousel-track');
  const prevBtn = wrap.querySelector('.carousel-arrow.prev');
  const nextBtn = wrap.querySelector('.carousel-arrow.next');
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
  let dragDistance = 0;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    dragDistance = 0;
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
    dragDistance += Math.abs(delta);
    track.scrollLeft = scrollStart - delta;
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => io.observe(el));

// Formulario de contacto (ejemplo)
const contactForm = document.querySelector('#contacto form');
if (contactForm){
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Formulario de ejemplo — conectá esto a tu email o servicio de formularios.');
  });
}