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
}

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