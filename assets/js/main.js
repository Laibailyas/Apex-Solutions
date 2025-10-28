// gsap.registerPlugin(ScrollTrigger);

// document.querySelectorAll(".partners-content h2").forEach(h2 => {
//   const text = h2.textContent;
//   h2.textContent = "";
//   const chars = text.split("");

//   // Split into spans
//   chars.forEach(char => {
//     const span = document.createElement("span");
//     span.textContent = char === " " ? "\u00A0" : char;
//     span.classList.add("char");
//     h2.appendChild(span);
//   });

//   const charSpans = h2.querySelectorAll(".char");

//   // Random order array
//   const randomOrder = gsap.utils.shuffle([...charSpans]);

//   // Animate with scroll
//   gsap.to(randomOrder, {
//     filter: "blur(0px)",
//     opacity: 1,
//     ease: "none",
//     duration: 1,
//     stagger: {
//       each: 0.02,
//       from: "random" // random reveal order
//     },
//     scrollTrigger: {
//       trigger: h2,
//       start: "bottom bottom", // when bottom hits viewport bottom
//       end: "top 80%",          // when top reaches 20% from top
//       scrub: true,
//     }
//   });
// });

gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector(".partners-content");
const allChars = [];

// Step 1: Split ALL <h2> into spans and collect them globally
container.querySelectorAll("h2").forEach(h2 => {
  const text = h2.textContent;
  h2.textContent = "";

  text.split("").forEach(char => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.classList.add("char");
    h2.appendChild(span);
    allChars.push(span);
  });
});

// Step 2: Shuffle ALL spans randomly (not per h2)
const randomOrder = gsap.utils.shuffle([...allChars]);

// Step 3: Animate the blur removal across all spans together
gsap.to(randomOrder, {
  filter: "blur(0px)",
  opacity: 1,
  ease: "none",
  duration: 1,
  stagger: {
    each: 0.02,
    from: "random"
  },
  scrollTrigger: {
    trigger: container,
    start: "top bottom",
    end: "bottom 55%",
    scrub: true,
  }
});


const menuBtn = document.getElementById('menuBtn');
const mobileHeader = document.getElementById('mobileHeader');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  mobileHeader.classList.toggle('active');
});
