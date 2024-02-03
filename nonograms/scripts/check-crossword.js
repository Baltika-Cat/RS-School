import { timer } from './timer.js';

let latestArray;

if (localStorage.getItem('latestScores')) {
  latestArray = JSON.parse(localStorage.getItem('latestScores'));
} else {
  latestArray = [];
}
let bestArray = [];

export const checkCrossword = function (currentArray, crossword, background, grid, chooseButton) {
  let sound = document.querySelector('.sound');
  let rightArray = crossword.fullCellArray;
  let winSound = new Audio();
  winSound.src = 'assets/sounds/win-sound.mp3';
  if (sound.classList.contains('invisible')) {
    winSound.muted = true;
  } else {
    winSound.muted = false;
  }
  //console.log(rightArray)
  if (currentArray.join('') === rightArray.join('')) {
    setTimeout(() => {
      winSound.play();
      timer.isStopped = true;
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
    }, 1)
    let score = {
      seconds: (timer.minutes * 60) + timer.seconds,
      name: crossword.name,
      size: `${crossword.size * 5}x${crossword.size * 5}`,
      time: `${timer.minutes.toString().padStart(2, '0')}:${timer.seconds.toString().padStart(2, '0')}`
    }
    if (latestArray.length < 5) {
      latestArray.push(score);
    } else {
      for (let i = 0; i < latestArray.length - 1; i += 1) {
        latestArray.splice(i, 1, latestArray[i + 1]);
      }
      latestArray.splice(4, 1, score);
    }
    localStorage.setItem('latestScores', JSON.stringify(latestArray));
    bestArray = Array.from(latestArray);
    localStorage.setItem('bestScores', JSON.stringify(bestArray.sort((a, b) => a.seconds - b.seconds)));
    console.log(JSON.parse(localStorage.getItem('bestScores')));
    console.log(JSON.parse(localStorage.getItem('latestScores')))
  }
}