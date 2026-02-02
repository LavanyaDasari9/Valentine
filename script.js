document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const question = document.getElementById('question');
    const successMessage = document.getElementById('successMessage');
    const contentWrapper = document.querySelector('.content-wrapper');
    const buttonContainer = document.getElementById('buttonContainer');
    const backgroundHearts = document.querySelector('.background-hearts');

    // Create floating hearts
    function createHearts() {
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 3 + 3 + 's';
            heart.style.animationDelay = Math.random() * 5 + 's';
            backgroundHearts.appendChild(heart);
        }
    }
    createHearts();

    // Create scattered bear stickers
    const stickers = [
        'sticker1.png', 'sticker2.png', 'sticker3.png', 'sticker4.png', 'sticker5.png'
    ];

    function createStickers() {
        stickers.forEach(src => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('sticker-wrapper');

            const img = document.createElement('img');
            img.src = src;
            img.classList.add('sticker');

            wrapper.appendChild(img);

            // Random positioning for wrapper
            const x = Math.random() * 90;
            const y = Math.random() * 90;

            wrapper.style.left = x + 'vw';
            wrapper.style.top = y + 'vh';

            // Random size variation
            const size = 80 + Math.random() * 100;
            wrapper.style.width = size + 'px';

            // Random rotation for image (inner)
            const rotation = Math.random() * 40 - 20; // -20 to 20 deg
            img.style.transform = `rotate(${rotation}deg)`;

            // Random animation delay for natural feel
            wrapper.style.animationDelay = Math.random() * 5 + 's';

            document.body.appendChild(wrapper);
        });
    }
    createStickers();

    // No Button Interaction
    const moveNoButton = () => {
        const wrapperRect = contentWrapper.getBoundingClientRect();
        const noBtnRect = noBtn.getBoundingClientRect();

        // Calculate max boundaries relative to viewport to ensure it doesn't go off screen
        // But let's keep it somewhat near the card to be teasing

        // Let's try to keep it within the window but avoiding the cursor.
        // Simple random position first

        const maxX = window.innerWidth - noBtnRect.width - 20;
        const maxY = window.innerHeight - noBtnRect.height - 20;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noBtn.style.position = 'fixed'; // Change to fixed to move freely around screen
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';

        // Add a funny scale effect
        noBtn.style.transform = `scale(${0.8 + Math.random() * 0.4})`;
    };

    noBtn.addEventListener('mouseover', moveNoButton);
    // For mobile touch
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent clicking
        moveNoButton();
    });

    // Yes Button Click
    yesBtn.addEventListener('click', () => {
        // Hide initial content
        question.classList.add('hidden');
        buttonContainer.classList.add('hidden');

        // Show success message
        successMessage.classList.remove('hidden');

        // Confetti effect
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    });
});
