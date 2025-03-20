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

var loadingScreen = document.getElementById("loading-screen");
var overlay = document.getElementById("overlay");
var container = document.querySelector(".container");
var backgroundMusic = document.getElementById("background-music");

window.onload = function() {
    setTimeout(() => {
        loadingScreen.style.display = "none"; // Hide the loading screen
        overlay.style.display = "flex"; // Show the overlay
    }, 500); // Delay to allow loading
};

overlay.addEventListener("click", () => {
    overlay.style.display = "none"; // Hide the overlay when clicked
    container.style.display = "block"; // Show the main content (icons and text)
    
    // Play background music when overlay is clicked
    backgroundMusic.play();
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
// discord
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