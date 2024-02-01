import { checkCrossword } from './check-crossword.js';

export const cellClick = function (array, rightCount, rightArray, resetButton) {
  let currentCount = 0;
  array.forEach ((cell) => {
    cell.addEventListener ('mouseup', (e) => {
      resetButton.addEventListener('click', () => {
        currentCount = 0;
      })
      // console.log(array.indexOf(cell))
      let mark = false;
      if (e.button === 0) {
        cell.classList.remove('cell-cross');
        cell.classList.toggle('cell-full');
        if (cell.classList.contains('cell-full')) {
          console.log('full')
          currentCount += 1;
        } else {
          currentCount -= 1;
        }
      }
      if (e.button === 2) {
        if (cell.classList.contains('cell-full')) {
          mark = true;
        }
        cell.classList.remove('cell-full');
        cell.classList.toggle('cell-cross');
        if (mark) {
          currentCount -= 1;
        }
      }
      if (currentCount === rightCount) {
        let currentArray = [];
        array.forEach((cell) => {
          if (cell.classList.contains('cell-full')) {
            currentArray.push(1);
          } else {
            currentArray.push(0);
          }
        })
        console.log(currentArray)
        console.log(rightArray)
        checkCrossword(currentArray, rightArray);
      }
      console.log(currentCount)
      console.log(rightCount)
    })
  })
}