export const showAnswer = function(fullCellArray, cellArray) {
  cellArray.map((item, index) => {
    if (fullCellArray[index] === 1) {
      item.classList.add('cell-full');
    } else {
      item.classList.remove('cell-full');
      item.classList.remove('cell-cross')
    }
  })
}