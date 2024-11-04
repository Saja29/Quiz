

const questionElement = document.getElementById("question");
const questionNumElement = document.getElementById("questionNum");
const answers = document.getElementById("answers");
const nextBtn = document.getElementById("next");

const scoreElement = document.getElementById("score");
const calender = document.getElementById("calender");
const quizElement = document.getElementById("quiz");
const scoreText = document.getElementById("scoreText");
const scoreCircle=document.getElementById("scoreCircle");
const subjectName=document.getElementById("subjectName");
let currentquestionIndex = 0;

let timer;
let timeRemaining = 10 * 60; // 10 minutes in seconds
const itemId = getQueryParam('id');

subjectName.innerHTML=itemId;

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}


async function fetchQuestions() {
  // https://quizapi.io/api/v1/questions?apiKey=2wv7t8w9BT8xp33EqvECHEd0E34dQrgX4pSYjcCd&category=Linux&limit=10
  const apiKey = "2wv7t8w9BT8xp33EqvECHEd0E34dQrgX4pSYjcCd";
  try {
    const response = await fetch(`https://quizapi.io/api/v1/questions?apiKey=${apiKey}&category=${itemId}&limit=10`);
     
    const data = await response.json();
    Questions = data; // Populate the Questions array with fetched data

 
    
    // Now call startQuiz after the data is loaded
 
    
    startQuiz();
  } catch (error) {
    console.error('Error fetching questions:', error.message);
  }
}
function startTimer() {
  // Clear any existing timer
  clearInterval(timer);

  timer = setInterval(() => {
   
    timeRemaining--; // Decrement the time remaining

    // Calculate minutes and seconds
    const hours= "00";
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    // Format time as MM:SS
    document.getElementById("timer").innerHTML = 
    `<div>
      <p>${hours}&nbsp;&nbsp;:&nbsp;&nbsp;${String(minutes).padStart(2, '0')}&nbsp;&nbsp;:&nbsp;&nbsp;${String(seconds).padStart(2, '0')}</p>
          <p class="t2">&nbsp;H&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;S</p></div>`;


          if (timeRemaining <= 0) {
            clearInterval(timer);
           
              localStorage.setItem("showOverlay", "false");
          
            shwoScore()    }      

  }, 1000); // Update every second
 
}


function startQuiz() {

  

  
  currentquestionIndex = 0;
  score = 0;
  showQuestion();
  showCalender();
  startTimer();
}


function showCalender() {
  
  Questions.forEach((Q, index) => {
    const span = document.createElement("span");
    span.innerHTML = index + 1;
    span.classList.add("span");
    calender.appendChild(span);
  }
  )

}
function showQuestion() {
  resetstate();
  
  let currentQueston = Questions[currentquestionIndex];
  
  let questionNum = currentquestionIndex + 1;
  questionNumElement.innerHTML = "Question #" + questionNum;

  questionElement.innerHTML = currentQueston.question;

  const oi = document.createElement("oi");
 // Ensure currentQueston.answers is an array
 if (currentQueston && currentQueston.answers && typeof currentQueston.answers === 'object') {


 // In the showQuestion function:
 let correct_answer;
  // Assume 'correct_answer' field is provided in API
  Object.entries(currentQueston.correct_answers).forEach(([key, value])=>{
if(value=="true")
correct_answer=key;
 } ) 
 correct_answer = correct_answer.replace(/_correct/g, "");
 
Object.entries(currentQueston.answers).forEach(([key, value]) => {

  if (value) {
    const list = document.createElement("li");
    const span = document.createElement("span");

    // Set text and add correct data flag
    span.innerHTML = value;
    span.tabIndex = 0;
 
    
    if (correct_answer === key) {

      span.dataset.correct = "true";
    } else { 
      span.dataset.correct = "false";
    }
  

    span.addEventListener("click", (event) => {
      selectAnswer(event, key, currentQueston.id, oi);
    });

    list.appendChild(span);
    oi.appendChild(list);
  }
});

} else {
  console.error("currentQueston.answers is not an object or is missing.");
}
  answers.appendChild(oi);
  restoreSelectedAnswer(currentQueston.id, oi);

}
function restoreSelectedAnswer(questionId, oi) {
  const storedAnswers = JSON.parse(localStorage.getItem("userAns")) || [];
  const savedAnswer = storedAnswers.find(answer => answer.quesId === questionId);

  if (savedAnswer) {
    const selectedSpan = oi.querySelector(`span[data-answer-id="${savedAnswer.ansId}"]`);
    if (selectedSpan) {
      selectedSpan.classList.add("selected-answer"); // Apply the selected color
    }
  }
}
function resetstate() {
  while (answers.firstChild) {
    answers.removeChild(answers.firstChild);
  }
}
function selectAnswer(e, answerId, questionId, li) {
  const indexToRemove = userAns.findIndex(userAns => userAns.quesId === questionId);
  const quesIndex= Questions.findIndex(ques => ques.id === questionId);
  const spans = li.querySelectorAll("span"); // Selects all spans in the <ol>
  const flag=calender.querySelectorAll(".span");
  if (quesIndex !== -1) {
    // If found, remove the object from the array
    flag[quesIndex].classList.add("show-icon");
    
  }
  spans.forEach(span => {
    span.style.backgroundColor = ""; // Resets color of all spans
  });
  e.target.classList.add("selected-answer");
  // e.target.style.backgroundColor = "#eee2dc";
  const selectedSpan = e.target;
  const isCorrect = selectedSpan.dataset.correct === "true";
  
  let userAnswer = { quesId: questionId, ansId: answerId, correct: isCorrect ? 1 : 0 };

  if (indexToRemove !== -1) {
    // If found, remove the object from the array
    userAns.splice(indexToRemove, 1);
    localStorage.setItem("userAns", JSON.stringify(userAns));
  }

 userAns.splice(currentquestionIndex, 0, userAnswer);
    localStorage.setItem("userAns", JSON.stringify(userAns));

}
function shwoScore() {
  scoreElement.style.display = "flex";
  quizElement.style.display = "none";
  let correctAnswers = 0;

  // Calculate the number of correct answers
  userAns.forEach(x => {
    if (x.correct === 1) { // Ensure that you are checking the correct type
      correctAnswers++;
    }
  });

  // Display the score in "X/10" format
  scoreText.textContent = `${correctAnswers}/10`;


  // Update styling based on correctAnswers, if desired
  if (correctAnswers <= 2) {
    scoreCircle.style.borderColor = '#f44336';
    scoreCircle.style.borderWidth = '8px';
  } else if (correctAnswers <= 5) {
    scoreCircle.style.borderColor = '#ff9800';
    scoreCircle.style.borderWidth = '10px';
  } else {
    scoreCircle.style.borderColor = '#4caf50';
    scoreCircle.style.borderWidth = '12px';
  }
 
}


function handelNextButton() {
  currentquestionIndex += 1;
  
  if (currentquestionIndex < Questions.length) {
    showQuestion();

  }
  else {
  
  localStorage.setItem("showOverlay", "false");

    shwoScore();
  }
}


nextBtn.addEventListener("click", () => {

  
  if (currentquestionIndex < Questions.length) {
    handelNextButton();
  }
  
  else {
  
    startQuiz();
  }

  if(currentquestionIndex === Questions.length-1) {
    nextBtn.innerText="Finish"
   }
})

fetchQuestions();
