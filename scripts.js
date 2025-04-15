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
            container.classList.add("animate-from-top"); // <- animace po kliknutí
            playAudio();
        }, 500);
    }

    function playAudio() {
        audio.play().then(() => {
            console.log("Music playing.");
        }).catch(() => {
            playButton.style.display = "block";
        });

        playButton?.addEventListener("click", () => {
            audio.play();
            playButton.style.display = "none";
        });
    }

    loadingScreen.addEventListener("click", continueLoading, { once: true });
});

// TILT efekt
var mouse = { x: 0, y: 0 };
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

// DISCORD COPY
function copyDiscordUsername() {
    const discordUsernameElement = document.getElementById('discord-username');  
    const copyIcon = document.getElementById('copy-icon'); 
    const originalUsername = discordUsernameElement.textContent; 
    const regularIcon = copyIcon.querySelector('.fa-regular');
    const solidIcon = copyIcon.querySelector('.fa-solid');
    const textarea = document.createElement('textarea');
    textarea.value = discordUsernameElement.textContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    discordUsernameElement.textContent = 'Copied';
    regularIcon.style.display = 'none';
    solidIcon.style.display = 'inline-block';
    copyIcon.classList.add('copied');
    setTimeout(() => {
        discordUsernameElement.textContent = originalUsername;
        copyIcon.classList.remove('copied'); 
        regularIcon.style.display = 'inline-block';
        solidIcon.style.display = 'none'; 
    }, 2000); 
}

document.getElementById('discord-icon-container').addEventListener('click', copyDiscordUsername);
