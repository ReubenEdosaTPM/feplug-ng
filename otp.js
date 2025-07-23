document.addEventListener('DOMContentLoaded', function() {
    // Slide functionality
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

    // OTP input functionality
    const otpDigits = document.querySelectorAll('.otp-digit');
    
    otpDigits.forEach((digit, index) => {
        digit.addEventListener('input', function() {
            if (this.value.length === 1) {
                if (index < otpDigits.length - 1) {
                    otpDigits[index + 1].focus();
                }
            }
        });
        
        digit.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value.length === 0) {
                if (index > 0) {
                    otpDigits[index - 1].focus();
                }
            }
        });
    });

    // Countdown timer
    let timeLeft = 120; // 2 minutes in seconds
    const countdownElement = document.getElementById('countdown');
    const resendLink = document.getElementById('resendLink');
    let countdownInterval;

    function updateCountdown() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            resendLink.style.pointerEvents = 'auto';
            resendLink.style.opacity = '1';
            resendLink.style.cursor = 'pointer';
        } else {
            timeLeft--;
        }
    }

    function startCountdown() {
        timeLeft = 120;
        resendLink.style.pointerEvents = 'none';
        resendLink.style.opacity = '0.5';
        resendLink.style.cursor = 'default';
        clearInterval(countdownInterval);
        countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    // Resend OTP functionality
    resendLink.addEventListener('click', function(e) {
        e.preventDefault();
        startCountdown();
        alert('A new OTP has been sent to your email!');
    });

    // Form validation and submission
    const otpForm = document.getElementById('otpForm');
    otpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let otp = '';
        let isValid = true;
        
        otpDigits.forEach(digit => {
            otp += digit.value;
            if (!digit.value) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            alert('Please enter the complete 6-digit OTP code');
            return;
        }
        
        if (otp.length !== 6) {
            alert('OTP must be 6 digits');
            return;
        }
        
        // Form submission would go here
        alert('OTP verified successfully!');
        // Redirect to dashboard or next step
    });

    // Start the countdown on page load
    startCountdown();

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