import { checkCrossword } from './check-crossword.js';

export const cellClick = function (array, crossword, resetButton, background, grid, chooseButton) {
  let leftClick = new Audio();
  leftClick.src = 'assets/sounds/click-sound.mp3';
  let rightClick = new Audio();
  rightClick.src = 'assets/sounds/click-cross-sound.mp3';
  let currentCount = 0;
  array.forEach ((cell) => {
    cell.addEventListener ('mouseup', (e) => {
      resetButton.addEventListener('click', () => {
        currentCount = 0;
      })
      // console.log(array.indexOf(cell))
      let mark = false;
      if (e.button === 0) {
        leftClick.play();
        cell.classList.remove('cell-cross');
        cell.classList.toggle('cell-full');
        if (cell.classList.contains('cell-full')) {
          currentCount += 1;
        } else {
          currentCount -= 1;
        }
      }
      if (e.button === 2) {
        rightClick.play();
        if (cell.classList.contains('cell-full')) {
          mark = true;
        }
        cell.classList.remove('cell-full');
        cell.classList.toggle('cell-cross');
        if (mark) {
          currentCount -= 1;
        }
      }
      if (currentCount === crossword.countCheck) {
        let currentArray = [];
        array.forEach((cell) => {
          if (cell.classList.contains('cell-full')) {
            currentArray.push(1);
          } else {
            currentArray.push(0);
          }
        })
        checkCrossword(currentArray, crossword.fullCellArray, background, grid, chooseButton);
      }
      /*console.log(currentCount)
      console.log(crossword.countCheck)
      console.log(crossword)*/
    })
  })
}