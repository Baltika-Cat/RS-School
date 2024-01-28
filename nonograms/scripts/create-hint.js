export const createHint = function(length, topHint, leftHint) {
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

  
}