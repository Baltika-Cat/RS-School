import { timer } from './timer.js';

export const checkCrossword = function (currentArray, rightArray, background, grid, chooseButton) {
  let winSound = new Audio();
  winSound.src = 'assets/sounds/win-sound.mp3';
  //console.log(rightArray)
  if (currentArray.join('') === rightArray.join('')) {
    setTimeout(() => {
      winSound.play();
      timer.isStopped = true;
      console.log(timer.isStopped)
      // console.log('WIN!!!!!!!!!!!!!!!!!')
      background.classList.add('background-win');
      background.classList.remove('invisible');
      let title = document.createElement('div');
      let minute = timer.minutes > 1 ? 'minutes' : 'minute';
      let second = timer.seconds > 1 ? 'seconds' : 'second';
      let winText = 'Great! You have solved the nonogram in '
      if (timer.minutes === 0) {
        title.textContent = `${winText} ${timer.seconds} ${second}!`;
      } else if (timer.seconds === 0) {
        title.textContent = `${winText} ${timer.minutes} ${minute}!`;
      } else {
        title.textContent = `${winText} ${timer.minutes} ${minute} and ${timer.seconds} ${second}!`;
      }
      title.classList.add('title-win');
      background.append(title);
      let gridWin = grid.cloneNode(true);
      gridWin.classList.add('grid-win');
      let array = gridWin.querySelectorAll('.cell');
      array.forEach ((item) => {
        if (item.classList.contains('cell-cross')) {
          item.classList.remove('cell-cross');
        }
      })
      background.append(gridWin);
      let cover = document.createElement('div');
      cover.classList.add('cover');
      gridWin.append(cover);
      chooseButton.classList.add('button-win');
      background.append(chooseButton);
      chooseButton.addEventListener('click', () => {
        chooseButton.classList.add('invisible');
      })
    }, 50)
  }
}