'use strict';

// Selecting elements
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');

console.log(allSections);

document.getElementById('section--1');
const allBtns = document.getElementsByTagName('button');
console.log(allBtns);

console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = 'We use cookis for improved functionality and analytics.';
message.innerHTML = `
We use cookis for improved functionality and analytics.
<button class='btn btn--close--cookie'>Got it!</button>
`;

//header.prepend(message);
header.append(message);
//header.append(message.cloneNode(true));

header.before(message);
header.after(message);

// Delete elements
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', () => message.remove());