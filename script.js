const heartSvg = document.getElementById("heart-svg");
const heartPath = heartSvg.querySelector("path");
const message = document.getElementById("message");
const fallingHeartsContainer = document.getElementById("falling-hearts");
const card = document.getElementById("card");
const cardText = document.getElementById("card-text");
const starrySky = document.getElementById("starry-sky");
const finalText = document.getElementById("final-text");
const finalPhoto = document.getElementById("final-photo");
const music = document.getElementById("music");

window.onload = () => {
  const heartSvg = document.getElementById("heart-svg");
  const message = document.getElementById("message");

  heartSvg.style.visibility = "visible";
  message.style.visibility = "visible";

  // Добавим класс с задержкой, чтобы сработал transition
  setTimeout(() => {
    heartSvg.classList.add("show");
  }, 900);

  setTimeout(() => {
    message.classList.add("show");
  }, 1500);
};

heartSvg.addEventListener("click", () => {
  heartSvg.classList.add("shrink-fade");
  message.classList.add("fadeOut");
  music.play();

  setTimeout(() => {
    createFallingHearts(30);
    showCard();
  }, 700);
});

function createFallingHearts(count) {
  for (let i = 0; i < count; i++) {
    const fHeart = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    fHeart.setAttribute("viewBox", "0 0 24 24");
    fHeart.setAttribute("class", "fall-heart");
    fHeart.style.left = Math.random() * 100 + "vw";
    fHeart.style.top = "-30px";
    fHeart.style.width = 10 + Math.random() * 15 + "px";
    fHeart.style.height = fHeart.style.width;
    fHeart.style.animationDuration = 5 + Math.random() * 5 + "s";
    fHeart.style.animationDelay = Math.random() * 5 + "s";

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "#ff5577");
    path.setAttribute(
      "d",
      "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    );
    fHeart.appendChild(path);
    fallingHeartsContainer.appendChild(fHeart);
  }
}

function showCard() {
  card.classList.add("show");

  // Запускаем печать текста через 1 секунду после появления открытки
  setTimeout(() => {
    startTyping();
  }, 1700);
}

const greetingText = `My dear,
With endless love I congratulate you on your birthday!
You are my inspiration, my happiness and my world.
Thank you for being there.
I love you endlessly 💋`;

const greetingChars = Array.from(greetingText); // <-- добавлено

let typingIndex = 0;
let typingInterval;

function startTyping() {
  cardText.textContent = "";
  typingIndex = 0;
  typingInterval = setInterval(() => {
    cardText.textContent += greetingChars[typingIndex]; // <-- заменено
    typingIndex++;
    if (typingIndex >= greetingChars.length) {
      // <-- заменено
      clearInterval(typingInterval);
      typingInterval = null;
      setTimeout(() => {
        hideCardAndHearts();
      }, 1000);
    }
  }, 100);
}

function hideCardAndHearts() {
  card.classList.remove("show");
  card.classList.add("hide");
  fallingHeartsContainer.style.transition = "opacity 1s ease";
  fallingHeartsContainer.style.opacity = "0";

  setTimeout(() => {
    fallingHeartsContainer.innerHTML = "";
    fallingHeartsContainer.style.opacity = "1";
    card.classList.remove("hide");
    cardText.textContent = "";
    starrySky.classList.add("show");
    startStarAnimation();

    setTimeout(() => {
      startFireworks();
      finalText.classList.add("show");
      finalPhoto.classList.add("show");
    }, 1000);
  }, 1000);
}

// Звездное небо
const starCanvas = document.createElement("canvas");
starCanvas.style.position = "fixed";
starCanvas.style.top = "0";
starCanvas.style.left = "0";
starCanvas.style.width = "100%";
starCanvas.style.height = "100%";
starCanvas.style.pointerEvents = "none";
starCanvas.style.zIndex = "14";
document.getElementById("starry-sky").appendChild(starCanvas);
const starCtx = starCanvas.getContext("2d");

function resizeCanvas() {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const stars = [];
const starCount = 150;

for (let i = 0; i < starCount; i++) {
  stars.push({
    x: Math.random() * starCanvas.width,
    y: Math.random() * starCanvas.height,
    radius: Math.random() * 1.3 + 0.3,
    alpha: Math.random(),
    delta: Math.random() * 0.02 + 0.005,
  });
}

function startStarAnimation() {
  function animateStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    for (let star of stars) {
      star.alpha += star.delta;
      if (star.alpha >= 1) {
        star.alpha = 1;
        star.delta = -star.delta;
      } else if (star.alpha <= 0) {
        star.alpha = 0;
        star.delta = -star.delta;
      }
      starCtx.beginPath();
      starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      starCtx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      starCtx.fill();
    }
    requestAnimationFrame(animateStars);
  }
  animateStars();
}

// Фейерверки
const fireworksCanvas = document.createElement("canvas");
fireworksCanvas.style.position = "fixed";
fireworksCanvas.style.top = "0";
fireworksCanvas.style.left = "0";
fireworksCanvas.style.width = "100%";
fireworksCanvas.style.height = "100%";
fireworksCanvas.style.pointerEvents = "none";
fireworksCanvas.style.zIndex = "16";
document.body.appendChild(fireworksCanvas);
const ctx = fireworksCanvas.getContext("2d");

function resizeFireworksCanvas() {
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeFireworksCanvas);
resizeFireworksCanvas();

let fireworks = [];
let particles = [];

class Firework {
  constructor(x, y, targetY, color) {
    this.x = x;
    this.y = y;
    this.targetY = targetY;
    this.color = color;
    this.speed = 5 + Math.random() * 3;
    this.radius = 2;
    this.isExploded = false;
  }
  update() {
    this.y -= this.speed;
    if (this.y <= this.targetY && !this.isExploded) {
      this.explode();
      this.isExploded = true;
    }
  }
  explode() {
    for (let i = 0; i < 20; i++) {
      particles.push(new Particle(this.x, this.y, this.color));
    }
  }
  draw() {
    if (!this.isExploded) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 2 + Math.random() * 2;
    this.speedX = (Math.random() - 0.5) * 5;
    this.speedY = (Math.random() - 0.5) * 5;
    this.alpha = 1;
    this.decay = 0.02 + Math.random() * 0.03;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= this.decay;
    if (this.alpha < 0) this.alpha = 0;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

function randomColor() {
  const colors = [
    "#ff5f7e",
    "#ffbd7e",
    "#ffc47e",
    "#7effa5",
    "#7edfff",
    "#9a7eff",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

let fireworksInterval;



function startFireworks() {
 
    fireworksInterval = setInterval(() => {
      const x = Math.random() * fireworksCanvas.width;
      const y = fireworksCanvas.height;
      const targetY = (Math.random() * fireworksCanvas.height) / 4 + 50;
      fireworks.push(new Firework(x, y, targetY, randomColor()));
    }, 400);
  

  requestAnimationFrame(animateFireworks);
}

function animateFireworks() {
  ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].draw();
    if (fireworks[i].isExploded) {
      fireworks.splice(i, 1);
    }
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(animateFireworks);
}
