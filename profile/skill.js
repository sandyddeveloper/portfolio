document.addEventListener('DOMContentLoaded', function () {
  
    const progressBarElements = document.querySelectorAll('.progress-bar');
    
    function animateProgressBar() {
        progressBarElements.forEach(progressBar => {
            const targetValue = progressBar.getAttribute('data-value');
            const progressElement = progressBar.querySelector('.progress');
            
            let currentValue = 0;
            const animation = setInterval(() => {
                if (currentValue >= targetValue) {
                    clearInterval(animation);
                } else {
                    currentValue++;
                    progressElement.style.width = currentValue + '%';
                }
            }, 10);
        });
    }

   
    window.addEventListener('scroll', function () {
        const skillsSection = document.querySelector('.skills');
        const skillsSectionPosition = skillsSection.offsetTop - window.innerHeight;

        if (window.scrollY > skillsSectionPosition) {
            animateProgressBar();
        }
    });
});
