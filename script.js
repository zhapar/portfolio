const burger = document.querySelector(".burger");
const navWrapper = document.querySelector(".nav-wrapper");
function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    navWrapper.classList.add("nav-on");
    gsap.to(".nav-bar .container", 0.5, { x: "-200px" });
    gsap.to(".line1", 0.5, { rotate: "45", y: 6 });
    gsap.to(".line2", 0.5, { opacity: 0 });
    gsap.to(".line3", 0.5, { rotate: "-45", y: -6 });
  } else {
    removeNavbar(e);
  }
}

function removeNavbar(e) {
  burger.classList.remove("active");
  navWrapper.classList.remove("nav-on");
  gsap.to(".nav-bar .container", 0.5, { x: 0 });
  gsap.to(".line1", 0.5, { rotate: "0", y: 0 });
  gsap.to(".line2", 0.5, { opacity: 1 });
  gsap.to(".line3", 0.5, { rotate: "0", y: 0 });
}
// Event listeners
burger.addEventListener("click", navToggle);
window.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("link") ||
    e.target.classList.contains("nav-on")
  ) {
    removeNavbar(e);
  }
});

// Smooth Scroll
// Smooth Scrolling
$(".links .link").on("click", function (event) {
  if (this.hash !== "") {
    const hash = this.hash;

    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top - 80,
      },
      500
    );
  }
});

// Animating Home Page
//
//
let controller;
let homeScene;

function animateHeader() {
  // Init Controller
  controller = new ScrollMagic.Controller();
  let tlHeader = gsap.timeline({
    defaults: { duration: 1, ease: "power2.inOut" },
  });
  tlHeader
    .fromTo(
      ".nav-bar .container",
      { opacity: 0, yPercent: -100 },
      { opacity: 1, yPercent: 0 }
    )
    .fromTo(".reveal-text", { xPercent: 0 }, { xPercent: -100 })
    .fromTo(".reveal-img", { xPercent: 0 }, { xPercent: 150 }, "<0");

  const header = document.querySelector("header");
  // Create Scene
  homeScene = new ScrollMagic.Scene({
    triggerElement: header,
    triggerHook: 0.7,
    reverse: false,
  })
    .setTween(tlHeader)
    .addTo(controller);
}

function animateWorks() {
  // Init Controller
  controller = new ScrollMagic.Controller();
  let works = gsap.to(".works", {
    opacity: 1,
    scale: 1,
    ease: "power2.out",
    duration: 1,
  });
  const projects = document.querySelector("#projects");
  // Create Scene
  homeScene = new ScrollMagic.Scene({
    triggerElement: projects,
    triggerHook: 0.7,
    reverse: false,
  })
    .setTween(works)
    .addTo(controller);
}

function animateSkills() {
  // Init Controller
  controller = new ScrollMagic.Controller();
  let animSkills = gsap.to(".reveal-skills", {
    xPercent: 100,
    ease: "power2.out",
    duration: 1,
  });

  const skills = document.querySelector("#skills");
  // Create Scene
  homeScene = new ScrollMagic.Scene({
    triggerElement: skills,
    triggerHook: 0.7,
    reverse: false,
  })
    .setTween(animSkills)
    .addTo(controller);
}

function animateWorkWitnMe() {
  // Init Controller
  controller = new ScrollMagic.Controller();
  let workWithMe = gsap.to(".reveal-works", {
    xPercent: -100,
    ease: "power2.out",
    duration: 1,
  });

  const withMe = document.querySelector("#work-with-me");
  // Create Scene
  homeScene = new ScrollMagic.Scene({
    triggerElement: withMe,
    triggerHook: 0.7,
    reverse: false,
  })
    .setTween(workWithMe)
    .addTo(controller);
}

function animateContact() {
  // Init Controller
  controller = new ScrollMagic.Controller();
  let animContact = gsap.to(".reveal-contact", {
    xPercent: 100,
    ease: "power2.out",
    duration: 1,
  });

  const contact = document.querySelector("#contact");
  // Create Scene
  homeScene = new ScrollMagic.Scene({
    triggerElement: contact,
    triggerHook: 0.7,
    reverse: false,
  })
    .setTween(animContact)
    .addTo(controller);
}

function animateAbout() {
  // Init Controller
  controller = new ScrollMagic.Controller();
  let animAbout = gsap.to(".anim-about", {
    opacity: 1,
    ease: "power2.out",
    duration: 2,
  });

  const about = document.querySelector("#about");
  // Create Scene
  homeScene = new ScrollMagic.Scene({
    triggerElement: about,
    triggerHook: 0.7,
    reverse: false,
  })
    .setTween(animAbout)
    .addTo(controller);
}

// Barba Page Transitions
const logo = document.querySelector("#logo");
const projects = document.querySelector(".project_link");
const contact = document.querySelector(".contact_link");
const about = document.querySelector(".about_link");
barba.init({
  sync: true,
  views: [
    {
      namespace: "home",
      beforeEnter() {
        logo.href = "./index.html";
        animateHeader();
        animateWorks();
        animateSkills();
        animateWorkWitnMe();
        animateContact();
        animateAbout();
      },
      beforeLeave() {
        controller.destroy();
        homeScene.destroy();
      },
    },
    {
      namespace: "project",
      afterEnter() {
        logo.href = "../index.html";
        projects.href = "../index.html#projects";
        contact.href = "../index.html#contact";
        about.href = "../index.html#about";
      },
    },
  ],
  transitions: [
    {
      async leave({ current, next }) {
        let done = this.async();
        // An animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(
          ".swipe",
          0.5,
          { x: "-100%" },
          { x: "0%", onComplete: done },
          "-=0.5"
        );
      },
      async enter({ current, next }) {
        let done = this.async();
        // Scroll to the top
        window.scrollTo(0, 0);
        // An animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(
          ".swipe",
          1,
          { x: "0%" },
          { x: "100%", stagger: 0.2, onComplete: done }
        );
        tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
      },
    },
  ],
});
