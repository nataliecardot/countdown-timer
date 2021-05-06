let countdown;
const timerDisplay = document.querySelector('.display__time-left');

function timer(seconds) {
  const initialTime = Date.now();
  // Seconds is multiplied by 1000 first (to convert to milliseconds)
  const stopTime = initialTime + seconds * 1000;
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    // Taking initial time with 60 seconds added. When timer begins and this runs every second, Date.now() will increase, meaning difference between stopTime and new current time will decrease, and each second, updated difference is displayed until seconds remaining is 0
    const secondsLeft = Math.round((stopTime - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}
