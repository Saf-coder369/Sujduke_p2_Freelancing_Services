document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    const PHONE_NUMBER = "918593904483"; // Target phone number

    // 1. WhatsApp Booking Form Handler
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('studentName').value.trim();
            const studentClass = document.getElementById('studentClass').value.trim();
            const service = document.getElementById('serviceType').value;
            const phone = document.getElementById('studentPhone').value.trim();

            if (!name || !studentClass || !service || !phone) {
                alert('Please fill out all mandatory fields.');
                return;
            }

            // Construct formatted WhatsApp booking message
            const message = 
                `Hello Sujan (P² Freelancing),%0A%0A` +
                `I would like to book a service request:%0A` +
                `• *Name:* ${encodeURIComponent(name)}%0A` +
                `• *Class/Course:* ${encodeURIComponent(studentClass)}%0A` +
                `• *Service Requested:* ${encodeURIComponent(service)}%0A` +
                `• *Phone:* ${encodeURIComponent(phone)}%0A%0A` +
                `_(please share documents/photos in this chat context.)_`;

            const whatsappURL = `https://wa.me/${PHONE_NUMBER}?text=${message}`;
            window.open(whatsappURL, '_blank');
        });
    }

    // 2. Navigation Active State on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = 'home';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
});