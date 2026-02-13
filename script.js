const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttonBox = document.getElementById("buttonBox");
const message = document.getElementById("message");

const slideshowBox = document.getElementById("slideshowBox");
const slideTitle = document.getElementById("slideTitle");
const slideImg = document.getElementById("slideImg");

const mainTitle = document.getElementById("mainTitle");

let yesSize = 1.5;
let noMoves = 0;

/* 🎵 Background Music */
const music = new Audio("assets/music/love.mp3");

/* 📸 Slideshow Images */
const photos = [
  "assets/photos/pic1.jpg",
  "assets/photos/pic2.jpg",
  "assets/photos/pic3.jpg"
];

let currentPhoto = 0;

/* ❤️ Floating Hearts */
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "💖";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 400);

/* ✨ Typing Effect */
function typeText(element, text, speed = 80) {
  element.innerHTML = "";
  let i = 0;

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

/* 🎉 Confetti Burst */
function launchConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let pieces = [];
  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 6 + 4,
      speed: Math.random() * 3 + 2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      ctx.fillRect(p.x, p.y, p.size, p.size);
      p.y += p.speed;
    });

    requestAnimationFrame(animate);
  }

  animate();

  setTimeout(() => ctx.clearRect(0, 0, canvas.width, canvas.height), 3000);
}

/* 📸 Slideshow */
function startSlideshow() {
  slideshowBox.style.display = "block";

  slideImg.src = photos[currentPhoto];

  setInterval(() => {
    currentPhoto = (currentPhoto + 1) % photos.length;
    slideImg.src = photos[currentPhoto];
  }, 2500);
}

/* 😈 NO Button Run Away */
noBtn.addEventListener("mouseenter", () => {
  noMoves++;

  let x = Math.random() * 300 - 150;
  let y = Math.random() * 200 - 100;

  noBtn.style.transform = `translate(${x}px, ${y}px)`;

  if (noMoves >= 4) {
    noBtn.style.opacity = `${1 - (noMoves - 4) / 6}`;
  }

  if (noMoves >= 10) {
    noBtn.style.display = "none";
  }

  yesSize += 0.3;
  yesBtn.style.fontSize = yesSize + "rem";
});

/* 💘 YES Click */
yesBtn.addEventListener("click", () => {

  /* Fade transition */
  mainTitle.style.opacity = 0;

  setTimeout(() => {
    mainTitle.innerHTML = "Happy Valentine’s Day Bubu ❤️🌹";
    mainTitle.style.opacity = 1;
  }, 800);

  buttonBox.style.display = "none";

  music.play().catch(() => {});

  message.innerHTML = `
    💖 YAYYY 🥰 <br><br>
    You just made me the happiest person ever 😌❤️<br><br>
    Now you owe me unlimited hugs and one Valentine date 😄🌹
  `;

  launchConfetti();

  typeText(slideTitle, "Here’s to our forever craziness... 💕");

  startSlideshow();
});