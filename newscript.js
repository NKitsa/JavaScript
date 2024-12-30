const words = ["population", "javascript", "challenge", "typing", "programming", "function", "variable", "score", "object"];
let currentWord = "";
let score = 0;
let timeLeft = 10;
let timer;
let typedIndex = 0; // Index of the current letter being typed

const wordDisplay = document.getElementById("word");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");

// Function to start the game
function startGame() {
  score = 0;
  timeLeft = 60;
  typedIndex = 0;
  updateScore();
  startTimer();
  nextWord();
  document.addEventListener("keydown", handleTyping);
}

// Function to pick the next word
function nextWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
  typedIndex = 0;
  renderWord();
}

// Function to render the word with correct/incorrect highlights
function renderWord() {
  let renderedHTML = "";
  for (let i = 0; i < currentWord.length; i++) {
    if (i < typedIndex) {
      renderedHTML += `<span class="correct">${currentWord[i]}</span>`;
    } else {
      renderedHTML += `<span>${currentWord[i]}</span>`;
    }
  }
  wordDisplay.innerHTML = renderedHTML;
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
  document.removeEventListener("keydown", handleTyping);
  wordDisplay.textContent = "Game Over!";
  alert(`Time's up! Your final score is: ${score}`);
}

// Function to handle typing
function handleTyping(event) {
  const typedChar = event.key;
  if (typedChar === currentWord[typedIndex]) {
    typedIndex++;
    if (typedIndex === currentWord.length) {
      score++;
      updateScore();
      nextWord();
    } else {
      renderWord();
    }
  } else {
    // Optional: Show incorrect feedback (e.g., flash red color)
    wordDisplay.classList.add("incorrect");
    setTimeout(() => wordDisplay.classList.remove("incorrect"), 200);
  }
}

// Event listener for start button
startButton.addEventListener("click", startGame);
