document.addEventListener('DOMContentLoaded', () => {
    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Mensaje enviado con éxito!');
        contactForm.reset();
    });

    // Manejo del scroll para el navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            document.querySelector('header').style.top = '0';
            return;
        }
        
        if (currentScroll > lastScroll && !document.querySelector('header').classList.contains('scrolling-down')) {
            // Scrolling hacia abajo
            document.querySelector('header').style.top = '-100px';
            document.querySelector('header').classList.add('scrolling-down');
        } else if (currentScroll < lastScroll && document.querySelector('header').classList.contains('scrolling-down')) {
            // Scrolling hacia arriba
            document.querySelector('header').style.top = '0';
            document.querySelector('header').classList.remove('scrolling-down');
        }
        lastScroll = currentScroll;
    });
});
