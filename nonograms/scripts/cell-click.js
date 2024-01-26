import { checkCrossword } from './check-crossword.js';

export const cellClick = function (array, rightCount, rightArray) {
  let count = 0;
  array.forEach ((cell) => {
    cell.addEventListener ('mouseup', (e) => {
      let mark = false;
      if (e.button === 0) {
        cell.classList.remove('cell-cross');
        cell.classList.toggle('cell-full');
        if (cell.classList.contains('cell-full')) {
          count += 1;
        } else {
          count -= 1;
        }
      }
      if (e.button === 2) {
        if (cell.classList.contains('cell-full')) {
          mark = true;
        }
        cell.classList.remove('cell-full');
        cell.classList.toggle('cell-cross');
        if (mark) {
          count -= 1;
        }
      }
      if (count === rightCount) {
        let currentArray = [];
        array.forEach((cell) => {
          if (cell.classList.contains('cell-full')) {
            currentArray.push(1);
          } else {
            currentArray.push(0);
          }
        })
        checkCrossword(currentArray, rightArray);
      }
    })
  })
}