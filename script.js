// ===== КАСТОМНЫЙ КУРСОР =====
const cursor = document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// ===== ПЛАВНОЕ ПОЯВЛЕНИЕ =====
const elements = document.querySelectorAll('.product-card, .hero-title, .gallery img');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

elements.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== FULLSCREEN ПРОСМОТР =====
const viewer = document.createElement("div");
viewer.classList.add("viewer");
const viewerImg = document.createElement("img");
viewer.appendChild(viewerImg);
document.body.appendChild(viewer);

document.querySelectorAll("img").forEach(img => {
  img.addEventListener("click", () => {
    viewerImg.src = img.src;
    viewer.classList.add("active");
  });
});

viewer.addEventListener("click", () => {
  viewer.classList.remove("active");
});

// ===== BLUR ПРИ СКРОЛЛЕ =====
window.addEventListener("scroll", () => {
  const scroll = window.scrollY;

  document.querySelectorAll(".product-card").forEach(el => {
    el.classList.toggle("blur", scroll > 200);
  });
});

// ===== СВАЙП / ДРАГ ГАЛЕРЕИ =====
const gallery = document.getElementById("gallery");

let isDown = false;
let startX;
let scrollLeft;

gallery.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - gallery.offsetLeft;
  scrollLeft = gallery.scrollLeft;
});

gallery.addEventListener("mouseleave", () => isDown = false);
gallery.addEventListener("mouseup", () => isDown = false);

gallery.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - gallery.offsetLeft;
  const walk = (x - startX) * 2;
  gallery.scrollLeft = scrollLeft - walk;
});

// ===== ПЕРЕМЕШИВАНИЕ =====
function shuffleGallery() {
  const images = Array.from(gallery.children);
  images.sort(() => Math.random() - 0.5);
  images.forEach(img => gallery.appendChild(img));
}

setInterval(shuffleGallery, 4000);