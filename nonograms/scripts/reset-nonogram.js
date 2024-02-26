export const resetNonogram = function(cellArray) {
    cellArray.forEach ((cell) => {
      cell.classList.remove('cell-full');
      cell.classList.remove('cell-cross');
    })
  }