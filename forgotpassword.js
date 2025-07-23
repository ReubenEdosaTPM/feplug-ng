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

    // Form validation and submission
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    forgotPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        
        // Basic validation
        if (!email) {
            alert('Please enter your email address');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Form submission would go here
        alert('Password reset link has been sent to your email!');
        this.reset();
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