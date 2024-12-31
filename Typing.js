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
let currentWord = "";

const wordDisplay = document.getElementById("word");
const startButton = document.getElementById("start");
const scoreDisplay = document.getElementById("score");

// ฟังก์ชันเริ่มเกม
function startGame() {
    score = 0;
    timeLeft = 10;
    typedIndex = 0;
    nextWord();
    document.addEventListener("keydown", handleTyping);
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
  let renderedHTML = ""; // ประกาศตัวแปรเพื่อเก็บ HTML ที่จะถูกสร้างขึ้น
  // วนลูปผ่านตัวอักษรใน currentWord
  for (let i = 0; i < currentWord.length; i++) {
      // ถ้าตัวอักษรในตำแหน่งปัจจุบันถูกพิมพ์ถูกต้อง (i < typedIndex)
      if (i < typedIndex) {
          // เพิ่มตัวอักษรที่ถูกพิมพ์ถูกต้องลงใน renderedHTML โดยห่อด้วย <span class="correct">
          renderedHTML += `<span class="correct">${currentWord[i]}</span>`;
      } else {
          // เพิ่มตัวอักษรที่ยังไม่ได้พิมพ์ลงใน renderedHTML โดยห่อด้วย <span>
          renderedHTML += `<span>${currentWord[i]}</span>`;
      }
  }
  // อัพเดตเนื้อหาของ wordDisplay ด้วย HTML ที่สร้างขึ้น
  wordDisplay.innerHTML = renderedHTML;
}
// Function to handle typing
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
      // classList เป็น property ที่ใช้เพิ่ม ลบ และเปลี่ยนแปลง class ของ element
      // ถ้าพิมพ์ผิด ให้แสดงสีแดง
      wordDisplay.classList.add("incorrect");
      // setTimeout ใช้เพื่อถ้าเกิดเราพิมพ์ผิด มันจะไปลบ class สีแดงออก ใส่เวลาตามหลัง
      setTimeout(() => wordDisplay.classList.remove("incorrect"), 200);
  }
}
startButton.addEventListener("click", startGame);


