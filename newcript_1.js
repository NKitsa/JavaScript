const words = ["population", "javascript", "challenge", "typing", "programming", "function", "variable", "score", "object"];
let score = 0;
let timeLeft = 60;
let timer;
let errors = 0;
let typedIndex = 0; // Index of the current letter being typed
let currentWord = "";

const wordDisplay = document.getElementById("word");
const startButton = document.getElementById("start");

// ฟังก์ชันเริ่มเกม
function startGame() {
    score = 0;
    timeLeft = 10;
    errors = 0;
    typedIndex = 0;
    
    nextWord();
    document.addEventListener("keydown", handleTyping);
}

// Function to replace the word in the div
function nextWord() {
    // Get a random word from the array
    currentWord = words[Math.floor(Math.random() * words.length)];
    typedIndex = 0;
    renderWord();
}

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

function handleTyping(event) {
    if (event.key === currentWord[typedIndex]) {
        typedIndex++;
        if (typedIndex === currentWord.length) {
            score++;
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

startButton.addEventListener("click", startGame);