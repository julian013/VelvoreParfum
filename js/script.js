// Menú móvil
const toggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", isOpen);
        toggle.textContent = isOpen ? "✕" : "☰";
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.textContent = "☰";
        });
    });
}

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealEls.forEach(el => observer.observe(el));