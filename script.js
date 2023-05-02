'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function(e) {
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Cookie message

const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `
We use cookis for improved functionality and analytics.
<button class='btn btn--close--cookie'>Got it!</button>
`;

message.style.backgroundColor = '#37383d';
message.style.width = '100vw';
header.append(message);
message.style.height = `${ Number.parseFloat(getComputedStyle(message).height) + 40 }px`;
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', () => message.remove());

///////////////////////////////////////
// Anchors scroll

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', () => section1.scrollIntoView({ behavior: 'smooth' }));

document.querySelector('.nav__links').addEventListener('click', evt => {
  evt.preventDefault();

  const target = evt.target;
  if (!target.classList.contains('nav__link')) return;

  const id = target.getAttribute('href');
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Tabbed component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', evt => {
  const target = evt.target.closest('.operations__tab');
  if (!target || !target.classList.contains('operations__tab')) return;

  const tabId = target.dataset.tab;
  const clickedTabContent = document.querySelector(`.operations__content--${ tabId }`);

  tabsContent.forEach(content => content.classList.remove('operations__content--active'));
  clickedTabContent.classList.add('operations__content--active');

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  target.classList.add('operations__tab--active');
});

///////////////////////////////////////
// Menu fade animation

const nav = document.querySelector('.nav');
const links = [ ...nav.querySelectorAll('.nav__link'), nav.querySelector('.nav__logo') ];

nav.addEventListener('mouseover', evt => {
  const target = evt.target;
  if (!target.classList.contains('nav__link')) return;

  links.forEach(link => {
    if (link !== target) link.style.opacity = '0.5';
  });
});

nav.addEventListener('mouseout', () => links.forEach(link => link.style.opacity = '1'));

///////////////////////////////////////
// Sticky navigation

const navHeight = nav.getBoundingClientRect().height;
let timeoutId;

const stickyNav = entries => {
  const [ entry ] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
    nav.animate([
      { translate: `0 -${ navHeight }px` },
      { translate: `0 0`, height: `${ navHeight + 10 }px` },
      { height: `${ navHeight - 5 }px` },
      { height: `${ navHeight }px` }
    ], {
      duration: 500
    });
  } else {
    timeoutId && clearTimeout(timeoutId);
    timeoutId = setTimeout(() => nav.classList.remove('sticky'), 100);
    nav.animate([
      { translate: `0 0`, height: `${ navHeight }px` },
      { translate: `0 0`, height: `${ navHeight + 30 }px` },
      { translate: `0 -${ navHeight }px` }
    ], {
      duration: 100
    });
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${ navHeight }px`
});
headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections

const allSections = document.querySelectorAll('.section');

const revealSection = (entries, observer) => {
  const [ entry ] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});
allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

///////////////////////////////////////
// Lazy loading images

const loadImg = entries => {
  const [ entry ] = entries;
  if (!entry.isIntersecting) return;

  const img = entry.target;

  img.src = img.dataset.src;
  img.addEventListener('load', function() {
    this.classList.remove('lazy-img');
  });

  imgObserver.unobserve(img);
};

const imgTargets = document.querySelectorAll('img[data-src]');
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px'
});

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// Slider

const slider = () => {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  const maxSlide = slides.length - 1;
  let currSlide = 0;

  const createDots = () => {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend', `<button class='dots__dot' data-slide='${ i }'></button>`
      );
    });
  };

  const activateDot = slide => {
    document.querySelectorAll(
      '.dots__dot'
    )
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document.querySelector(
      `.dots__dot[data-slide="${ slide }"]`
    )
      .classList.add('dots__dot--active');
  };

  const goToSlide = slide => {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${ 100 * (i - slide) }%)`;
    });
  };

  const nextSlide = () => {
    if (currSlide === maxSlide) currSlide = 0;
    else currSlide++;

    goToSlide(currSlide);
    activateDot(currSlide);
  };

  const prevSlide = () => {
    if (currSlide === 0) currSlide = maxSlide;
    else currSlide--;

    goToSlide(currSlide);
    activateDot(currSlide);
  };

  const initializeSlider = () => {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  initializeSlider();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', evt => {
    if (evt.key === 'ArrowLeft') prevSlide();
    if (evt.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', evt => {
    const dot = evt.target;

    if (!dot.classList.contains('dots__dot')) return;

    const { slide } = dot.dataset;
    goToSlide(slide);
    activateDot(slide);
  });
};
slider();