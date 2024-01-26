const createMatrix = 
for (let i = 1; i <= blockArray.length ** 0.5; i += 1) {
  for (let n = 1; n <= blockArray.length ** 0.5; n += 1) {
    countArray += 1; 
    for (let j = 0; j < 25; j += 1) {
      let indexCell = j + (25 * (countArray + 1)) - 25;
      let indexArray = Math.ceil((indexCell + 1 - (25 * (countArray - n + 1))) / 5) - 1;
      console.log(indexCell)
      console.log(indexArray)
      horizontalArray[indexArray].push(indexCell);
    }
    console.log(horizontalArray);
  }
}

for (let i = 0; i < horizontalArray.length; i += 1) {
  for (let j = 0; j < horizontalArray.length; j += 1) {

  }
}

console.log(horizontalArray)