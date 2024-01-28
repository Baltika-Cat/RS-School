import { cellClick } from './scripts/cell-click.js';
import { createGrid } from './scripts/create-grid.js';
import { createCrossword } from './scripts/test-script/supportive-script.js';
import { crosswords } from './scripts/crosswords.js';
import { createHint } from './scripts/create-hint.js';

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
}, false);

const body = document.body;

const main = document.createElement('div');
main.classList.add('main');
body.append(main);

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

let length = 3;

createGrid (length, grid);

const cellArray = [...document.querySelectorAll('.cell')];

let crossword = {};

crosswords.forEach ((item) => {
  if (item.name === 'heron') {
    crossword = item;
    return;
  }
})

createHint (length, topHint, leftHint, crossword.horizontalLines, crossword.verticalLines);

cellClick(cellArray, crossword.countCheck, crossword.fullCellArray);

const blockArray = document.querySelectorAll('.block');

let countArray = -1;

let supportiveObject = {};

window.addEventListener('mouseup', (e) => {
  if (e.button === 1) {
    supportiveObject = createCrossword(3, blockArray, cellArray, countArray);
    console.log(supportiveObject);
  }
})