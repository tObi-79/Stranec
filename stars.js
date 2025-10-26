document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('stars');
    if (!container) return;

    function createStar() {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.backgroundColor = 'white';
        star.style.boxShadow = '0 0 4px white';
        star.style.opacity = 0.3 + Math.random() * 0.7;

        // Randomly choose starting position: top or right edge
        const startFromTop = Math.random() < 0.7; // 70% chance to start from top
        
        if (startFromTop) {
            // Start from top edge
            star.style.left = Math.random() * window.innerWidth + 'px';
            star.style.top = '-2px';
        } else {
            // Start from right edge
            star.style.left = (window.innerWidth + 2) + 'px';
            star.style.top = Math.random() * (window.innerHeight * 0.7) + 'px'; // Only use top 70% of screen height
        }

        container.appendChild(star);

        const startX = parseFloat(star.style.left);
        const startY = parseFloat(star.style.top);
        let posX = startX;
        let posY = startY;
        
        // Random angle between 30 and 60 degrees
        const angle = (30 + Math.random() * 30) * (Math.PI / 180);
        const speed = 1 + Math.random() * 2;
        
        function fall() {
            // Calculate movement based on angle
            posX -= Math.cos(angle) * speed;
            posY += Math.sin(angle) * speed;

            star.style.transform = `translate(${posX - startX}px, ${posY - startY}px)`;

            if (posY < window.innerHeight && posX > -10) {
                requestAnimationFrame(fall);
            } else {
                star.remove();
            }
        }

        requestAnimationFrame(fall);
    }

    // Function to create a star at a random position on screen
    function createInitialStar() {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.backgroundColor = 'white';
        star.style.boxShadow = '0 0 4px white';
        star.style.opacity = 0.3 + Math.random() * 0.7;

        // Random position anywhere on screen
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        
        star.style.left = posX + 'px';
        star.style.top = posY + 'px';

        container.appendChild(star);

        // Start the falling animation from this position
        const angle = (30 + Math.random() * 30) * (Math.PI / 180);
        const speed = 1 + Math.random() * 2;
        let currentX = posX;
        let currentY = posY;

        function fall() {
            currentX -= Math.cos(angle) * speed;
            currentY += Math.sin(angle) * speed;

            star.style.transform = `translate(${currentX - posX}px, ${currentY - posY}px)`;

            if (currentY < window.innerHeight && currentX > -10) {
                requestAnimationFrame(fall);
            } else {
                star.remove();
            }
        }

        requestAnimationFrame(fall);
    }

    // Create initial stars spread across the screen
    for (let i = 0; i < 100; i++) {
        createInitialStar();
    }

    // Continue creating new stars
    setInterval(createStar, 50);
});