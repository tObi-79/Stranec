let baseTitle = "t0bi.xyz";
let currentTitle = baseTitle;
let removing = true;
let index = baseTitle.length;

function animateTitle() {
    if (removing) {
        index--;
        if (index === 0) removing = false;
    } else {
        index++;
        if (index === baseTitle.length) removing = true;
    }

    document.title = baseTitle.substring(0, index);
}

setInterval(animateTitle, 700);

document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading-screen");
    const container = document.querySelector(".container");
    const audio = document.getElementById("background-music");
    const playButton = document.getElementById("play-music");

    function continueLoading() {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
            loadingScreen.style.display = "none";
            container.classList.add("show");

            playAudio();
        }, 500);
    }

    function playAudio() {
        audio.play().then(() => {
            console.log("Music playing.");
        }).catch(() => {
            playButton.style.display = "block";
        });

        playButton.addEventListener("click", () => {
            audio.play();
            playButton.style.display = "none";
        });
    }

    loadingScreen.addEventListener("click", continueLoading, { once: true });
});

var mouse = { x: 0, y: 0 };
let isTiltUpdated = false;  // Throttle flag for tilt

addEventListener("mousemove", (event) => {
    mouse.x = event.pageX;
    mouse.y = event.pageY;

    if (!isTiltUpdated) {
        requestAnimationFrame(() => {
            const container = document.querySelector('.container');
            const mouseX = mouse.x / window.innerWidth - 0.5;
            const mouseY = mouse.y / window.innerHeight - 0.5;

            const tiltX = -mouseY * 25;
            const tiltY = mouseX * 25;

            container.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

            isTiltUpdated = false;
        });

        isTiltUpdated = true;
    }
});
