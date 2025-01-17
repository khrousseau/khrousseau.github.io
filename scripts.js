// When "See Through My Eyes" is clicked
document.querySelector('.cta-button').addEventListener('click', function(e) {
    e.preventDefault();  // Prevent default behavior of the link
    console.log('Button clicked'); // Check if the event is firing

    // Make the sticky header visible
    const header = document.querySelector('.sticky-header');
    header.classList.add('visible'); // Add 'visible' class to show the header

    // Reveal the gallery
    const gallery = document.querySelector('#gallery');
    gallery.classList.remove('hidden'); // Remove 'hidden' class to show the gallery

    // Hide the hero section
    const hero = document.querySelector('.hero');
    hero.classList.add('hidden'); // Add 'hidden' class to hide the hero section
});
