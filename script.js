let startTime = 0;
let elapsedTime = 0;
let timer = null;
let running = false;
let lapNumber = 0;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function formatTime(time) {
  const ms = Math.floor((time % 1000) / 10);
  const sec = Math.floor((time / 1000) % 60);
  const min = Math.floor((time / (1000 * 60)) % 60);

  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}:${String(ms).padStart(2, "0")}`;
}

function update() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

document.getElementById("startBtn").onclick = () => {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(update, 10);
    running = true;
  }
};

document.getElementById("pauseBtn").onclick = () => {
  if (running) {
    clearInterval(timer);
    running = false;
  }
};

document.getElementById("resetBtn").onclick = () => {
  clearInterval(timer);
  running = false;
  elapsedTime = 0;
  lapNumber = 0;
  display.textContent = "00:00:00";
  laps.innerHTML = "";
};

document.getElementById("lapBtn").onclick = () => {
  if (running) {
    lapNumber++;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapNumber} — ${formatTime(elapsedTime)}`;
    laps.prepend(li);
  }
};
