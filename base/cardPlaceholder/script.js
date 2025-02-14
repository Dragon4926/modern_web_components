let quotes = []; 
// DOM references
const elements = {
  header: document.getElementById("header"),
  title: document.getElementById("title"),
  excerpt: document.getElementById("excerpt"),
  profileImg: document.getElementById("profile_img"),
  cname: document.getElementById("name"),
  date: document.getElementById("date")
};

const animated_bgs = document.querySelectorAll(".animated-bg");
const animated_bg_texts = document.querySelectorAll(".animated-bg-text");

function getData() {
  elements.header.innerHTML =
    '<img src="https://img.freepik.com/free-photo/night-landscape-illustration_1409-7262.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80" alt="">';
  elements.profileImg.innerHTML =
    '<img src="https://www.zmo.ai/wp-content/uploads/2024/01/Image-generated-by-ZMOs-AI-anime-generator.webp" alt="">';
  elements.date.textContent = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  animated_bgs.forEach((bg) => bg.classList.remove("animated-bg"));
  animated_bg_texts.forEach((bg) => bg.classList.remove("animated-bg-text"));
}

const addDataToHTML = () => {
  if (quotes.length > 0) {
    let q = quotes[Math.floor(Math.random() * quotes.length)]; // Use quotes.length
    elements.excerpt.innerHTML = `"${q.quote}"`;
    elements.cname.innerHTML = `~ ${q.character}`;
    elements.title.innerHTML = `- ${q.anime} -`;
  }
};

const fallbackQuotes = [
  {
    quote: "Whatever you lose, you'll find it again. But what you throw away you'll never get back.",
    character: "Himura Kenshin",
    anime: "Rurouni Kenshin"
  },
  {
    quote: "The world isn't perfect. But it's there for us, doing the best it can.",
    character: "Roy Mustang",
    anime: "Fullmetal Alchemist"
  }
];

const initApp = () => {

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      quotes = data;
      addDataToHTML();
    })
    .catch((error) => {
      console.error("Error fetching quotes:", error);
      quotes = fallbackQuotes;
      addDataToHTML();
    });
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      getData();
      initApp();
    }
  });
}, { rootMargin: '200px' });

observer.observe(document.querySelector('.card'));

// Add accessibility attributes
document.querySelector('.card-content').setAttribute('aria-live', 'polite');
document.querySelector('.card-content').setAttribute('aria-busy', 'false');
// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('.theme-icon');
const sunPath = themeIcon.querySelector('.sun');
const moonPath = themeIcon.querySelector('.moon');
const currentTheme = localStorage.getItem('theme') || 'light-mode';

if (currentTheme === 'dark-mode') {
  body.classList.add('dark-mode');
  sunPath.style.display = 'none';
  moonPath.style.display = 'block';
} else {
  body.classList.add('light-mode');
  sunPath.style.display = 'block';
  moonPath.style.display = 'none';
}

themeToggle.addEventListener('click', () => {
  themeToggle.classList.add('rotate', 'animated');
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark-mode');
    sunPath.style.display = 'none';
    moonPath.style.display = 'block';
  } else {
    localStorage.setItem('theme', 'light-mode');
    sunPath.style.display = 'block';
    moonPath.style.display = 'none';
  }

  setTimeout(() => {
    themeToggle.classList.remove('rotate', 'animated');
  }, 500);
});
