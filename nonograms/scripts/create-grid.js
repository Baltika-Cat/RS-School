export const createGrid = function (length, grid) {
  for (let i = 1; i <= (length) ** 2; i += 1) {
    let block = document.createElement('div');
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
      let cell = document.createElement('div');
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
    grid.append(block);
  }
}