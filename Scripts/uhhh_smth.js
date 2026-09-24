let timeLeft = 300;

const countdown = document.getElementById("countdown");

const timer = setInterval(() => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  countdown.textContent =
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0");

  timeLeft--;

  if (timeLeft < 0) {
    clearInterval(timer);
    location.reload();
  }
}, 1000);
