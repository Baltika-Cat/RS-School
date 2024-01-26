export const cellClick = function (array, count) {
  array.forEach ((cell) => {
    cell.addEventListener ('mouseup', (e) => {
      console.log(array.indexOf(cell))
      if (e.button === 0) {
        cell.classList.remove('cell-cross');
        cell.classList.toggle('cell-full');
        if (count)
      }
      if (e.button === 2) {
        cell.classList.remove('cell-full');
        cell.classList.toggle('cell-cross');
      }
    })
  })
}