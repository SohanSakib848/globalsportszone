function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.toggle('dark-mode');

    // Update styles based on the dark mode state
    if (isDarkMode) {
        // Dark mode styles
        body.style.backgroundColor = '#1a1a1a';
        // Add more styles as needed
    } else {
        // Light mode styles
        body.style.backgroundColor = '#f5f5f5';
        // Add more styles as needed
    }
    document.addEventListener('DOMContentLoaded', function () {
        const sliderItems = document.querySelectorAll('.slider-item');
    
        sliderItems.forEach(item => {
            item.addEventListener('click', function () {
                this.classList.toggle('show-details');
            });
        });
    });

}