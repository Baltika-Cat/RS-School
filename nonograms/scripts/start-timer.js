export const startTimer = function(cellArray, timer, timerWrap) {
  cellArray.forEach ((item) => {
    item.addEventListener('mouseup', (e) => {
      if (e.button === 0 || e.button === 2) {
        if (timer.isStarted === false) {
          timer.updateTimer(timerWrap);
        }
      }
    })
  })
}