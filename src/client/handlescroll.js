import throttle from "./throttle";

let previousScroll = window.scrollY;
const navElement = document.querySelector("nav");

const addSticky = () => {
  navElement.classList.add("sticky");
};

const removeSticky = () => {
  navElement.classList.remove("sticky");
};

const scrollingUp = () => window.scrollY > 0 && window.scrollY < previousScroll;

export default throttle(() => {
  if (scrollingUp()) {
    addSticky();
  } else {
    removeSticky();
  }
  previousScroll = window.scrollY;
}, 500);
