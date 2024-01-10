const body = document.querySelector('body');

const gallows = document.createElement('img');
gallows.src = 'images/gallows.svg';
body.appendChild(gallows);
gallows.classList.add('gallows');

const head = document.createElement('img');
head.src = 'images/head.svg';
head.classList.add('invisible');
gallows.appendChild(head);