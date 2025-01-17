// แปลง string => number paseInt()
// let num = +("100.25");
//  Dom คือ document object model เข้าถึง element ผ่าน id, class, tag ใช้ คู่กับ id
// การเข้าถึง element ผ่าน id ใช้ document.getElementById("id"), ผ่าน class ใช้ document.getElementsByClassName("class"), ผ่าน tag ใช้ document.getElementsByTagName("tag")
// เปลี่ยนค่าใน ้html,text ใช้ element.innerHTML,element.innertext = "value"
// ผ่าน event ใช้ element.addEventListener("event",function(){})
// การเข้าถึง input ใช้ document.querySelector("input")
// ผ่าน method setAttribute("attribute","value")
// console.log(timeLeft); output ทาง console




const words = ["population", "javascript", "challenge", "typing", "programming", "function", "variable", "score", "object","school","what","do","have","can","read"];
let score = 0;
let timeLeft = 60;
let timer;
let errorCount = 0; // เพิ่มตัวแปรเพื่อเก็บจำนวนครั้งที่พิมพ์ผิด
let typedIndex = 0; 
let currentWord = "";

// เอาไว้ใช้เปลี่ยนแปลงหน้า html
const wordDisplay = document.getElementById("word");
const startButton = document.getElementById("start");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const reloadButton = document.getElementById("reload");

// ฟังก์ชันเริ่มเกม
function startGame() {
    score = 0;
    timeLeft = 60;
    typedIndex = 0;
    errorCount = 0;
    nextWord();
    startTimer();
    startButton.style.display = "none";
    document.addEventListener("keydown", handleTyping);
}

function startTimer() {
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--; 
      timerDisplay.innerHTML = `time <br> ${timeLeft}`; 
    } else {
      clearInterval(timer); // หยุดตัวจับเวลาเมื่อถึง 0
      timerDisplay.innerHTML = `time <br> 0`; 
      alert(`Your score is ${score}`);
      reloadButton.style.display = "block";
    }
  }, 1000);
}


function reload(){
  // รีหน้า web
  window.location.reload();
  
}



function updateScore(){
  scoreDisplay.innerHTML = `score<br>${score}`;
}

function nextWord() {
  // จะให้ currentword ที่เป็นคำที่สุ่มมาจาก array words
  currentWord = words[Math.floor(Math.random() * words.length)];
  typedIndex = 0;
  renderWord();
}

// พิมพ์ตามคำ กับคำที่โชว์
function renderWord() {
  let renderedHTML = "";
  for (let i = 0; i < currentWord.length; i++) {
    if (i < typedIndex) {
      renderedHTML += `<span class="correct">${currentWord[i]}</span>`;
    } else {
      // เพิ่ม HTML ปกติสำหรับตัวอักษรที่ยังไม่ได้พิมพ์
      renderedHTML += `<span>${currentWord[i]}</span>`;
    }
  }
  wordDisplay.innerHTML = renderedHTML;
}


function handleTyping(event) {
  if (event.key === currentWord[typedIndex]) {
    typedIndex++; // คือตัวอักษรปัจจุบัน
    if (typedIndex === currentWord.length) {
      score++; 
      updateScore(); 
      nextWord(); 
    } else { //ถ้าเกิดยังพิมพ์ไม่ครบ
      renderWord(); 
    }
  } else {
    errorCount++; 
    // classList  ที่ใช้เพิ่ม ลบ class ของ element
    wordDisplay.classList.add("incorrect");
    // setTimeout ใช้เพื่อถ้าเกิดเราพิมพ์ผิด มันจะไปลบ class สีแดงออก ใส่เวลาตามหลัง
    setTimeout(() => wordDisplay.classList.remove("incorrect"), 200);

    // ถ้าพิมพ์ผิดเกิน 2 ตัวอักษร
    if (errorCount >= 2) {
      score = Math.max(score - 1, 0); 
      updateScore(); 
      nextWord(); 
      errorCount = 0; 
    }
  }
}
startButton.addEventListener("click", startGame);
reloadButton.addEventListener("click", reload);


