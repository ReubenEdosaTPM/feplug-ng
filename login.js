document.addEventListener('DOMContentLoaded', function() {
    // ===== Existing Slide Functionality ===== //
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
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

    showSlide(0);
    startSlideShow();

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            startSlideShow();
        });
    });

    // ===== Password Toggle Functionality ===== //
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

    document.querySelector('.toggle-password').addEventListener('click', function() {
        const fieldId = this.getAttribute('data-target');
        togglePassword(fieldId);
    });

    // ===== Updated Form Submission (Now Redirects to Dashboard) ===== //
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Replace with actual authentication logic if needed
        // For now, redirect to dashboard after validation
        window.location.href = 'dashboard.html'; // Update path as needed
    });

    // ===== Existing Responsive Handling ===== //
    function handleResize() {
        document.body.style.overflow = window.innerWidth <= 992 ? 'auto' : 'hidden';
    }

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