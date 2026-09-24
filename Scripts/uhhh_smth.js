const REFRESH_TIME_SECONDS = 300;

export function countdown() {
    const countdownElement = document.getElementById("countdown");

    if (!countdownElement) {
        console.error("The #countdown element was not found.");
        return;
    }

    let timeLeft = REFRESH_TIME_SECONDS;

    const updateCountdown = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        countdownElement.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    updateCountdown();

    const timer = setInterval(() => {
        timeLeft -= 1;
        updateCountdown();

        if (timeLeft <= 0) {
            clearInterval(timer);
            window.location.reload();
        }
    }, 1000);
}
