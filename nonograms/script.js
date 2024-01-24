window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
}, false);

const body = document.body;

const main = document.createElement('div');
main.classList.add('main');
body.append(main);

let block;
let cell;
let lengthForBlock = 0;

const grid = document.createElement('div');
grid.classList.add('grid');
main.append(grid);

const createBlock = function (length) {
  lengthForBlock = length;
  console.log(grid.style.width)
  block = document.createElement('div');
  block.classList.add('block');
  switch (length) {
    case 1:
      block.classList.add('big-block');
      break;
    case 2:
      block.classList.add('medium-block');
      break;
    case 3:
      block.classList.add('small-block');
      break;
  }
  for (let i = 1; i <= 25; i += 1) {
    cell = document.createElement('div');
    cell.classList.add('cell');
    switch (length) {
      case 1:
      cell.classList.add('big-cell');
      break;
    case 2:
      cell.classList.add('medium-cell');
      break;
    case 3:
      cell.classList.add('small-cell');
      break;
    }
    block.append(cell);
  }
}

const createGrid = function (length) {
  for (let i = 1; i <= (length / 5) ** 2; i += 1) {
    createBlock(length / 5);
    grid.append(block);
  }
}

createGrid (5);

const cellArray = document.querySelectorAll('.cell');
cellArray.forEach ((cell) => {
  cell.addEventListener ('mouseup', (e) => {
    if (e.button === 0) {
      cell.classList.remove('cell-cross');
      cell.classList.toggle('cell-full');
    }
    if (e.button === 2) {
      cell.classList.remove('cell-full');
      cell.classList.toggle('cell-cross');
    }
  })
})