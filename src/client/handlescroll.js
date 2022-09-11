import throttle from "./throttle";

let previousScroll = window.scrollY;
const navElement = document.querySelector("nav");
const mainElement = document.querySelector("main");
const sparkleHero = document.querySelector(".hero img.sparkle");
const addSticky = () => {
  navElement.classList.add("sticky");
  mainElement.classList.add("sticky-follow");
};

const removeSticky = () => {
  navElement.classList.remove("sticky");
  mainElement.classList.remove("sticky-follow");
};

const scrollingUp = () => window.scrollY > 0 && window.scrollY < previousScroll;

export default throttle(() => {
  if (scrollingUp()) {
    const delta = previousScroll - window.scrollY;

    if (delta > 0) {
      addSticky();
    }
  } else {
    const delta = window.scrollY - previousScroll;

    if (delta > 0) {
      if (window.scrollY > 100) {
        sparkleHero.setAttribute("style", 'display: block');
      }

      removeSticky();
    }
  }
  previousScroll = window.scrollY;
}, 500);
