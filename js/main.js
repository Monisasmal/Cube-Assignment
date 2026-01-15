const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});


// Product Start


/* =========================
   LEFT GALLERY LOGIC
========================= */

const mainImage = document.querySelector(".gallery-image");
const thumbnails = document.querySelectorAll(".gallery-thumbnails img");
const dots = document.querySelectorAll(".gallery-dots .dot");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

let currentIndex = 0;

/* Initialize */
function setActive(index) {
  currentIndex = index;

  // Update main image
  mainImage.src = thumbnails[index].src;

  // Active thumbnail
  thumbnails.forEach(img => img.classList.remove("active"));
  thumbnails[index].classList.add("active");

  // Active dot
  dots.forEach(dot => dot.classList.remove("active"));
  if (dots[index]) dots[index].classList.add("active");
}

/* Thumbnail click */
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    setActive(index);
  });
});

/* Left arrow */
leftArrow.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + thumbnails.length) % thumbnails.length;
  setActive(currentIndex);
});

/* Right arrow */
rightArrow.addEventListener("click", () => {
  currentIndex =
    (currentIndex + 1) % thumbnails.length;
  setActive(currentIndex);
});

/* Dot click */
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    setActive(index);
  });
});

/* Set first active */
setActive(0);

/* =========================
   SUBSCRIPTION TOGGLE
========================= */


const subscriptions = document.querySelectorAll(".subscription");
const subscriptionRadios = document.querySelectorAll(
  'input[name="subscription"]'
);

subscriptionRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    subscriptions.forEach(sub => {
      sub.classList.remove("active");
    });

    const selectedSubscription = radio.closest(".subscription");
    selectedSubscription.classList.add("active");
  });
});

/* Set default open (Single Subscription) */
document
  .querySelector(".single-subscription")
  .classList.add("active");


/* =========================
   FRAGRANCE SELECTION
========================= */

const fragranceRadios = document.querySelectorAll(
  'input[name="fragrance"]'
);

fragranceRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    document
      .querySelectorAll(".fragrance-options label")
      .forEach(label => label.classList.remove("active"));

    radio.closest("label").classList.add("active");
  });
});




// Product End


// Our Collection start

document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const icon = header.querySelector('.icon');
    
    // Toggle active class
    item.classList.toggle('active');
    
    // Change icon
    if (item.classList.contains('active')) {
      icon.textContent = '−';
    } else {
      icon.textContent = '+';
    }
    
   
  
    document.querySelectorAll('.accordion-item').forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
        otherItem.querySelector('.icon').textContent = '+';
      }
    });
    
  });
});

// COunter Start

const statsSection = document.querySelector('.stats-section');
const counters = document.querySelectorAll('.counter');
let started = false; // Prevents the animation from restarting every scroll

function startCounters() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const increment = target / 100; // Adjust for speed

    const updateCount = () => {
      const current = +counter.innerText;
      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(updateCount, 25); // Controls the "smoothness" of the jump
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

// Intersection Observer to trigger when visible
const observer = new IntersectionObserver((entries) => {
  const [entry] = entries;
  if (entry.isIntersecting && !started) {
    startCounters();
    started = true;
  }
}, { threshold: 0.5 }); // Starts when 50% of the section is visible

observer.observe(statsSection);

// Counter End
