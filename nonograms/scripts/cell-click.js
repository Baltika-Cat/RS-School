import { checkCrossword } from './check-crossword.js';

export const cellClick = function(array, crossword, resetButton, background, grid, chooseButton, sounds) {
  let leftClick = sounds.leftClick;
  let rightClick = sounds.rightClick;
  let winSound = sounds.winSound;
  let currentCount = array.filter(item => item.classList.contains('cell-full')).length;
  array.forEach ((cell) => {
    cell.addEventListener ('mouseup', (e) => {
      resetButton.addEventListener('click', () => {
        currentCount = 0;
      })
      let continueButton = document.querySelector('.continue-button');
      if (continueButton) {
        continueButton.addEventListener('click', () => {
          currentCount = array.filter(item => item.classList.contains('cell-full')).length;
        })
      }
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
        checkCrossword(currentArray, crossword, background, grid, chooseButton, winSound);
      }
    })
  })
}