import { cellClick } from './scripts/cell-click.js';
import { createGrid } from './scripts/create-grid.js';
import { createCrossword } from './scripts/test-script/supportive-script.js';
import { crosswords } from './scripts/crosswords.js';
import { createHint } from './scripts/create-hint.js';
import { resetNonogram } from './scripts/reset-nonogram.js';
import { showAnswer } from './scripts/show-answer.js';
import { createSizeWindow } from './scripts/create-size-window.js';

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

const cellArray = [...document.querySelectorAll('.cell')];

let crosswordsArray = crosswords.filter((item) => item.size === length);

let crossword = {};

crosswordsArray.forEach ((item) => {
  if (item.name === 'Cat') {
    crossword = item;
  }
})

createHint(length, topHint, leftHint, crossword.horizontalLines, crossword.verticalLines);

cellClick(cellArray, crossword.countCheck, crossword.fullCellArray);

const blockArray = document.querySelectorAll('.block');

let countArray = -1;

let supportiveObject = {};

window.addEventListener('mouseup', (e) => {
  if (e.button === 1) {
    supportiveObject = createCrossword(length, blockArray, cellArray, countArray);
    console.log(supportiveObject);
  }
})

resetButton.addEventListener('click', () => {
  resetNonogram(cellArray);
})

answerButton.addEventListener('click', () => {
  showAnswer(crossword.fullCellArray, cellArray);
})

chooseButton.addEventListener('click', () => {
  background.classList.remove('invisible');
  changeSizeWindow.classList.remove('invisible');
  createSizeWindow(changeSizeWindow);
})

changeSizeWindow.addEventListener('click', (e) => {
  let returnButtons = [...document.querySelectorAll('.return-button')];
  if (returnButtons.includes(e.target)) {
    background.classList.add('invisible');
    changeSizeWindow.classList.add('invisible');
  }
})