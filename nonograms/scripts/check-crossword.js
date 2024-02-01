import { timer } from './timer.js';

export const checkCrossword = function (currentArray, rightArray, background, grid, chooseButton) {
  console.log(false)
  //console.log(rightArray)
  if (currentArray.join('') === rightArray.join('')) {
    console.log('WIN!!!!!!!!!!!!!!!!!')
    background.classList.add('background-win');
    background.classList.remove('invisible');
    let title = document.createElement('div');
    title.textContent = 'Great! You have solved the nonogram!';
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
  }
}