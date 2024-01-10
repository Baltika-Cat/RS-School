const body = document.querySelector('body');

const gallowsWrapper = document.createElement('div');
body.appendChild(gallowsWrapper);
gallowsWrapper.classList.add('gallows-wrapper');
const gallows = document.createElement('img');
gallows.src = 'images/gallows.svg';
gallowsWrapper.appendChild(gallows);
gallows.classList.add('gallows');

const hangHead = document.createElement('img');
hangHead.src = 'images/head.svg';
hangHead.classList.add('hang-head');
hangHead.classList.add('invisible');
gallowsWrapper.appendChild(hangHead);

const hangBody = document.createElement('img');
hangBody.src = 'images/body.svg';
hangBody.classList.add('hang-body');
hangBody.classList.add('invisible');
gallowsWrapper.appendChild(hangBody);

const hangLeftHand = document.createElement('img');
hangLeftHand.src = 'images/left-hand.svg';
hangLeftHand.classList.add('hang-left-hand');
hangLeftHand.classList.add('invisible');
gallowsWrapper.appendChild(hangLeftHand);

const hangRightHand = document.createElement('img');
hangRightHand.src = 'images/right-hand.svg';
hangRightHand.classList.add('hang-right-hand');
hangRightHand.classList.add('invisible');
gallowsWrapper.appendChild(hangRightHand);

const hangLeftLeg = document.createElement('img');
hangLeftLeg.src = 'images/left-leg.svg';
hangLeftLeg.classList.add('hang-left-leg');
hangLeftLeg.classList.add('invisible');
gallowsWrapper.appendChild(hangLeftLeg);

const hangRightLeg = document.createElement('img');
hangRightLeg.src = 'images/right-leg.svg';
hangRightLeg.classList.add('hang-right-leg');
hangRightLeg.classList.add('invisible');
gallowsWrapper.appendChild(hangRightLeg);