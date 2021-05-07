let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const startMessageDisplay = document.querySelector('.display__start-message');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const endAlert = new Audio('chime.mp3');
const volumeOn = document.querySelector('.fa-volume-up');
const volumeMute = document.querySelector('.fa-volume-mute');

const style = getComputedStyle(volumeOn, null).display;
// console.log(currentStyle);
if (style == 'none') {
  console.log('true');
  endAlert.muted = true;
  // console.log(endAlert.muted);
}

function timer(seconds) {
  // Hide start message
  startMessageDisplay.style.display = 'none';
  // Clear any existing timer
  clearInterval(countdown);
  const initialTime = Date.now();
  // Seconds is multiplied by 1000 first (to convert to milliseconds)
  const stopTime = initialTime + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(stopTime);

  countdown = setInterval(() => {
    // Taking initial time with 60 seconds added. When timer begins and this runs every second, Date.now() will increase, meaning difference between stopTime and new current time will decrease, and each second, updated difference is displayed until seconds remaining is 0
    const secondsLeft = Math.round((stopTime - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      endAlert.play();
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

// Show end time (if it's 2:30 and you have a five-minute break, it should say be back at 2:35)
function displayEndTime(endTimestamp) {
  // Turn it into date
  const end = new Date(endTimestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Ends at ${adjustedHour}:${
    minutes < 10 ? '0' : ''
  }${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener('click', startTimer));
// customForm is value for name attribute of custom timer form
document.customForm.addEventListener('submit', function (e) {
  // Prevent page reload and sending data over a GET request
  e.preventDefault();
  // You can chain name attribute value properties: customForm.minutes to grab input with name of minutes inside form with name of customForm
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});

function mute() {
  volumeMute.style.display = 'none';
  volumeOn.style.display = 'inline';
  endAlert.muted = !endAlert.muted;
  console.log(endAlert.muted);
}

function soundOn() {
  volumeOn.style.display = 'none';
  volumeMute.style.display = 'inline';
  endAlert.muted = !endAlert.muted;
}

volumeMute.addEventListener('click', mute);

volumeOn.addEventListener('click', soundOn);
