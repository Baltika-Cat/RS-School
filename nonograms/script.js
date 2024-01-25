import { cellClick } from './scripts/cell-click.js';
import { createGrid } from './scripts/create-grid.js';

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

const cellArray = document.querySelectorAll('.cell');
cellClick(cellArray);