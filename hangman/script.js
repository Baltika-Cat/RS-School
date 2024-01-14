const body = document.querySelector('body');
const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";

body.classList.add('body');

const main = document.createElement('main');
main.classList.add('main');
body.append(main);

const gallowsWrapper = document.createElement('div');
main.append(gallowsWrapper);
gallowsWrapper.classList.add('gallows-wrapper');

const imagesVisible = [];

const gallows = document.createElement('img');
gallows.src = 'images/gallows.svg';
gallowsWrapper.append(gallows);
gallows.classList.add('gallows');
imagesVisible.push(gallows);

const hangHead = document.createElement('img');
hangHead.src = 'images/head.svg';
hangHead.classList.add('hang-head');
hangHead.classList.add('invisible');
gallowsWrapper.append(hangHead);
imagesVisible.push(hangHead);

const hangBody = document.createElement('img');
hangBody.src = 'images/body.svg';
hangBody.classList.add('hang-body');
hangBody.classList.add('invisible');
gallowsWrapper.append(hangBody);
imagesVisible.push(hangBody);

const hangLeftHand = document.createElement('img');
hangLeftHand.src = 'images/left-hand.svg';
hangLeftHand.classList.add('hang-left-hand');
hangLeftHand.classList.add('invisible');
gallowsWrapper.append(hangLeftHand);
imagesVisible.push(hangLeftHand);

const hangRightHand = document.createElement('img');
hangRightHand.src = 'images/right-hand.svg';
hangRightHand.classList.add('hang-right-hand');
hangRightHand.classList.add('invisible');
gallowsWrapper.append(hangRightHand);
imagesVisible.push(hangRightHand);

const hangLeftLeg = document.createElement('img');
hangLeftLeg.src = 'images/left-leg.svg';
hangLeftLeg.classList.add('hang-left-leg');
hangLeftLeg.classList.add('invisible');
gallowsWrapper.append(hangLeftLeg);
imagesVisible.push(hangLeftLeg);

const hangRightLeg = document.createElement('img');
hangRightLeg.src = 'images/right-leg.svg';
hangRightLeg.classList.add('hang-right-leg');
hangRightLeg.classList.add('invisible');
gallowsWrapper.append(hangRightLeg);
imagesVisible.push(hangRightLeg);

const riddleWrapper = document.createElement('div');
riddleWrapper.classList.add('riddle-wrapper');
main.append(riddleWrapper);

const background = document.createElement('div');
background.classList.add('background');
background.classList.add('invisible');
body.append(background);

const endWindow = document.createElement('div');
endWindow.classList.add('end-window');
endWindow.classList.add('invisible');
body.append(endWindow);

const newGameButton = document.createElement('div');
newGameButton.classList.add('new-game-btn');
newGameButton.classList.add('invisible');
newGameButton.textContent = 'Сыграем ещё?';

const riddles = [
  {
    ordinal: 1,
    question: 'Растёт от алкоголя, но умирает от воды',
    answer: 'огонь',
  },
  {
    ordinal: 2,
    question: '1/4 часть круга',
    answer: 'квадрант'
  },
  {
    ordinal: 3,
    question: 'Одна из отраслей изобразительного искусства, которую часто называют "искусством красивого письма"',
    answer: 'каллиграфия'
  },
  {
    ordinal: 4,
    question: 'Парусный спорт в программе Олимпийских игр',
    answer: 'регата'
  },
  {
    ordinal: 5,
    question: 'Известный вулкан в Италии',
    answer: 'Везувий'
  },
  {
    ordinal: 6,
    question: 'Маленький, серенький, на слона похож. Кто это?',
    answer: 'слонёнок'
  },
  {
    ordinal: 7,
    question: 'У него лапки, как у кота, и мордочка, как у кота, но это не кот. Кто это?',
    answer: 'котёнок'
  },
  {
    ordinal: 8,
    question: 'Его закапывают, когда оно живое, и выкапывают, когда мёртвое',
    answer: 'растение'
  },
  {
    ordinal: 9,
    question: 'Она может быть быстрой, может быть медленной, но не передвигается',
    answer: 'музыка'
  },
  {
    ordinal: 10,
    question: 'Эта птица носит название каши',
    answer: 'овсянка'
  }
]

const questionAnswer = document.createElement('div');
questionAnswer.classList.add('question-answer');
riddleWrapper.append(questionAnswer);

const question = document.createElement('p');
question.classList.add('question');
questionAnswer.append(question);

const answer = document.createElement('p');
answer.classList.add('answer');
questionAnswer.append(answer);

let riddleAnswer = '';
let rightAnswer = '';

let scoreNum = 0;

const winMessage = document.createElement('p');
winMessage.classList.add('win-message');
winMessage.classList.add('invisible');
endWindow.append(winMessage);
const loseMessage = document.createElement('p');
loseMessage.classList.add('lose-message');
loseMessage.classList.add('invisible');
endWindow.append(loseMessage);
endWindow.append(newGameButton);

const score = document.createElement('p');
score.classList.add('score');
score.textContent = `Попытки: ${scoreNum}/6`;
riddleWrapper.append(score);

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
riddleWrapper.append(keyboard);

let usedKeys = [];
let usedLetters = [];

const chooseLetter = function(sym) {
  let letter = sym.textContent.toLowerCase();
  if (!usedLetters.includes(letter)) {
    usedKeys.push(sym);
    if (riddleAnswer.includes(letter)) {
      let answerArray = answer.textContent.split(' ');
      for (let i = 0; i < riddleAnswer.length; i += 1) {
        if (riddleAnswer[i] === letter) {
          answerArray[i] = letter.toUpperCase();
          riddleAnswer = riddleAnswer.replace(letter, letter.toUpperCase());
        }
        answer.textContent = answerArray.join(' ');
        if (!answer.textContent.includes('_')) {
          background.classList.remove('invisible');
          endWindow.classList.remove('invisible');
          winMessage.classList.remove('invisible');
          newGameButton.classList.remove('invisible');
        }
      }
    } else {
      scoreNum += 1;
      imagesVisible[scoreNum].classList.remove('invisible');
      score.textContent = `Попытки: ${scoreNum}/6`;
      if (scoreNum >= 6) {
        background.classList.remove('invisible');
        endWindow.classList.remove('invisible');
        loseMessage.classList.remove('invisible');
        newGameButton.classList.remove('invisible');
      }
    }
    sym.classList.add('key-inactive');
    usedLetters.push(letter);
  }
}

for (let i = 0; i < alphabet.length; i += 1) {
  let key = document.createElement('div');
  key.classList.add('key');
  keyboard.append(key);
  key.textContent = alphabet[i].toUpperCase();
}

let usedRiddles = [];
let num = -1;
usedRiddles.push(num);

startGame();

function startGame() {
  scoreNum = 0;
  score.textContent = `Попытки: ${scoreNum}/6`;
  usedLetters = [];
  while (usedRiddles.includes(num) || num === 0) {
    num = Math.ceil(Math.random() * 10);
  }
  usedRiddles.push(num);

  if (usedRiddles.length === riddles.length) {
    usedRiddles = [-1];
  }

  riddles.forEach((riddle) => {
    if (riddle.ordinal === num) {
      question.textContent = riddle.question;
      answer.textContent = `${'_ '.repeat(riddle.answer.length - 1)}_`;
      riddleAnswer = riddle.answer.toLowerCase();
      rightAnswer = riddle.answer;
    }
  })

  const keys = document.querySelectorAll('.key');

  keys.forEach((key) => {
    key.addEventListener('click', () => {
      chooseLetter(key);
    })
  })

  window.addEventListener('keyup', (event) => {
    if (alphabet.includes(event.key.toLowerCase()) && !usedLetters.includes(event.key) && background.classList.contains('invisible')) {
      keys.forEach(key => {
        if (key.textContent.toLowerCase() === event.key.toLowerCase()) {
          chooseLetter(key);
        }
      })
    }
  })

  loseMessage.textContent = `Увы, не повезло. Правильный ответ: ${rightAnswer}`;
  winMessage.textContent = `Вы победили! Правильный ответ: ${rightAnswer}`;
}

newGameButton.addEventListener('click', () => {
  background.classList.add('invisible');
  winMessage.classList.add('invisible');
  loseMessage.classList.add('invisible');
  endWindow.classList.add('invisible');
  for(let i = 1; i < imagesVisible.length; i += 1) {
    imagesVisible[i].classList.add('invisible');
  }
  usedKeys.map(item => item.classList.remove('key-inactive'));
  usedKeys = [];
  usedLetters = [];
  newGameButton.classList.add('invisible');
  startGame();
})