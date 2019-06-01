import throttle from './throttle';

let previousScroll = window.scrollY;
const navElement = document.querySelector('nav');
const figureElement = document.querySelector('figure');

const addSticky = () => {
    navElement.classList.add('sticky');
    figureElement.classList.add('sticky-follow');
}

const removeSticky = () => {
    navElement.classList.remove('sticky');
    figureElement.classList.remove('sticky-follow');
}

const scrollingUp = () => window.scrollY > 0 && window.scrollY < previousScroll;

export default throttle(() => {
    scrollingUp() ? addSticky() : removeSticky();
    previousScroll = window.scrollY;
}, 500);
