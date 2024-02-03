import { checkCrossword } from './check-crossword.js';

export const cellClick = function (array, crossword, resetButton, background, grid, chooseButton) {
  let soundButton = document.querySelector('.sound-wrap');
  let leftClick = new Audio();
  leftClick.src = 'assets/sounds/click-sound.mp3';
  let rightClick = new Audio();
  rightClick.src = 'assets/sounds/click-cross-sound.mp3';
  let sound = document.querySelector('.sound');
  let mute = document.querySelector('.mute');
  soundButton.addEventListener('click', () => {
    sound.classList.toggle('invisible');
    mute.classList.toggle('invisible');
    if (sound.classList.contains('invisible')) {
      leftClick.muted = true;
      rightClick.muted = true;
    } else {
      leftClick.muted = false;
      rightClick.muted = false;
    }
  })
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
        checkCrossword(currentArray, crossword, background, grid, chooseButton);
      }
      /*console.log(currentCount)
      console.log(crossword.countCheck)
      console.log(crossword)*/
    })
  })
}