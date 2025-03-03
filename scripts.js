
// When the body is clicked, remove loading screen and show content
document.body.addEventListener("click", function() {
    document.getElementById("loading-screen").style.opacity = "0"; // Fade out loading text
    setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none"; // Hide the loading screen
        document.querySelector(".container").classList.add("show"); // Show the container with smooth effect
    }, 500); // Wait for fade-out animation to finish
});

// Add a mousemove event listener to create the smooth 3D tilt effect on the whole document
const container = document.querySelector('.tilt');
let isMouseOnScreen = true;

document.addEventListener('mousemove', function(e) {
    if (!isMouseOnScreen) return;

    // Reduce the tilt strength by using a larger divisor (e.g., 30 or 40)
    const x = (e.pageX - window.innerWidth / 2) / 30; // Smaller horizontal tilt effect
    const y = (e.pageY - window.innerHeight / 2) / 30; // Smaller vertical tilt effect

    // Apply the smooth and subtle 3D effect to the container
    container.style.transform = `rotateX(${y}deg) rotateY(${-x}deg)`; // Invert X tilt for correct behavior
});

// Stop the tilt effect when the mouse leaves the screen
document.addEventListener('mouseleave', function() {
    isMouseOnScreen = false;
    container.style.transform = "rotateX(0deg) rotateY(0deg)"; // Reset tilt to default
});

// Reactivate tilt when the mouse enters the screen again
document.addEventListener('mouseenter', function() {
    isMouseOnScreen = true;
});
