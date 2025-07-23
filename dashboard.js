document.addEventListener('DOMContentLoaded', function() {
    // Mobile sidebar toggle
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.header-left').prepend(mobileToggle);
    
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    mobileToggle.addEventListener('click', function() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    });
    
    overlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // Profile dropdown
    const profileDropdown = document.querySelector('.profile-dropdown');
    if (profileDropdown) {
        const dropdownToggle = profileDropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = profileDropdown.querySelector('.dropdown-menu');
        
        dropdownToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            dropdownMenu.style.display = 'none';
        });
    }
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            // Here you would typically load different data based on the selected tab
        });
    });
    
    // Pagination functionality
    const nextPageBtn = document.querySelector('.pagination-btn:not(:disabled)');
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            // Here you would load the next page of data
            console.log('Loading next page...');
        });
    }
    
    // View details button functionality
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.closest('tr').querySelector('td:first-child').textContent;
            alert(`Viewing details for booking ${bookingId}`);
            // Here you would typically open a modal or navigate to a details page
        });
    });
    
    // Initialize circular progress
    const progressCircle = document.querySelector('.progress-ring-circle');
    if (progressCircle) {
        const radius = progressCircle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = circumference;
        
        // Set progress (75% in this case)
        const progress = 75;
        const offset = circumference - (progress / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
    }
    
    // Responsive adjustments
    function handleResize() {
        if (window.innerWidth > 992) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
});