/* ================= THEME ================= */
const themeBtn = document.getElementById("themeBtn");

function toggleTheme() {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    startSpace();
  } else {
    stopSpace();
  }
}

themeBtn.addEventListener("click", toggleTheme);

/* ================= TYPING EFFECT ================= */
const technologies = ["Node.js","TypeScript","Java","PHP","React","PostgreSQL","Python"];
const typingText = document.querySelector(".typing-text");

let techIndex = 0, charIndex = 0, isDeleting = false;
const typingSpeed = 70, deletingSpeed = 50, pauseAfterTyping = 1200;

function typeEffect() {
  const current = technologies[techIndex];
  if (!isDeleting) {
    typingText.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) setTimeout(() => isDeleting = true, pauseAfterTyping);
  } else {
    typingText.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      techIndex = (techIndex + 1) % technologies.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
}
typeEffect();

/* ================= CAROUSEL ================= */
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');

let index = 0;
let autoSlide;

function getSlideWidth() {
  return items[0].getBoundingClientRect().width;
}

function showSlide(i) {
  index = i;
  const slideWidth = getSlideWidth();
  track.style.transform = `translateX(-${index * slideWidth}px)`;

  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[index]) dots[index].classList.add('active');
}

function nextSlide() {
  showSlide((index + 1) % items.length);
}

function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

window.addEventListener('resize', () => {
  showSlide(index); // recalcula corretamente em qualquer resolução e rotação
});

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    showSlide(parseInt(dot.dataset.slide));
    resetAutoSlide();
  });
});

showSlide(0);
startAutoSlide();



/* ================= LANGUAGE ================= */
const translations = {
  en: {
    about: "About Me",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
    title: "<span>FULL STACK</span> developer",
    about_text: "I am a Full Stack developer specializing in creating efficient and scalable solutions. I enjoy working with modern technologies and am always seeking to learn something new. My strengths include logical reasoning, problem-solving, and teamwork.",
    skills_title: "My Skills",
    footer_connect: "Connect with me",
    contact_title: "Contact Me:",
    contact_email_btn: "Email",
    contact_linkedin_btn: "LinkedIn",
    footer_rights: "© 2026 Lucas Felipe. All rights reserved.",
    footer_created: "Developed by <span class='highlight'><a href=https://github.com/LucasFelipeMartins/LucasFelipeMartins>Lucas Felipe Martins</a></span>"
  },
  pt: {
    about: "Sobre mim",
    projects: "Projetos",
    skills: "Habilidades",
    contact: "Contato",
    title: "Programador <span>FULL STACK</span>",
    about_text: "Sou um desenvolvedor Full Stack especialista em criar soluções eficientes e escalavel. Gosto de trabalhar com tecnologias modernas e sempre busco aprender algo novo. Minhas qualidades incluem raciocinio logico, resolução de problemas e trabalho em equipe.",
    skills_title: "Skills",
    footer_connect: "Conecte-se comigo",
    contact_title: "Entre em contato:",
    contact_email_btn: "Email",
    contact_linkedin_btn: "LinkedIn",
    footer_rights: "© 2026 Lucas Felipe. Todos os direitos reservados.",
    footer_created: "Desenvolvido por <span class='highlight'><a href=https://github.com/LucasFelipeMartins/LucasFelipeMartins>Lucas Felipe Martins</a></span>"
  }
};

function setLang(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if(translations[lang][key]){
      el.innerHTML = translations[lang][key];
    }
  });
}

document.querySelector("button[onclick=\"setLang('pt')\"]").addEventListener("click", () => setLang('pt'));
document.querySelector("button[onclick=\"setLang('en')\"]").addEventListener("click", () => setLang('en'));
setLang("pt");

/* ================= SPACE BACKGROUND ================= */
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 140;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", () => {
  resizeCanvas();
  createStars();
});
resizeCanvas();

function createStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.8 + 0.2
    });
  }
}

let animationFrame;
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.fill();

    star.x += star.vx;
    star.y += star.vy;

    // loop suave
    if(star.x < 0) star.x = canvas.width;
    if(star.x > canvas.width) star.x = 0;
    if(star.y < 0) star.y = canvas.height;
    if(star.y > canvas.height) star.y = 0;
  });
  animationFrame = requestAnimationFrame(drawStars);
}

function startSpace() {
  createStars();
  if (!animationFrame) drawStars();
}

function stopSpace() {
  cancelAnimationFrame(animationFrame);
  animationFrame = null;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// inicial
if(document.body.classList.contains("dark")) startSpace();
