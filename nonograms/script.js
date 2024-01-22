const body = document.body;

const main = document.createElement('div');
main.classList.add('main');
body.append(main);

let cell = document.createElement('div');
cell.classList.add('cell');
let cellSize = cell.offsetWidth;
console.log(cellSize)
let block;

const grid = document.createElement('div');
grid.classList.add('grid');
main.append(grid);

const createBlock = function () {
  block = document.createElement('div');
  block.classList.add('block');
  for (let i = 1; i <= 25; i += 1) {
    cell = document.createElement('div');
    cell.classList.add('cell');
    block.append(cell);
  }
  block.style.width = `${(cell.clientWidth + 2) * 5}px`;
  block.style.height = `${(cell.clientHeight + 2) * 5}px`;
}

const createGrid = function (length) {
  for (let i = 1; i <= (length / 5) ** 2; i += 1) {
    createBlock();
    grid.append(block);
  }
  grid.style.width = `${(block.style.width + 10) * (length / 5)}px`;
  grid.style.height = `${(block.style.height + 10) * (length / 5)}px`;
  console.log(grid.style.width)
}

createGrid (15);