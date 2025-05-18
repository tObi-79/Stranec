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

    loadingScreen.addEventListener("click", () => {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
            loadingScreen.style.display = "none";
            container.classList.add("animate-from-top");
            playAudio();
        }, 500);
    }, { once: true });

    function playAudio() {
        audio.play().catch(() => {
            console.log("Audio play failed");
        });
    }
});

// Tilt effect
let mouse = { x: 0, y: 0 };
let isTiltUpdated = false;

addEventListener("mousemove", (event) => {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
    if (!isTiltUpdated) {
        requestAnimationFrame(() => {
            const container = document.querySelector('.container');
            const mouseX = mouse.x / window.innerWidth - 0.5;
            const mouseY = mouse.y / window.innerHeight - 0.5;
            const tiltX = -mouseY * 15;
            const tiltY = mouseX * 15;
            container.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            isTiltUpdated = false;
        });
        isTiltUpdated = true;
    }
});

// Discord username copy
function copyDiscordUsername() {
    const discordUsernameElement = document.getElementById('discord-username');
    const copyIcon = document.getElementById('copy-icon');
    const regularIcon = copyIcon.querySelector('.fa-regular');
    const solidIcon = copyIcon.querySelector('.fa-solid');
    const originalUsername = discordUsernameElement.textContent;

    const textarea = document.createElement('textarea');
    textarea.value = originalUsername;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    discordUsernameElement.textContent = 'Copied';
    regularIcon.style.display = 'none';
    solidIcon.style.display = 'inline-block';

    setTimeout(() => {
        discordUsernameElement.textContent = originalUsername;
        regularIcon.style.display = 'inline-block';
        solidIcon.style.display = 'none';
    }, 2000);
}

document.getElementById('discord-icon-container').addEventListener('click', function(e) {
    e.preventDefault();
    copyDiscordUsername();
});