let baseTitle = "t0bi.xyz"; // Your name
let currentTitle = baseTitle;
let removing = true; // Start by removing letters
let index = baseTitle.length;

function animateTitle() {
    if (removing) {
        index--; // Remove letters one by one
        if (index === 0) removing = false; // Switch to adding letters back
    } else {
        index++; // Add letters back one by one
        if (index === baseTitle.length) removing = true; // Switch to removing again
    }

    document.title = baseTitle.substring(0, index); // Update title text
}

setInterval(animateTitle, 700); // Change title every 500ms (adjust speed if needed)


document.addEventListener("mousemove", (e) => {
    const container = document.querySelector('.container');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    const tiltX = mouseY * 20;
    const tiltY = -mouseX * 20;

    container.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
});

document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading-screen");
    const container = document.querySelector(".container");
    const audio = document.getElementById("background-music");
    const playButton = document.getElementById("play-music");

    function continueLoading() {
        // Fade out the loading screen
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
            loadingScreen.style.display = "none";
            container.classList.add("show");

            // Try to play music after user interaction
            playAudio();
        }, 500);
    }

    function playAudio() {
        audio.play().then(() => {
            console.log("Music playing after user interaction.");
        }).catch(() => {
            console.warn("Autoplay blocked, showing play button.");
            playButton.style.display = "block";
        });

        // Allow manual play if needed
        playButton.addEventListener("click", () => {
            audio.play();
            playButton.style.display = "none";
        });
    }

    // Wait for user to click before continuing
    loadingScreen.addEventListener("click", continueLoading, { once: true });
});


var dots = [],
    mouse = { x: 0, y: 0 };

var Dot = function() {
    this.x = 0;
    this.y = 0;
    this.node = (function() {
        var n = document.createElement("div");
        n.className = "trail";
        document.body.appendChild(n);
        return n;
    })();
};

Dot.prototype.draw = function() {
    this.node.style.left = this.x + "px";
    this.node.style.top = this.y + "px";
};

for (var i = 0; i < 12; i++) {
    var d = new Dot();
    dots.push(d);
}

function draw() {
    var x = mouse.x,
        y = mouse.y;

    dots.forEach(function(dot, index, dots) {
        var nextDot = dots[index + 1] || dots[0];
        dot.x = x;
        dot.y = y;
        dot.draw();
        x += (nextDot.x - dot.x) * .6;
        y += (nextDot.y - dot.y) * .6;
    });
}

addEventListener("mousemove", function(event) {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
});

function animate() {
    draw();
    requestAnimationFrame(animate);
}

