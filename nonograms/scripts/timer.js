export const timer = {
  minutes: 0,
  seconds: 0,
  isPaused: false,
  isStarted: false,
  interval: '',
  updateTimer(timerBlock) {
    console.log(true)
   // if (this.isStarted === false) {
      this.isStarted = true;
      this.interval = setInterval(() => {
        if (this.isPaused === false) {
          this.seconds += 1;
          if (this.seconds === 60) {
            this.minutes += 1;
            this.seconds = 0;
          }
          timerBlock.textContent = 
            `${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
        }
      }, 1000)
   // }
  }
}