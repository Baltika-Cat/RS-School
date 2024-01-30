import { cellClick } from './scripts/cell-click.js';
import { createGrid } from './scripts/create-grid.js';
import { crosswords } from './scripts/crosswords.js';
import { createHint } from './scripts/create-hint.js';
import { resetNonogram } from './scripts/reset-nonogram.js';
import { showAnswer } from './scripts/show-answer.js';
import { createSizeWindow } from './scripts/create-size-window.js';
import { createNameWindow } from './scripts/create-name-window.js';
import { timer } from './scripts/timer.js';
import { removeHintGrid } from './scripts/remove-hint-grid.js';
import { appendHintGrid } from './scripts/append-hint-grid.js';
//  import { createCrossword } from './scripts/test-script/supportive-script.js';

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
}, false);

const body = document.body;

const main = document.createElement('div');
main.classList.add('main');
body.append(main);

const background = document.createElement('div');
background.classList.add('background');
background.classList.add('invisible');
main.append(background);

const changeSizeWindow = document.createElement('div');
changeSizeWindow.classList.add('change-size-window');
changeSizeWindow.classList.add('invisible');
main.append(changeSizeWindow);

const changeNameWindow = document.createElement('div');
changeNameWindow.classList.add('change-name-window');
changeNameWindow.classList.add('invisible');
main.append(changeNameWindow);

const buttonsArea = document.createElement('div');
buttonsArea.classList.add('buttons-area');
main.append(buttonsArea);

const saveButton = document.createElement('div');
saveButton.classList.add('button');
saveButton.textContent = 'Save';
buttonsArea.append(saveButton);

const chooseButton = document.createElement('div');
chooseButton.classList.add('button');
chooseButton.textContent = 'Choose nonogram';
buttonsArea.append(chooseButton);

const resetButton = document.createElement('div');
resetButton.classList.add('button');
resetButton.textContent = 'Reset';
buttonsArea.append(resetButton);

const answerButton = document.createElement('div');
answerButton.classList.add('button');
answerButton.textContent = 'Show answer';
buttonsArea.append(answerButton);

const gridWrap = document.createElement('div');
gridWrap.classList.add('grid-wrap');
main.append(gridWrap);

const gridOver = document.createElement('div');
gridOver.classList.add('grid-over');
gridWrap.append(gridOver);

const timerWrap = document.createElement('div');
timerWrap.classList.add('timer');
timerWrap.textContent = '00:00';
gridOver.append(timerWrap);

const themeButton = document.createElement('div');
themeButton.classList.add('button');
themeButton.classList.add('theme-button');
gridOver.append(themeButton);

const topHint = document.createElement('div');
topHint.classList.add('top-hint');
gridWrap.append(topHint);

const gridLeftHint = document.createElement('div');
gridLeftHint.classList.add('grid-left-hint');
gridWrap.append(gridLeftHint);

const leftHint = document.createElement('div');
leftHint.classList.add('left-hint');
gridLeftHint.append(leftHint);

const grid = document.createElement('div');
grid.classList.add('grid');
gridLeftHint.append(grid);

let length = 1;

createGrid (length, grid);

let cellArray = [...document.querySelectorAll('.cell')];

let crosswordsArray = crosswords.filter((item) => item.size === length);

let crossword = {};

crosswordsArray.forEach ((item) => {
  if (item.name === 'Cat') {
    crossword = item;
  }
})

cellArray.forEach ((item) => {
  item.addEventListener('click', () => {
    if (timer.isStarted === false) {
      timer.updateTimer(timerWrap);
    }
  })
})

createHint(length, topHint, leftHint, crossword.horizontalLines, crossword.verticalLines);

/* const blockArray = document.querySelectorAll('.block');

let countArray = -1;

let supportiveObject = {};

window.addEventListener('mouseup', (e) => {
  if (e.button === 1) {
    supportiveObject = createCrossword(length, blockArray, cellArray, countArray);
    console.log(supportiveObject);
  }
}) */

resetButton.addEventListener('click', () => {
  resetNonogram(cellArray);
  clearInterval(timer.interval);
  timerWrap.textContent = '00:00';
  timer.isStarted = false;
  timer.seconds = 0;
  timer.minutes = 0;
})

answerButton.addEventListener('click', () => {
  showAnswer(crossword.fullCellArray, cellArray);
})

chooseButton.addEventListener('click', () => {
  background.classList.remove('invisible');
  changeSizeWindow.classList.remove('invisible');
  createSizeWindow(changeSizeWindow);
  timer.isPaused = true;
})

changeSizeWindow.addEventListener('click', (e) => {
  let returnButtons = [...document.querySelectorAll('.return-button')];
  let sizes = [...document.querySelector('.size-area').childNodes];
  if (returnButtons.includes(e.target)) {
    background.classList.add('invisible');
    changeSizeWindow.classList.add('invisible');
    timer.isPaused = false;
  }
  else if (sizes.includes(e.target)) {
    length = sizes.indexOf(e.target) + 1;
    let nameArray = crosswords.filter((item) => item.size === sizes.indexOf(e.target) + 1);
    nameArray = nameArray.map((item) => item.name);
    createNameWindow(changeNameWindow, nameArray);
    changeSizeWindow.classList.add('invisible');
    changeNameWindow.classList.remove('invisible');
  }
})

changeNameWindow.addEventListener('click', (e) => {
  let returnButtons = [...document.querySelectorAll('.return-button')];
  let buttons = [...document.querySelector('.name-area').childNodes];
  if (returnButtons.includes(e.target)) {
    changeNameWindow.classList.add('invisible');
    changeSizeWindow.classList.remove('invisible');
  } else if (buttons.includes(e.target)) {
    console.log(true)
    crosswordsArray = crosswords.filter((item) => item.size === length);
    crosswordsArray.forEach ((item) => {
      if (item.name === e.target.textContent) {
        console.log(e.target.textContent)
        crossword = item;
      }
    })
    removeHintGrid(topHint, leftHint, grid);
    createGrid(length, grid);
    createHint(length, topHint, leftHint, crossword.horizontalLines, crossword.verticalLines);
    appendHintGrid(gridWrap, topHint, gridLeftHint, leftHint, grid);
    background.classList.add('invisible');
    changeNameWindow.classList.add('invisible');
    cellArray = [...document.querySelectorAll('.cell')];
    cellClick(cellArray, crossword.countCheck, crossword.fullCellArray);
  }
})

cellClick(cellArray, crossword.countCheck, crossword.fullCellArray);

let theme = 'light';
themeButton.textContent = 'Dark theme';

themeButton.addEventListener('click', () => {
  if (theme === 'light') {
    theme = 'dark';
    themeButton.textContent = 'Light theme';
  } else {
    theme = 'light';
    themeButton.textContent = 'Dark theme';
  }
  let allElements = [...body.getElementsByTagName('*')];
  allElements.forEach ((item) => {
    item.classList.toggle('dark-theme');
  })
})

saveButton.addEventListener('click', () => {
  let cellFull = [];
  cellArray.forEach ((cell) => {
    if (cell.classList.contains('cell-full')) {
      cellFull.push(1);
    } else {
      cellFull.push(0);
    }
  })
  let object = {
    topHint: topHint,
    leftHint: leftHint,
    grid: grid,
    cellFull: cellFull
  }
  localStorage.setItem('saved game', JSON.stringify(object));
})

window.addEventListener('click', (e) => {
  if (e.button === 1) {

  }
})