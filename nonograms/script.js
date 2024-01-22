const body = document.body;

const main = document.createElement('div');
main.classList.add('main');
body.append(main);

let cellSize = 0;
let blockSize = 0;
let block;

const grid = document.createElement('div');
grid.classList.add('grid');
const gridSize = window.innerHeight * 0.8;
grid.style.width = `${gridSize}px`;
grid.style.height = `${gridSize}px`;
console.log(grid.style.width)
main.append(grid);

const createBlock = function (length) {
  block = document.createElement('div');
  block.classList.add('block');
  blockSize = (gridSize / length) - (10 * length);
  block.style.width = `${blockSize}px`;
  console.log(blockSize)
  //console.log(block.style.width)
  block.style.height = `${blockSize}px`;
  for (let i = 1; i <= 25; i += 1) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cellSize = blockSize / 5 - 2;
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
    block.append(cell);
  }
}

const createGrid = function (length) {
  for (let i = 1; i <= (length / 5) ** 2; i += 1) {
    createBlock(length / 5);
    grid.append(block);
  }
  console.log(grid.style.width)
}

createGrid (15);