const body = document.querySelector('body');

const gallowsWrapper = document.createElement('div');
body.appendChild(gallowsWrapper);
gallowsWrapper.classList.add('gallowsWrapper');
const gallows = document.createElement('img');
gallows.src = 'images/gallows.svg';
gallowsWrapper.appendChild(gallows);
gallows.classList.add('gallows');

const hangHead = document.createElement('img');
hangHead.src = 'images/head.svg';
hangHead.classList.add('hangHead');
hangHead.classList.add('invisible');
gallowsWrapper.appendChild(hangHead);

const hangBody = document.createElement('img');
hangBody.src = 'images/body.svg';
hangBody.classList.add('hangBody');
hangBody.classList.add('invisible');
gallowsWrapper.appendChild(hangBody);
