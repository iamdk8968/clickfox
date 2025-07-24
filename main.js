/*--------------------------------------------------------------
# Main JavaScript File
--------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS Animation Library
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false,
        offset: 50
    });

    // Typed.js for Hero Section
    const typed = new Typed('.typed-text', {
        strings: ['Digital Excellence', 'Creative Solutions', 'Strategic Marketing', 'Innovative Designs'],
        typeSpeed: 80,
        backSpeed: 40,
        backDelay: 2000,
        loop: true
    });
    //logo change on scroll
    const logo = document.getElementById('logo');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            logo.src = 'assets/images/logo.png';
        } else {
            logo.src = 'assets/images/white_logo.png';
        }
    });

    // Sticky Navbar
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const scrollTop = document.querySelector('.scroll-top');

    window.addEventListener('scroll', function() {
        // Sticky Navbar
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Scroll to Top Button
        if (window.scrollY > 500) {
            scrollTop.classList.add('active');
        } else {
            scrollTop.classList.remove('active');
        }

        // Active Nav Link on Scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Hamburger Animation
    document.querySelector('.hamburger').addEventListener('click', function() {
        this.classList.toggle('active');
    });

    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Testimonial Slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(index) {
        testimonialItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        testimonialItems[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialItems.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialItems.length) % testimonialItems.length;
        showSlide(currentSlide);
    }

    // Event listeners for testimonial controls
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto slide for testimonials
    let testimonialInterval = setInterval(nextSlide, 5000);

    // Pause auto slide on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });

    testimonialSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextSlide, 5000);
    });

    // Scroll to Top Button Click
    scrollTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state
        submitBtn.classList.add('loading');
        
        // Simulate form submission (replace with actual form submission)
        setTimeout(function() {
            // Remove loading state
            submitBtn.classList.remove('loading');
            
            // Show success message
            const formData = new FormData(contactForm);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us, ${formValues.name}. We'll get back to you shortly.</p>
            `;
            
            // Replace form with success message
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
            
            // Reset form after 5 seconds
            setTimeout(function() {
                contactForm.innerHTML = `
                    <div class="form-group">
                        <input type="text" id="name" name="name" placeholder="Your Name" required>
                    </div>
                    <div class="form-group">
                        <input type="email" id="email" name="email" placeholder="Your Email" required>
                    </div>
                    <div class="form-group">
                        <select id="service" name="service" required>
                            <option value="" disabled selected>Select Service</option>
                            <option value="seo">SEO</option>
                            <option value="video">Video Editing</option>
                            <option value="graphic">Graphic Designing</option>
                            <option value="web">Website Design & Development</option>
                            <option value="social">Social Media Management</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <textarea id="message" name="message" placeholder="Your Message" required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">
                        <span class="btn-text">Send Message</span>
                        <span class="btn-icon"><i class="fas fa-paper-plane"></i></span>
                        <span class="btn-loading"><i class="fas fa-spinner fa-spin"></i></span>
                    </button>
                `;
            }, 5000);
        }, 2000);
    });

    // Add CSS class for hamburger animation
    document.querySelector('.hamburger').addEventListener('click', function() {
        this.classList.toggle('active');
    });

    // Add CSS for hamburger animation
    const style = document.createElement('style');
    style.textContent = `
        .hamburger.active {
            background-color: transparent;
        }
        
        .hamburger.active::before {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active::after {
            transform: translateY(-8px) rotate(-45deg);
        }
    `;
    document.head.appendChild(style);

    // Add success message styling
    const successStyle = document.createElement('style');
    successStyle.textContent = `
        .success-message {
            text-align: center;
            padding: 30px;
            animation: fadeIn 0.5s ease;
        }
        
        .success-icon {
            font-size: 50px;
            color: #4CAF50;
            margin-bottom: 20px;
        }
        
        .success-message h3 {
            margin-bottom: 15px;
            color: #333;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(successStyle);
});