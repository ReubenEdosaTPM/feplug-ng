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
    if (slides.length > 0) {  // Check if slides exist
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
    }

    // Password toggle functionality
    function togglePassword(fieldId) {
        const passwordField = document.getElementById(fieldId);
        if (!passwordField) return;  // Safety check
        
        const icon = passwordField.nextElementSibling;
        
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            passwordField.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    }

    // Attach toggle function to password fields
    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', function() {
            const fieldId = this.getAttribute('data-target');
            togglePassword(fieldId);
        });
    });

    // Password strength checker
    const newPassword = document.getElementById('newPassword');
    const strengthBars = document.querySelectorAll('.strength-bar');
    const strengthValue = document.getElementById('strengthValue');
    const confirmPassword = document.getElementById('confirmPassword');
    const passwordMatchText = document.getElementById('passwordMatchText');
    const requirementItems = {
        length: document.getElementById('req-length'),
        uppercase: document.getElementById('req-uppercase'),
        number: document.getElementById('req-number'),
        special: document.getElementById('req-special')
    };

    function checkPasswordStrength(password) {
        let strength = 0;
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password)
        };

        // Update requirement indicators
        Object.keys(requirements).forEach(key => {
            if (requirements[key]) {
                requirementItems[key].classList.add('valid');
            } else {
                requirementItems[key].classList.remove('valid');
            }
        });

        // Calculate strength score
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;

        // Update strength meter
        strengthBars.forEach((bar, index) => {
            bar.style.backgroundColor = index < strength ? getStrengthColor(strength) : '#cccccc'; // Fallback color
        });

        // Update strength text
        let strengthLevel = 'Weak';
        let strengthColor = '#ff4444'; // Fallback for --weak
        
        if (strength >= 4) {
            strengthLevel = 'Strong';
            strengthColor = '#00C851'; // Fallback for --strong
        } else if (strength >= 2) {
            strengthLevel = 'Medium';
            strengthColor = '#ffbb33'; // Fallback for --medium
        }
        
        strengthValue.textContent = strengthLevel;
        strengthValue.style.color = strengthColor;
        
        return strength;
    }

    function getStrengthColor(strength) {
        if (strength >= 4) return '#00C851'; // Fallback for --strong
        if (strength >= 2) return '#ffbb33'; // Fallback for --medium
        return '#ff4444'; // Fallback for --weak
    }

    function checkPasswordMatch() {
        if (!newPassword || !confirmPassword) return false; // Safety check
        
        if (confirmPassword.value && newPassword.value !== confirmPassword.value) {
            passwordMatchText.textContent = 'Passwords do not match';
            passwordMatchText.style.color = '#ff4444'; // Fallback for --weak
            return false;
        } else if (confirmPassword.value && newPassword.value === confirmPassword.value) {
            passwordMatchText.textContent = 'Passwords match';
            passwordMatchText.style.color = '#00C851'; // Fallback for --strong
            return true;
        } else {
            passwordMatchText.textContent = '';
            return false;
        }
    }

    if (newPassword) {
        newPassword.addEventListener('input', function() {
            checkPasswordStrength(this.value);
            checkPasswordMatch();
        });
    }

    if (confirmPassword) {
        confirmPassword.addEventListener('input', checkPasswordMatch);
    }

    // Form validation and submission
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = newPassword.value;
            const confirm = confirmPassword.value;
            
            // Validate password strength
            const strength = checkPasswordStrength(password);
            if (strength < 3) {
                alert('Please choose a stronger password');
                return;
            }
            
            // Validate password match
            if (password !== confirm) {
                alert('Passwords do not match');
                return;
            }
            
            // Validate all requirements
            const requirementsMet = Array.from(document.querySelectorAll('.password-requirements li.valid')).length === 4;
            if (!requirementsMet) {
                alert('Please meet all password requirements');
                return;
            }
            
            // Form submission would go here
            alert('Password reset successfully!');
            // Redirect to login or dashboard
        });
    }

    // Handle responsive adjustments
    function handleResize() {
        if (window.innerWidth <= 992) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }

    // Pause slideshow when tab is inactive
    if (slides.length > 0) {
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                clearInterval(slideInterval);
            } else {
                startSlideShow();
            }
        });
    }

    window.addEventListener('resize', handleResize);
    handleResize();
});