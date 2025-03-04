document.addEventListener("mousemove", (e) => {
    const container = document.querySelector('.container');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    const tiltX = mouseY * 20;
    const tiltY = -mouseX * 20;

    container.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
});

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById("loading-screen");
        const container = document.querySelector(".container");

        loadingScreen.style.opacity = "0";
        setTimeout(() => {
            loadingScreen.style.display = "none";
            container.classList.add("show");
        }, 500);
    }, 2000);
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

