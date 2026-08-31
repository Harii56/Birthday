// Background Particles Canvas
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedY = Math.random() * -0.8 - 0.2;
        this.color = ['#F8BBD0', '#708238', '#D4AF37', '#ffffff'][Math.floor(Math.random() * 4)];
        this.alpha = Math.random() * 0.6 + 0.3;
    }
    update() {
        this.y += this.speedY;
        if (this.y < 0) this.reset();
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

for (let i = 0; i < 60; i++) particles.push(new Particle());

function animateBg() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateBg);
}
animateBg();

// Audio System
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle-btn');
let isMusicPlaying = false;

function startMusic() {
    bgMusic.play().then(() => {
        isMusicPlaying = true;
        musicBtn.classList.add('playing');
        musicBtn.textContent = '🔊';
    }).catch(() => {
        isMusicPlaying = false;
        musicBtn.textContent = '🔈';
    });
}

function toggleMusic() {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
        musicBtn.textContent = '🔈';
        isMusicPlaying = false;
    } else {
        bgMusic.play();
        musicBtn.classList.add('playing');
        musicBtn.textContent = '🔊';
        isMusicPlaying = true;
    }
}

// Section Switcher
function switchSection(currentId, nextId) {
    document.getElementById(currentId).classList.remove('active');
    setTimeout(() => {
        document.getElementById(nextId).classList.add('active');
    }, 450);
}

// DOB Unlock Logic
function checkDOB() {
    const userInput = document.getElementById('dob-input').value;
    const errorMsg = document.getElementById('error-msg');
    
    if (userInput === "2004-09-03") {
        errorMsg.textContent = "";
        startMusic();
        switchSection('dob-section', 'cake-section');
    } else {
        errorMsg.textContent = "Oops! Wrong Date of Birth. Please try again ✨";
    }
}

// Cake Candle Blow Logic
let blownCount = 0;
const totalCandles = 5;

function blowCandle(element) {
    if (!element.classList.contains('out')) {
        element.classList.add('out');
        blownCount++;
        
        confetti({
            particleCount: 20,
            spread: 40,
            origin: { y: 0.5 },
            colors: ['#F8BBD0', '#708238', '#D4AF37']
        });

        if (blownCount === totalCandles) {
            document.getElementById('cake-prompt').textContent = "All candles blown! Make a wish 🌟✨";
            document.getElementById('next-page-btn').style.display = 'inline-block';
            triggerPartyPopper();
        }
    }
}

// Confetti Blast
function triggerPartyPopper() {
    var duration = 2.5 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 6,
            angle: 60,
            spread: 60,
            origin: { x: 0 },
            colors: ['#58111A', '#708238', '#F8BBD0', '#D4AF37']
        });
        confetti({
            particleCount: 6,
            angle: 120,
            spread: 60,
            origin: { x: 1 },
            colors: ['#58111A', '#708238', '#F8BBD0', '#D4AF37']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

function goToEnvelopePage() { switchSection('cake-section', 'envelope-section'); }
function openLetter() { switchSection('envelope-section', 'message-section'); }
function goToGridPage() { 
    switchSection('message-section', 'grid-section'); 
    setTimeout(() => triggerPartyPopper(), 400);
}

// Card Flip Logic for Grid Page
function flipCard(card) {
    if (!card.classList.contains('flipped')) {
        card.classList.add('flipped');
        confetti({
            particleCount: 15,
            spread: 30,
            origin: { y: 0.6 },
            colors: ['#F8BBD0', '#708238']
        });
    }
}