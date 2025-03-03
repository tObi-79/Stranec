document.addEventListener("mousemove", (e) => {
    const container = document.querySelector('.container');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    // Tilt effect for both axes
    const tiltX = mouseY * 20; // X-axis tilt range
    const tiltY = -mouseX * 20; // Y-axis tilt range
    
    container.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
});

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById("loading-screen");
        const container = document.querySelector(".container");

        // Fade out the loading screen and show the container
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
            loadingScreen.style.display = "none";
            container.classList.add("show");
        }, 500);
    }, 2000); // Show loading screen for 2 seconds before fading it out
});
