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

const cellArray = [...document.querySelectorAll('.cell')];
cellClick(cellArray);

const blockArray = document.querySelectorAll('.block');
const horizontalArray = [];
for (let i = 0; i < cellArray.length ** 0.5; i += 1) {
  let arr = [];
  horizontalArray.push(arr);
}

let countArray = -1;

for (let i = 1; i <= blockArray.length ** 0.5; i += 1) {
  for (let n = 1; n <= blockArray.length ** 0.5; n += 1) {
    countArray += 1; 
    for (let j = 0; j < 25; j += 1) {
      let indexCell = j + (25 * (countArray + 1)) - 25;
      let indexArray = Math.ceil((indexCell + 1 - (25 * (countArray - n + 1))) / 5) - 1;
      console.log(indexCell)
      console.log(indexArray)
      horizontalArray[indexArray].push(indexCell);
    }
    console.log(horizontalArray);
  }
}

/*for (let i = 1; i <= blockArray.length ** 0.5; i += 1) {
  let children = blockArray.childNodes();
  for (let j = 1; j <= 5; j += 1) {
    let array = [];
    for (let n = 1; n <= blockArray.length ** 0.5; n += 1) {
      for (let x = 1; x <= 5; x += 1) {
        array.push(children[x * j - 1]);
      }
    }
    horizontalArray.push(array);
  }
}*/

console.log(horizontalArray)