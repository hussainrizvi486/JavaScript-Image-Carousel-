const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevBtn = document.querySelector('.carousel-btn-left');
const nextBtn = document.querySelector('.carousel-btn-right');

const slideWidt = slides[0].getBoundingClientRect()
const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);
slides[0].classList.add('current-slide');

const moveSlide = (track, currentSlide, targetSlide) => {
    const targetIndex = slides.indexOf(targetSlide);
    const offset = -targetIndex * slideWidth;
    track.style.transform = `translateX(${offset}px)`;
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};

const nextSlide = () => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    if (nextSlide) {
        moveSlide(track, currentSlide, nextSlide);
    } else {
        const firstSlide = slides[0];
        moveSlide(track, currentSlide, firstSlide);
    }
};

const prevSlide = () => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    if (prevSlide) {
        moveSlide(track, currentSlide, prevSlide);
    } else {
        const lastSlide = slides[slides.length - 1];
        moveSlide(track, currentSlide, lastSlide);
    }
}

let autoplayInterval = 3000;
let autoplayTimer = setInterval(nextSlide, autoplayInterval);

prevBtn.addEventListener('click', e => {
    clearInterval(autoplayTimer);
    prevSlide();
    autoplayTimer = setInterval(nextSlide, autoplayInterval);
});

nextBtn.addEventListener('click', e => {
    clearInterval(autoplayTimer);
    nextSlide();
    autoplayTimer = setInterval(nextSlide, autoplayInterval);
});
