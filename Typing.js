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
let errorCount = 0; // เพิ่มตัวแปรเพื่อเก็บจำนวนครั้งที่พิมพ์ผิด
let typedIndex = 0; // Index of the current letter being typed
let currentWord = "";

const wordDisplay = document.getElementById("word");
const startButton = document.getElementById("start");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const reloadButton = document.getElementById("reload");

// ฟังก์ชันเริ่มเกม
function startGame() {
    score = 0;
    timeLeft = 20;
    typedIndex = 0;
    errorCount = 0;
    errors = 0;
    nextWord();
    startTimer();
    startButton.style.display = "none";
    document.addEventListener("keydown", handleTyping);
}

function startTimer() {
  timer = setInterval(() => {
    timerDisplay.innerHTML = `time <br> ${Math.max(--timeLeft,0)}`;
    if (timeLeft <= 0) {
      alert( `Your score is ${score}`);
      clearInterval(timer);
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
// Function to replace the word in the div
function nextWord() {
  // จะให้ currentword ที่เป็นคำที่สุ่มมาจาก array words
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
  // === คือเครื่องหมายเปรียบเทียบเท่ากัน โดยเปรียบเทียบทั้งค่าและชนิดของข้อมูล
  // ตรวจสอบว่าตัวอักษรที่พิมพ์ตรงกับตัวอักษรในตำแหน่งปัจจุบันของ currentWord ไหม
  if (event.key === currentWord[typedIndex]) {
    typedIndex++; // เพิ่มค่า typedIndex เพื่อเลื่อนไปยังตัวอักษรถัดไป
    // ถ้าพิมพ์ครบทุกตัวอักษรใน currentWord
    if (typedIndex === currentWord.length) {
      score++; // เพิ่มคะแนน
      updateScore(); // อัพเดตการแสดงผลของคะแนน
      nextWord(); // สุ่มคำใหม่
    } else {
      renderWord(); // อัพเดตการแสดงผลของคำ
    }
  } else {
    errorCount++; // เพิ่มจำนวนครั้งที่พิมพ์ผิด
    // classList เป็น property ที่ใช้เพิ่ม ลบ และเปลี่ยนแปลง class ของ element
    // ถ้าพิมพ์ผิด ให้แสดงสีแดง
    wordDisplay.classList.add("incorrect");
    // setTimeout ใช้เพื่อถ้าเกิดเราพิมพ์ผิด มันจะไปลบ class สีแดงออก ใส่เวลาตามหลัง
    setTimeout(() => wordDisplay.classList.remove("incorrect"), 200);

    // ถ้าพิมพ์ผิดเกิน 2 ตัวอักษร
    if (errorCount >= 2) {
      score = Math.max(score - 1, 0); // ลดคะแนนลง แต่ไม่มีติดลบ
      updateScore(); // อัพเดตการแสดงผลของคะแนน
      nextWord(); // สุ่มคำใหม่
      errorCount = 0; // รีเซ็ตจำนวนครั้งที่พิมพ์ผิด
    }
  }
}
startButton.addEventListener("click", startGame);
reloadButton.addEventListener("click", reload);


