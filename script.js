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