document.addEventListener('DOMContentLoaded', function() {
    // Slide functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    let slideInterval;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show the selected slide
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Initialize slides
    showSlide(0);
    startSlideShow();

    // Add click event to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            startSlideShow();
        });
    });

    // Password toggle functionality
    function togglePassword(fieldId) {
        const passwordField = document.getElementById(fieldId);
        const icon = passwordField.nextElementSibling;
        
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            passwordField.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    }

    // Attach toggle function to password field
    document.querySelector('.toggle-password').addEventListener('click', function() {
        const fieldId = this.getAttribute('data-target');
        togglePassword(fieldId);
    });

    // Form validation and submission
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Basic validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Form submission would go here
        alert('Login successful!');
        // this.reset();
    });

    // Handle responsive adjustments
    function handleResize() {
        if (window.innerWidth <= 992) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }

    // Pause slideshow when tab is inactive
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(slideInterval);
        } else {
            startSlideShow();
        }
    });

    window.addEventListener('resize', handleResize);
    handleResize();
});