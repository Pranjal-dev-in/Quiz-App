//All Used Variables
const startBtn = document.querySelector(".start");
const startDiv = document.querySelector(".start-box");
const mainDiv = document.querySelector(".main-container");
const scoreDiv = document.querySelector(".total-score");
const submitBtn = document.querySelector(".submit");
let time = document.querySelector("#time");
let timerRange = document.querySelector("#timer-range");
const allBtns = document.querySelectorAll(".option-btn");
const ques = document.querySelector(".nxtQue");
const home = document.querySelector("#home");
const restartBtn = document.querySelector("#restart");
let currQue = 0;

//Start Button 
startBtn.addEventListener("click", () => {
  startDiv.classList.add("hidden");
  mainDiv.classList.remove("hidden");
  nextQue(currQue);
  timer();
});

//All Stored Questions
const questions = [
  {
    //0
    ques: "Which keyword is used to declare a constant?",
    options: ["var", "let", "const", "static"],
    ans: "const",
  },
  {
    //1
    ques: "Which symbol is used for strict equality?",
    options: ["==", "=", "===", "!="],
    ans: "===",
  },
  {
    //2
    ques: "What does Array.map() return?",
    options: ["New array", "Single value", "Boolean", "Nothing"],
    ans: "New array",
  },
  {
    //3
    ques: "Which method converts JSON to object?",
    options: ["JSON.parse()", "JSON.stringify()", "toObject()", "parseJSON()"],
    ans: "JSON.parse()",
  },
  {
    //4
    ques: "Which value is falsy?",
    options: ["0", "1", "[ ]", "{ }"],
    ans: "0",
  },
  {
    ques: "Which keyword cannot be reassigned?",
    options: ["var", "let", "const", "function"],
    ans: "const",
  },
  {
    ques: "Which method is used to print in console?",
    options: ["print()", "log()", "console.log()", "write()"],
    ans: "console.log()",
  },
  {
    ques: "What is the output of: typeof [] ?",
    options: ["array", "object", "list", "undefined"],
    ans: "object",
  },
  {
    ques: "Which operator checks value & type both?",
    options: ["==", "=", "===", "!="],
    ans: "===",
  },
  {
    ques: "setTimeout() is ____?",
    options: ["Synchronous", "Asynchronous", "Blocking", "Loop"],
    ans: "Asynchronous",
  },
];

//Next Question Function
function nextQue(idx) {
  const ques = document.querySelector("#ques");
  ques.innerText = questions[idx].ques;

  const opt1 = document.querySelector("#btn1");
  const opt2 = document.querySelector("#btn2");
  const opt3 = document.querySelector("#btn3");
  const opt4 = document.querySelector("#btn4");

  opt1.innerText = questions[idx].options[0];
  opt2.innerText = questions[idx].options[1];
  opt3.innerText = questions[idx].options[2];
  opt4.innerText = questions[idx].options[3];
  currQue++;
  let scoreRecord = document.querySelector("#score-record");
  scoreRecord.innerHTML = `<b>${currQue}</b> of <b>${questions.length}</b> Questions`;
}

//Timer 
let id;
function timer() {
  id = setInterval(() => {
    time.innerText--;
    timerRange.value++;
    if (time.innerText == "0") {
      ques.click();
    }
    if (time.innerText == "-1") {
      clearInterval(id);
    }
  }, 1000);
}

//Button Click
allBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    allBtns.forEach((b) => b.classList.remove("clicked"));
    btn.classList.add("clicked");
    submitBtn.classList.remove("hidden");
  });
});

//Submit Button
let click = 0;
let correctAns = 0;
let wrongAns = 0;
submitBtn.addEventListener("click", () => {
  click++;
  if (click == questions.length) {
    ques.innerText = "View Score";
    clearInterval(id);
  }
  let userAns = document.querySelector(".clicked");
  if (userAns.innerText == questions[currQue - 1].ans) {
    userAns.classList.add("rightAns");
    correctAns++;
  } else {
    userAns.classList.add("wrongAns");
    wrongAns++;
  }
  allBtns.forEach((btn) => {
    btn.classList.add("disabled");
  });
  submitBtn.classList.add("disabled");
  ques.classList.remove("hidden");
});

//Next Question Button
ques.addEventListener("click", () => {
  if (currQue < questions.length) {
    nextQue(currQue);
    submitBtn.classList.remove("disabled");
    allBtns.forEach((btn) => {
      btn.classList.remove("disabled");
      btn.classList.remove("rightAns");
      btn.classList.remove("wrongAns");
      btn.classList.remove("clicked");
    });
    submitBtn.classList.add("hidden");
    ques.classList.add("hidden");
    time.innerText = 10;
    timerRange.value = 0;
  } else {
    mainDiv.classList.add("hidden");
    scoreDiv.classList.remove("hidden");
    const correctAnsScore = document.querySelector("#corr");
    correctAnsScore.innerText = `✅Correct : ${correctAns}`;
    const wrongAnsScore = document.querySelector("#wrong");
    wrongAnsScore.innerText = `❌Wrong : ${wrongAns}`;
    const gradePara = document.querySelector(".grade-para");
    let grades = grade(correctAns);
    gradePara.innerText = `Grade : ${grades}`;
  }
});

//Grade System
function grade(correctAns) {
  if (correctAns >= 9) {
    return "🔥 A+";
  } else if (correctAns == 8) {
    return "😎 A";
  } else if (correctAns == 7) {
    return "😉 B+";
  } else if (correctAns == 6) {
    return "😊 B";
  } else if (correctAns == 5) {
    return "😐 C+";
  } else if (correctAns >= 3) {
    return "☹️ C";
  } else {
    return "😓 D";
  }
}

//Restart Button
restartBtn.addEventListener("click", () => {
  currQue = 0;
  mainDiv.classList.remove("hidden");
  scoreDiv.classList.add("hidden");
  ques.click();
  click = 0;
  correctAns = 0;
  wrongAns = 0;
  time.innerText = "10";
  timerRange.value = 0;
  timer();
});

//Home Button
home.addEventListener("click", () => {
  scoreDiv.classList.add("hidden");
  startDiv.classList.remove("hidden");
  currQue = 0;
  click = 0;
  correctAns = 0;
  wrongAns = 0;
  time.innerText = "10";
  timerRange.value = 0;
  submitBtn.classList.remove("disabled");
  allBtns.forEach((btn) => {
    btn.classList.remove("disabled");
    btn.classList.remove("rightAns");
    btn.classList.remove("wrongAns");
    btn.classList.remove("clicked");
  });
  submitBtn.classList.add("hidden");
  ques.classList.add("hidden");
});
