window.addEventListener('load', () => {
    // Get references to the necessary elements
    const bg = document.getElementById('bg');
    const hero = document.querySelector('.hero');
    const button = document.querySelector('.cta-button');
    const projectsGrid = document.querySelector('.projects-grid');
    const body = document.body;

    // Fade in the background after the hero and button appear
    setTimeout(() => {
        bg.style.opacity = 1; // Trigger background fade-in
    }, 1000); // Wait for the animations to complete (adjust timing if necessary)

    // Add click event listener to the CTA button
    button.addEventListener('click', () => {
        // Step 1: Apply gradual blur to the background
        bg.style.transition = 'filter 2s ease';  // Slow down the blur transition
        bg.style.filter = 'blur(10px)'; // Apply blur (increase px for more blur effect)

        // Step 2: Wait for the blur to finish before shifting the hero section
        setTimeout(() => {
            // Step 3: Add 'shifted' class to hero section to trigger its movement animation
            hero.classList.add('shifted');
            
            // Step 4: After the hero section finishes its animation, show the projects grid
            setTimeout(() => {
                projectsGrid.classList.add('visible');
                body.classList.add('can-scroll'); // Enable scrolling
            }, 1500); // Time for the hero section's movement (adjust timing if necessary)
        }, 900); // Wait for the blur effect to complete (should match the transition duration)
    });
});
