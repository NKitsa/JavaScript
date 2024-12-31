const words = ["population", "javascript", "challenge", "typing", "programming", "function", "variable", "score", "object"];
let currentWord = "", score = 0, timeLeft = 10, timer, typedIndex = 0;

const wordDisplay = document.getElementById("word");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");

function startGame() {
  score = 0; timeLeft = 60; typedIndex = 0;
  updateScore(); startTimer(); nextWord();
  document.addEventListener("keydown", handleTyping);
}

function nextWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  typedIndex = 0; renderWord();
}

function renderWord() {
  wordDisplay.innerHTML = currentWord.split('').map((char, i) =>
    `<span class="${i < typedIndex ? 'correct' : ''}">${char}</span>`).join('');
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function startTimer() {
  timer = setInterval(() => {
    timerDisplay.innerHTML = `Time Left: ${--timeLeft}`;
    if (timeLeft <= 0) clearInterval(timer);
  }, 1000);
}

function endGame() {
  document.removeEventListener("keydown", handleTyping);
  wordDisplay.textContent = "Game Over!";
  alert(`Time's up! Your final score is: ${score}`);
}

function handleTyping(event) {
  if (event.key === currentWord[typedIndex]) {
    typedIndex++;
    if (typedIndex === currentWord.length) score++, updateScore(), nextWord();
    else renderWord();
  } else {
    wordDisplay.classList.add("incorrect");
    setTimeout(() => wordDisplay.classList.remove("incorrect"), 200);
  }
}

startButton.addEventListener("click", startGame);
