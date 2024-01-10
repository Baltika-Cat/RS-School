const body = document.querySelector('body');
const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";

const main = document.createElement('main');
main.classList.add('main');
body.appendChild(main);

const gallowsWrapper = document.createElement('div');
main.appendChild(gallowsWrapper);
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

const riddleWrapper = document.createElement('div');
riddleWrapper.classList.add('riddle-wrapper');
main.appendChild(riddleWrapper);

const riddles = [
  {
    ordinal: 1,
    question: 'Волосатая головка за щекой играет ловко',
    answer: 'щётка',
  },
  {
    ordinal: 2,
    question: 'мя',
    answer: 'мя'
  },
  {
    
  }
]


const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
riddleWrapper.appendChild(keyboard);

for (let i = 0; i < alphabet.length; i += 1) {
  let key = document.createElement('div');
  key.classList.add('key');
  keyboard.appendChild(key);
  key.textContent = alphabet[i].toUpperCase();
}