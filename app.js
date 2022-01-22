const timeLeft = document.querySelector(".display__time-left");
const start = document.querySelector(".btn-start");
const stop = document.querySelector(".btn-stop");

let countdown;
let seconds = 60;
let audio = new Audio("handbell sound.mp3")

stop.disabled = true;

// function
const displayTimeLeft = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  let remainderSeconds = seconds % 60;
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (remainderSeconds < 10) {
    remainderSeconds = "0" + remainderSeconds;
  }
  const display = `${minutes}:${remainderSeconds}`;
  return display;
};

// function timer
const timer = (seconds) => {
  clearInterval(countdown);
  const now = Date.now();
  const then = Date.now() + seconds * 1000;
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // 倒數到 0 時停止倒數
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    // 倒豎至 0 播放音檔
    if (secondsLeft === 0) {
      audio.play()
    }
    // 將時間渲染至畫面
    timeLeft.textContent = displayTimeLeft(secondsLeft);
  }, 1000);
};
//
const startTimer = () => {
  const seconds = 60;
  timer(seconds);
  stop.disabled = false;
  // stop: hover.style =
  //   "ransition: all 0.2 cursor: pointer background-color: #fff transform: scale(1.1);";
};

// Event listener
start.addEventListener("click", startTimer);

stop.addEventListener("click", (e) => {
  if (stop.disabled === false) {
    stop.disabled = true;
    clearInterval(countdown);
    timeLeft.textContent = displayTimeLeft(60);
  }
});
