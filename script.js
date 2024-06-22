document.addEventListener("DOMContentLoaded", () => {
    const timerElement = document.getElementById("timer");
    const playButton = document.getElementById("play");
    const resetButton = document.getElementById("reset");
    const conic = document.getElementById("conic");
    const alertSound = document.getElementById("alert-sound");
    let totalSeconds = 0;
    let timerInterval;
    let isRunning = false;
  
    const updateTimerDisplay = () => {
      const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
      const seconds = String(totalSeconds % 60).padStart(2, "0");
      timerElement.textContent = `${minutes}:${seconds}`;
    };
  
    const updateHandRotation = () => {
      const degrees = (totalSeconds % 60) * 6; // 360 degrees / 60 seconds
      document.documentElement.style.setProperty('--degrees', `${degrees}deg`);
    };
  
    const updateConicGradient = () => {
      const degrees = (totalSeconds % 60) * 6; // 360 degrees / 60 seconds
      conic.style.setProperty('--degrees', `${degrees}deg`);
    };
  
    const playAlertSound = () => {
      alertSound.play();
    };
  
    const startTimer = () => {
      if (!isRunning) {
        isRunning = true;
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
        timerInterval = setInterval(() => {
          totalSeconds++;
          updateTimerDisplay();
          updateHandRotation();
          updateConicGradient();
          if (totalSeconds % 60 === 0) {
            playAlertSound();
          }
        }, 1000);
      } else {
        stopTimer();
      }
    };
  
    const stopTimer = () => {
      isRunning = false;
      playButton.innerHTML = '<i class="fas fa-play"></i>';
      clearInterval(timerInterval);
    };
  
    const resetTimer = () => {
      stopTimer();
      totalSeconds = 0;
      updateTimerDisplay();
      updateHandRotation();
      updateConicGradient();
    };
  
    playButton.addEventListener("click", startTimer);
    resetButton.addEventListener("click", resetTimer);
  
    updateTimerDisplay();
    updateHandRotation();
    updateConicGradient();
  });
  