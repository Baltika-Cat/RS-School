export const cellClick = function (array) {
  array.forEach ((cell) => {
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
}