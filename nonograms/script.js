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
import { startTimer } from './scripts/start-timer.js';
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

let cellArray = [...grid.querySelectorAll('.cell')];

let crosswordsArray = crosswords.filter((item) => item.size === length);

let crossword = {};

crosswordsArray.forEach ((item) => {
  if (item.name === 'Cat') {
    crossword = item;
  }
})

startTimer(cellArray, timer, timerWrap);

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
  saveButton.classList.remove('save-button');
  resetNonogram(cellArray);
  clearInterval(timer.interval);
  timerWrap.textContent = '00:00';
  timer.isStarted = false;
  timer.seconds = 0;
  timer.minutes = 0;
})

answerButton.addEventListener('click', () => {
  saveButton.classList.add('save-button');
  showAnswer(crossword.fullCellArray, cellArray);
})

chooseButton.addEventListener('click', () => {
  background.classList.remove('invisible');
  changeSizeWindow.classList.remove('invisible');
  createSizeWindow(changeSizeWindow);
  timer.isPaused = true;
})

const removeWinBackground = function() {
  buttonsArea.childNodes[0].after(chooseButton);
  chooseButton.classList.remove('button-win');
  background.classList.remove('background-win');
  let backgroundChildren = [...background.childNodes];
  let backgroundCells = [...background.querySelectorAll('.cell')];
  let backgroundBlocks = [...background.querySelectorAll('.block')];
  backgroundCells.forEach (item => item.remove());
  backgroundCells = [...background.querySelectorAll('.cell')];
  backgroundChildren.forEach (item => {
    let children = [...item.childNodes];
    children.forEach (child => item.removeChild(child));
    item.remove();
  });
}

changeSizeWindow.addEventListener('click', (e) => {
  let returnButtons = [...document.querySelectorAll('.return-button')];
  let sizes = [...document.querySelector('.size-area').childNodes];
  if (returnButtons.includes(e.target)) {
    background.classList.add('invisible');
    changeSizeWindow.classList.add('invisible');
    timer.isPaused = false;
    if (buttonsArea.childNodes.length < 4) {
      removeWinBackground();
    }
    console.log(timer.isStopped)
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
    crosswordsArray = crosswords.filter((item) => item.size === length);
    crosswordsArray.forEach ((item) => {
      if (item.name === e.target.textContent) {
        crossword = item;
      }
    })
    saveButton.classList.removes('save-button');
    removeHintGrid(topHint, leftHint, grid);
    createGrid(length, grid);
    createHint(length, topHint, leftHint, crossword.horizontalLines, crossword.verticalLines);
    appendHintGrid(gridWrap, topHint, gridLeftHint, leftHint, grid);
    background.classList.add('invisible');
    changeNameWindow.classList.add('invisible');
    cellArray = [...grid.querySelectorAll('.cell')];
    cellClick(cellArray, crossword, resetButton, background, grid, chooseButton);
    timerWrap.textContent = '00:00';
    timer.isStarted = false;
    timer.isPaused = false;
    timer.seconds = 0;
    timer.minutes = 0;
    clearInterval(timer.interval);
    startTimer(cellArray, timer, timerWrap);
    if (buttonsArea.childNodes.length < 4) {
      buttonsArea.childNodes[0].after(chooseButton);
      chooseButton.classList.remove('button-win');
    }
    removeWinBackground();
  }
})

cellClick(cellArray, crossword, resetButton, background, grid, chooseButton);

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
    } else if (cell.classList.contains('cell-cross')) {
      cellFull.push(2);
    } else {
      cellFull.push(0);
    }
  })
  let object = {
    ordinal: crossword.ordinal,
    cellFull: cellFull,
    timer: timerWrap.textContent,
    minutes: timer.minutes,
    seconds: timer.seconds
  }
  localStorage.setItem('saved game', JSON.stringify(object));
})

window.addEventListener('click', (e) => {
  let continueButton = document.querySelector('.continue-button');
  if (e.target === continueButton) {
    saveButton.classList.remove('save-button');
    background.classList.add('invisible');
    changeSizeWindow.classList.add('invisible');
    removeHintGrid(topHint, leftHint, grid);
    let object = JSON.parse(localStorage.getItem('saved game'));
    let cross = crosswords.filter((item) => item.ordinal === object.ordinal)[0];
    createGrid(cross.size, grid);
    createHint(cross.size, topHint, leftHint, cross.horizontalLines, cross.verticalLines);
    cellArray = [...grid.querySelectorAll('.cell')];
    cellArray.map((item, index) => {
      if (object.cellFull[index] === 1) {
        item.classList.add('cell-full');
        item.classList.remove('cell-cross');
      } else if (object.cellFull[index] === 2) {
        item.classList.add('cell-cross');
        item.classList.remove('cell-full');
      } else {
        item.classList.remove('cell-cross');
        item.classList.remove('cell-full');
      }
    })
    cellClick(cellArray, crossword, resetButton, background, grid, chooseButton);
    timer.isStarted = false;
    timer.isPaused = false;
    timer.minutes = object.minutes;
    timer.seconds = object.seconds;
    clearInterval(timer.interval);
    timerWrap.textContent = object.timer;
    startTimer(cellArray, timer, timerWrap);
  }
})