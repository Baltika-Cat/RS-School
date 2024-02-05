export const createCrossword = function (length, blockArray, cellArray, count) {
  let horizontalArray = [];
  let verticalArray = [];
  let countArray = count;
  let checkCount = 0;
  let checkCellArray = [];

  for (let i = 0; i < cellArray.length ** 0.5; i += 1) {
  let arr = [];
  horizontalArray.push(arr);
  }
  for (let i = 0; i < cellArray.length ** 0.5; i += 1) {
    let arr = [];
    verticalArray.push(arr);
  }

  for (let i = 1; i <= blockArray.length ** 0.5; i += 1) {
    for (let n = 1; n <= blockArray.length ** 0.5; n += 1) {
      countArray += 1; 
      for (let j = 0; j < 25; j += 1) {
        let indexCell = j + (25 * (countArray + 1)) - 25;
        let indexArray = Math.ceil((indexCell + 1 - (25 * (countArray - i + 1))) / 5) - 1;
        //horizontalArray[indexArray].push(indexCell);
        if (cellArray[indexCell].classList.contains('cell-full')) {
          horizontalArray[indexArray].push(1);
          checkCount += 1;
          checkCellArray.push(1);
        } else {
          horizontalArray[indexArray].push(0);
          checkCellArray.push(0);
        }
      }
    }
  }
  
  for (let i = 0; i < horizontalArray.length; i += 1) {
    for (let j = 0; j < horizontalArray.length; j += 1) {
      verticalArray[i].push(horizontalArray[j][i]);
    }
  }

  let crossword = {
    size: length,
    horizontalLines: horizontalArray,
    verticalLines: verticalArray,
    fullCellArray: checkCellArray,
    countCheck: checkCount
  }

  return crossword;
}