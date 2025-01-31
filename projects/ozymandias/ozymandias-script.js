 let images = [
    "../../images/ozymandias/hd/oz_1.jpg",
    "../../images/ozymandias/hd/oz_2.jpg",
    "../../images/ozymandias/hd/oz_3.jpg",
    "../../images/ozymandias/hd/oz_4.jpg",
    "../../images/ozymandias/hd/oz_5.jpg",
    "../../images/ozymandias/hd/oz_6.jpg",
    "../../images/ozymandias/hd/oz_7.jpg",
    "../../images/ozymandias/hd/oz_8.jpg",
    "../../images/ozymandias/hd/oz_9.jpg"
];

let currentIndex = 0; // Keeps track of the current image index
let touchStartX = 0;

document.addEventListener("DOMContentLoaded", function () {
    // Ensure modal is hidden on page load
    document.getElementById("imageModal").style.display = "none";
});

function openImage(index) {
    currentIndex = index - 1; // Convert 1-based to 0-based index
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");

    if (images[currentIndex]) {
        modalImage.src = images[currentIndex];
        modal.style.display = "flex";
    }
}

function closeImage() {
    document.getElementById("imageModal").style.display = "none";
}

function prevImage(event) {
    event.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Ensure circular navigation
    document.getElementById("modalImage").src = images[currentIndex];
}

function nextImage(event) {
    event.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length; // Ensure circular navigation
    document.getElementById("modalImage").src = images[currentIndex];
}

document.addEventListener("keydown", function(event) {
    if (document.getElementById("imageModal").style.display === "flex") {
        if (event.key === "ArrowLeft") prevImage(event);
        if (event.key === "ArrowRight") nextImage(event);
    }
});

// Swipe Handling
document.getElementById("modalImage").addEventListener("touchstart", function(event) {
    touchStartX = event.touches[0].clientX;
});

document.getElementById("modalImage").addEventListener("touchend", function(event) {
    let touchEndX = event.changedTouches[0].clientX;
    let diff = touchStartX - touchEndX;

    if (diff > 50) nextImage(event);  // Swipe right to go to next image
    if (diff < -50) prevImage(event); // Swipe left to go to previous image
});