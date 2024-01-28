export const createHint = function(length, topHint, leftHint, horizontalLines, verticalLines) {
  for (let i = 0; i < length; i += 1) {
    if (length === 1) {
      console.log(true)
      let block = document.createElement('div');
      block.classList.add('block-hint-left');
      for (let j = 0; j < 5; j += 1) {
        let line = document.createElement('div');
        line.classList.add('line-horizontal');
        for (let n = 0; n < 3; n += 1) {
          let cell = document.createElement('div');
          cell.classList.add('cell-hint');
          cell.classList.add('big-cell')
          line.append(cell);
        }
        block.append(line);
      }
      leftHint.append(block);
      if (i === 0) {
        block = document.createElement('div');
        block.classList.add('block-hint-top');
        block.classList.add('angle');
        topHint.append(block);
      }
      block = document.createElement('div');
      block.classList.add('block-hint-top');
      for (let j = 0; j < 5; j += 1) {
        let line = document.createElement('div');
        line.classList.add('line-vertical');
        for (let n = 0; n < 3; n += 1) {
          let cell = document.createElement('div');
          cell.classList.add('cell-hint');
          cell.classList.add('big-cell');
          line.append(cell);
        }
        block.append(line);
      }
      topHint.append(block);
    } else {
      let block = document.createElement('div');
      block.classList.add('block-hint');
      if (length === 2) {
        block.classList.add('medium-block');
      } else if (length === 3) {
        block.classList.add('small-block');
      }
      for (let j = 0; j < 5; j += 1) {
        let line = document.createElement('div');
        line.classList.add('line-horizontal');
        for (let n = 0; n < 5; n += 1) {
          let cell = document.createElement('div');
          cell.classList.add('cell-hint');
          if (length === 2) {
            cell.classList.add('medium-cell');
          } else if (length === 3) {
            cell.classList.add('small-cell');
          }
          line.append(cell);
        }
        block.append(line);
      }
      leftHint.append(block);
      if (i === 0) {
        block = document.createElement('div');
        block.classList.add('block-hint');
        if (length === 2) {
          block.classList.add('medium-block');
        } else if (length === 3) {
          block.classList.add('small-block');
        }
        topHint.append(block);
      }
      block = document.createElement('div');
      block.classList.add('block-hint');
      if (length === 2) {
        block.classList.add('medium-block');
      } else if (length === 3) {
        block.classList.add('small-block');
      }
      for (let j = 0; j < 5; j += 1) {
        let line = document.createElement('div');
        line.classList.add('line-vertical');
        for (let n = 0; n < 5; n += 1) {
          let cell = document.createElement('div');
          cell.classList.add('cell-hint');
          if (length === 2) {
            cell.classList.add('medium-cell');
          } else if (length === 3) {
            cell.classList.add('small-cell');
          }
          line.append(cell);
        }
        block.append(line);
      }
      topHint.append(block);
    }
  }
  let horizontal = document.querySelectorAll('.line-horizontal');
  let vertical = document.querySelectorAll('.line-vertical');
  for (let i = 0; i < horizontal.length; i += 1) {
    let array = [];
    let count = 0;
    for (let j = horizontalLines[i].length - 1; j >= 0; j -= 1) {
      if (horizontalLines[i][j] === 1) {
        count += 1;
      } else if (horizontalLines[i][j] === 0 || j === 0) {
        array.push(count);
        count = 0;
      }
    }
    array = array.filter(item => item !== 0);
    console.log(horizontal[i])
    let cellArray = [...horizontal[i].childNodes].reverse();
    for (let n = cellArray.length - 1; n >= 0; n -= 1) {
      if (array[n]) {
        cellArray[n].textContent = array[n];
      }
    }
  }
  for (let i = 0; i < vertical.length; i += 1) {
    let array = [];
    let count = 0;
    for (let j = verticalLines[i].length - 1; j >= 0; j -= 1) {
      if (verticalLines[i][j] === 1) {
        count += 1;
      } else if (verticalLines[i][j] === 0 || j === 0) {
        array.push(count);
        count = 0;
      }
    }
    array = array.filter(item => item !== 0);
    console.log(vertical[i])
    let cellArray = [...vertical[i].childNodes].reverse();
    for (let n = cellArray.length - 1; n >= 0; n -= 1) {
      if (array[n]) {
        cellArray[n].textContent = array[n];
      }
    }
  }
}