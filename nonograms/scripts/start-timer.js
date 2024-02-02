export const startTimer = function(cellArray, timer, timerWrap) {
  cellArray.forEach ((item) => {
    item.addEventListener('mouseup', (e) => {
      console.log('click')
      if (e.button === 0 || e.button === 2) {
        timer.isStopped = false;
        if (timer.isStarted === false) {
          timer.updateTimer(timerWrap);
        }
      }
    })
  })
}