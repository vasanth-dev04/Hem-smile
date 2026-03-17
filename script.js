// side bar

const sidebar = document.getElementById("mob-navbar");
const menuBtn = document.getElementById("menuBtn");
const exit = document.getElementById("overlay");

function openSidebar() {
  sidebar.style.right = "0px";
  exit.classList.add("show");
  
}
function closeSidebar() {
  sidebar.style.right = "-1000px";
  exit.classList.remove("show");
}

var p = document.getElementById("popup-parent-f");
var wapp = document.querySelector(".whatsapp");
var mapp = document.querySelector(".mail");
var capp = document.querySelector(".phone");


function ena() {
  p.style.display = "flex";
  wapp.style.zIndex = "-10";
  mapp.style.zIndex = "-10";
  capp.style.zIndex = "-10";
}

function finish() {
  p.style.display = "none";
  wapp.style.zIndex="1";
  mapp.style.zIndex="1";
  capp.style.zIndex="1";
}
function openModal() {
  
}

function closeModal() {
  document.querySelector('.popup').style.display = 'none';
  document.querySelector('.floating-icons').classList.remove('hide-icons');
}

// Type writer effect

const texts = [
  "Advanced Dental Implant  ",
  "Trusted Dental Experts " 
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter(){

  const currentText = texts[textIndex];
  const display = document.getElementById("typing");

  if(isDeleting){
    display.textContent = currentText.substring(0, charIndex--);
  }else{
    display.textContent = currentText.substring(0, charIndex++);
  }

  let speed = isDeleting ? 50 : 100;

  if(!isDeleting && charIndex === currentText.length){
    speed = 1500; 
    isDeleting = true;
  }

  else if(isDeleting && charIndex === 0){
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
  }

  setTimeout(typeWriter, speed);
}

typeWriter();
// ================================
// SERVICE SECTION AUTO SLIDER
// ================================

const container = document.querySelector(".container");
let cards = document.querySelectorAll(".cont1");

const gap = 20; // Must match CSS gap
let cardWidth = cards[0].offsetWidth + gap;


// ================================
// CLONE FIRST & LAST
// ================================

const serviceFirstClone = cards[0].cloneNode(true);
const serviceLastClone = cards[cards.length - 1].cloneNode(true);

container.appendChild(serviceFirstClone);
container.insertBefore(serviceLastClone, container.firstChild);

// Re-select after cloning
cards = document.querySelectorAll(".cont1");

// Start at first real card
container.scrollLeft = cardWidth;


// ================================
// MOVE FUNCTION
// ================================

function moveNext() {
  container.scrollBy({
    left: cardWidth,
    behavior: "smooth"
  });
}


// ================================
// AUTO SCROLL
// ================================

let serviceautoSlide = setInterval(moveNext, 2000);


// ================================
// TRUE INFINITE LOOP
// ================================

container.addEventListener("scroll", () => {

  const maxScrollLeft = container.scrollWidth - container.clientWidth;

  // If reached end (cloned last)
  if (container.scrollLeft >= maxScrollLeft - 1) {
    container.style.scrollBehavior = "auto";
    container.scrollLeft = cardWidth;
    container.style.scrollBehavior = "smooth";
  }

  // If reached beginning (cloned first)
  if (container.scrollLeft <= 0) {
    container.style.scrollBehavior = "auto";
    container.scrollLeft = container.scrollWidth - (2 * cardWidth);
    container.style.scrollBehavior = "smooth";
  }

});


// ================================
// PAUSE ON HOVER
// ================================

container.addEventListener("mouseenter", () => {
  clearInterval(serviceautoSlide);
});

container.addEventListener("mouseleave", () => {
  serviceautoSlide = setInterval(moveNext, 3000);
});


// ================================
// RESPONSIVE FIX
// ================================

window.addEventListener("resize", () => {
  cardWidth = cards[0].offsetWidth + gap;
});

// Tesitimonial slider

const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");
const testimonial = document.querySelector(".test-feed");

// Clone first & last for loop
const firstClone = slide[0].cloneNode(true);
const lastClone = slide[slide.length - 1].cloneNode(true);

slides.appendChild(firstClone);
slides.insertBefore(lastClone, slide[0]);

const allSlides = document.querySelectorAll(".slide");

let index = 1;
const slideWidth = 100;

slides.style.transform = `translateX(-${slideWidth * index}%)`;

function moveToSlide() {
  slides.style.transition = "0.5s ease";
  slides.style.transform = `translateX(-${slideWidth * index}%)`;
}

// Buttons
document.querySelector(".next-test").onclick = () => {
  if (index >= allSlides.length - 1) return;
  index++;
  moveToSlide();
};

document.querySelector(".prev-test").onclick = () => {
  if (index <= 0) return;
  index--;
  moveToSlide();
};

// Infinite reset
slides.addEventListener("transitionend", () => {
  if (index >= allSlides.length - 1) {
    slides.style.transition = "none";
    index = 1;
    slides.style.transform = `translateX(-${slideWidth * index}%)`;
  }

  if (index <= 0) {
    slides.style.transition = "none";
    index = allSlides.length - 2;
    slides.style.transform = `translateX(-${slideWidth * index}%)`;
  }
});

// ⭐ AUTO SCROLL
let autoSlide = setInterval(nextSlide, 4000);

function nextSlide() {
  if (index >= allSlides.length - 1) return;
  index++;
  moveToSlide();
}

// ⭐ PAUSE ON HOVER
testimonial.addEventListener("mouseenter", () => {
  clearInterval(autoSlide);
});

testimonial.addEventListener("mouseleave", () => {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextSlide, 4000);
});

//Script store a data in google sheet
document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = this;
  const formData = new FormData(form);

  const data = {
    name: formData.get("name"),
    number: formData.get("number"),
    message: formData.get("message"),
    date: formData.get("date"),
  };

  fetch(
    "https://script.google.com/macros/s/AKfycbzDTku2vU888JbZAMSbJ4tKUG6EmV4hRoClvRPriDp2AUoc_9nb6AV4VEtxcNGvONLp/exec",
    {
      method: "POST",
      body: JSON.stringify(data),
      mode: "no-cors",
    },
  )
    .then(() => {
      alert("Appointment submitted successfully ✅");
      form.reset();
    })
    .catch(() => {
      alert("❌ Submission failed. Check your internet connection.");
    });
});
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

const obj = document.getElementById("value");
animateValue(obj, 0, 22, 2000);
{
  /* <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>;

AOS.init();

<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
  crossorigin="anonymous"></script>; */
}
// running number effect
const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {
    

    if(entry.isIntersecting){

      const counter = entry.target;
      const target = +counter.dataset.target;
      let count = 0;

      const update = () => {
        const increment = target / 100;

        if(count < target){
          count += increment;
          counter.innerText = Math.ceil(count);
          counter.innerText = Math.ceil(count) + "+";
          requestAnimationFrame(update);
        }else{
          counter.innerText = target;
          counter.innerText = Math.ceil(count) + "+";
        }
      };
      

      update();
      observer.unobserve(counter);
      

    }

  });

},{ threshold:0.6 });

counters.forEach(counter=>{
  observer.observe(counter);
  
});
const icons = document.querySelectorAll('.icon1');

icons.forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    icon.style.animationPlayState = 'paused'; // pause float on hover
  });
  icon.addEventListener('mouseleave', () => {
    icon.style.animationPlayState = 'running';
  });
});
