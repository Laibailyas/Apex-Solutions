
gsap.registerPlugin(ScrollTrigger);

function blurTextAnimation(selector) {
  const container = document.querySelector(selector);
  if (!container) return;

  const allChars = [];

  container.querySelectorAll("h2, h3").forEach(el => {
    const text = el.textContent.trim();
    el.textContent = "";

    // Split into words first
    text.split(" ").forEach(word => {
      const wordSpan = document.createElement("span");
      wordSpan.classList.add("word");
      el.appendChild(wordSpan);

      // Add characters inside word
      word.split("").forEach(char => {
        const charSpan = document.createElement("span");
        charSpan.textContent = char;
        charSpan.classList.add("char");
        wordSpan.appendChild(charSpan);
        allChars.push(charSpan);
      });

      // Add a space after each word
      const space = document.createTextNode(" ");
      el.appendChild(space);
    });
  });

  // Animate all chars
  gsap.set(allChars, { opacity: 0, filter: "blur(5px)" });

  const randomOrder = gsap.utils.shuffle([...allChars]);
  gsap.to(randomOrder, {
    filter: "blur(0px)",
    opacity: 1,
    ease: "none",
    duration: 1,
    stagger: { each: 0.02, from: "random" },
    scrollTrigger: {
      trigger: container,
      start: "top bottom",
      end: "bottom 55%",
      scrub: true,
    },
  });
}


// Apply to all target sections
blurTextAnimation(".partners-content");
blurTextAnimation(".steps-title");
blurTextAnimation(".benefits-heading");
blurTextAnimation(".benefits-content");
blurTextAnimation(".about-wrapper");


ScrollTrigger.matchMedia({
  "(min-width: 768px)": function () {
    blurTextAnimation(".solve-h2-animation");
    blurTextAnimation(".solve-content-wrapper");
    blurTextAnimation(".image-slider-wrapper");
    blurTextAnimation(".gain-wrapper");
    blurTextAnimation(".competitor-card-1");
    blurTextAnimation(".competitor-card-2");
    blurTextAnimation(".newsletter-wrapper");
    blurTextAnimation(".experience-wrapper");
  },
});

// blurTextAnimation(".");


// Mobile Menu
const menuBtn = document.getElementById('menuBtn');
const mobileHeader = document.getElementById('mobileHeader');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  mobileHeader.classList.toggle('active');
});

// Parallax
gsap.to(".parallax-bg", {
  yPercent: 30,
  ease: "none",
  scrollTrigger: {
    trigger: ".parallax-container",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  }
});


// Testimonial
(function () {
  const root = document.getElementById('testimonial-splide');
  const delay = parseInt(root?.dataset?.delay) || 2000; // fallback 4000ms

  new Splide('#testimonial-splide', {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    autoplay: true,
    interval: delay,
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: true,
    pagination: false,
    drag: true,
    speed: 500,
    accessibility: true,
  }).mount();
})();


// logo slider

const track = document.querySelector('.logo-track');
const trackWidth = track.scrollWidth / 2;

gsap.to(track, {
  x: -trackWidth,
  duration: 30,
  ease: "none",
  repeat: -1,
});


// Parallax on video for Benefits 
ScrollTrigger.matchMedia({
  // Only for screens wider than 768px
  "(min-width: 768px)": function () {
    gsap.to(".benefits-video video", {
      yPercent: -75,
      ease: "none",
      scrollTrigger: {
        trigger: ".benefits-video",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  },
});


// Benefits text Reveling Animation
const subtitle = document.querySelector(".benefit-subtitle-wrapper h6");

// Split into words (preserve whitespace after words)
const rawText = subtitle.textContent.trim();
const words = rawText.split(/\s+/);

// Replace content with spans (add a nbsp after each word to keep spacing)
subtitle.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(" ");

const tweakMultiplier = 30;
gsap.to(".benefit-subtitle-wrapper .word", {
  opacity: 1,
  duration: 0.01,
  ease: "none",
  stagger: {
    each: 0.02,
    from: "start"
  },
  scrollTrigger: {
    trigger: ".benefit-subtitle-wrapper",
    start: "top 90%",
    end: "bottom 10%",
    scrub: true,
  }
});


// About Section Image
ScrollTrigger.matchMedia({
  "(min-width: 768px)": function () {
    gsap.to(".about-image", {
      width: "50vw",
      height: "60vh",
      ease: "none",
      scrollTrigger: {
        trigger: ".about-image",
        start: "top 80%",
        end: "bottom top",
        scrub: true,
      },
    });
  },
});

// parallax effect to the image inside
gsap.to(".about-image img", {
  yPercent: -30,
  ease: "none",
  scrollTrigger: {
    trigger: ".about-image",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  }
});

// Sequential About Text Reveal Animation
const aboutParagraphs = document.querySelectorAll(".about-scroll-text p");

// Split words into spans
aboutParagraphs.forEach(para => {
  const words = para.textContent.trim().split(/\s+/);
  para.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(" ");
});

// Create a single scroll-triggered timeline
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".about-scroll-text",
    start: "top 85%",
    end: "bottom 10%",
    scrub: true,
  }
});

// Add each paragraph sequentially in the same scroll range
let totalDelay = 0;
aboutParagraphs.forEach((para, i) => {
  const words = para.querySelectorAll(".word");
  const wordCount = words.length;
  const eachDelay = 0.02;

  tl.to(words, {
    opacity: 1,
    duration: 0.01,
    ease: "none",
    stagger: {
      each: eachDelay,
      from: "start"
    }
  }, totalDelay);

  // increment delay by how long this para took
  totalDelay += wordCount * eachDelay;
});


// Tricks Image Slider 
new Splide('#tricks-slider', {
  speed: 800,
  arrows: false,
  pagination: false,
  pauseOnHover: false,
  pauseOnFocus: false,
  autoWidth: true,
  gap: "10px",
}).mount();


// Solve Problems
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.matchMedia({
  "(min-width: 768px)": function () {
    gsap.timeline({
      scrollTrigger: {
        trigger: ".solve-problem-wrapper",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: ".solve-title-wrapper",
      },
    })
      .to(".solve-problem img", {
        rotation: 180,
        ease: "none",
        stagger: 0.2,
      });
  },
});



// Video
gsap.to(".embed-video", {
  scale: 1.3,
  ease: "none",
  scrollTrigger: {
    trigger: ".competitor",
    start: "top center",
    end: "bottom center",
    scrub: true,
  }
});

// Competitor Card
ScrollTrigger.matchMedia({
  "(min-width: 768px)": function () {
    gsap.to(".competitor-card-1", {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: ".competitor-card-1",
        start: "top 90%",
        end: "bottom top",
        scrub: true,
      },
    });
  },
});

// NewsLetter Starter Animation
gsap.utils.toArray(".newsletter-gain").forEach((el, i) => {
  gsap.from(el, {
    y: 50,              // nicha se upar
    opacity: 0,         // fade-in effect
    duration: 0.8,      // speed
    ease: "power3.out", // smooth easing
    scrollTrigger: {
      trigger: el,
      start: "top 90%", // jab element viewport me aaye
      toggleActions: "play none none reverse",
    },
    delay: i * 0.15,    // har item thoda delay se
  });
});

// Experience
ScrollTrigger.matchMedia({
  "(min-width: 768px)": function () {
    gsap.to(".image-16", {
      yPercent: -20, // jitna move karna hai (upar ya niche)
      ease: "none",
      scrollTrigger: {
        trigger: ".experience-wrapper",
        start: "top bottom", // jab section viewport me aaye
        end: "bottom top",   // jab section scroll out ho
        scrub: true,         // smooth scroll-linked animation
      },
    });
  },
});