const words = ["population", "javascript", "challenge", "typing", "programming", "function", "variable", "score", "object"];
let currentWord = "";
let score = 0;
let timeLeft = 60;
let timer;
let errors = 0;

const wordDisplay = document.getElementById("word");
const inputField = document.getElementById("input");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");

// Function to start the game
function startGame() {
  score = 0;
  timeLeft = 10;
  errors = 0;
  inputField.value = "";
  inputField.disabled = false; // Enable input field
  inputField.focus(); // Focus input field for immediate typing
  updateScore();
  startTimer();
  nextWord();
}

// Function to pick the next word
function nextWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
  wordDisplay.textContent = currentWord;
}

// Function to update the score
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

// Function to handle timer
function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

// Function to end the game
function endGame() {
  inputField.disabled = true; // Disable input field
  wordDisplay.textContent = "Game Over!";
  alert(`Time's up! Your final score is: ${score}`);
}

// Event listener for typing input
inputField.addEventListener("input", () => {
  const typedWord = inputField.value;
  if (typedWord === currentWord) {
    score++;
    updateScore();
    inputField.value = "";
    nextWord();
    errors = 0; // Reset errors
  } else {
    // Check for errors
    let errorCount = 0;
    for (let i = 0; i < typedWord.length; i++) {
      if (typedWord[i] !== currentWord[i]) errorCount++;
    }
    if (errorCount > 2) {
      score = Math.max(0, score - 1); // Deduct score but prevent negative
      updateScore();
      inputField.value = "";
      nextWord();
      errors = 0;
    }
  }
});

// Event listener for start button
startButton.addEventListener("click", startGame);
