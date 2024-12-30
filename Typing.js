// แปลง string => number paseInt()
// let num = +("100.25");
//  Dom คือ document object model เข้าถึง element ผ่าน id, class, tag ใช้ คู่กับ id
// การเข้าถึง element ผ่าน id ใช้ document.getElementById("id"), ผ่าน class ใช้ document.getElementsByClassName("class"), ผ่าน tag ใช้ document.getElementsByTagName("tag")
// เปลี่ยนค่าใน ้html,text ใช้ element.innerHTML,element.innertext = "value"
// ผ่าน event ใช้ element.addEventListener("event",function(){})
// การเข้าถึง input ใช้ document.querySelector("input")
// ผ่าน method setAttribute("attribute","value")
// console.log(timeLeft); output ทาง console
const words = ["population", "javascript", "challenge", "typing", "programming", "function", "variable", "score", "object"];
let score = 0;
let timeLeft = 60;
let timer;
let errors = 0;
let typedIndex = 0; // Index of the current letter being typed

const wordDisplay = document.getElementById("word");
const startButton = document.getElementById("start");
const inputField = document.getElementById("input");

// ฟังก์ชันเริ่มเกม
function startGame() {
    score = 0;
    timeLeft = 10;
    errors = 0;
    inputField.value = "";
    typedIndex = 0;
    inputField.disabled = false;
    inputField.focus();
    nextWord();
}

// Function to replace the word in the div
function nextWord() {
    // Get a random word from the array
    const randomWord = words[Math.floor(Math.random() * words.length)];
    // เอา array มายัด
    currentWord = randomWord;
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
function handleTyping(e){
    // ยัดค่าที่พิมพ์เข้าไป
    const typedValue = e.target.value;
    // ถ้าตัวที่พิมพ์เข้าไปเท่ากับใน array ที่สุ่มมา
    if(typedValue == currentWord){
        score++;
        inputField.value = "";
        nextWord();
    }else{
        typedIndex = typedValue.length;
        renderWord();
    }
}

startButton.addEventListener("click", startGame);
inputField.addEventListener("input",handleTyping );


