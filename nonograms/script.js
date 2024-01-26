import { cellClick } from './scripts/cell-click.js';
import { createGrid } from './scripts/create-grid.js';
import { createCrossword } from './scripts/test-script/supportive-script.js';
import { crosswords } from './scripts/crosswords.js';

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
}, false);

const body = document.body;

const main = document.createElement('div');
main.classList.add('main');
body.append(main);

const grid = document.createElement('div');
grid.classList.add('grid');
main.append(grid);

createGrid (3, grid);

const cellArray = [...document.querySelectorAll('.cell')];

let crossword = {};

crosswords.forEach ((item) => {
  if (item.name === 'rabbit') {
    crossword = item;
    return;
  }
})

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