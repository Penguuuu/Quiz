// Questions

var questions = [
  {
    question: "What is HTML?",
    choices: ["Hypertext Markup Language", 
    "Hungry Tom Made Lunch", 
    "Hyper Textile Made Language", 
    "Hot Tamales Mexican Lunch"],
    answer: 1
  },
  {
    question: "What tag is used to link a CSS file?",
    choices: ["Script", 
    "link rel", 
    "H1", 
    "Body"],
    answer: 2
  },
  {
    question: "What tag is used to link an image?",
    choices: ["link rel", 
    "script", 
    "source", 
    "img"],
    answer: 4
  },
  {
    question: "What does CSS stand for ?", 
    choices: ["Cyber Security Services",
    "Cascading Style Sheets",
    "Cascading Smart Sheets",
    "Corresponding Style Sheets"],
    answer: 2
  }
];


//list the variables

var currentQuestion = 0;
var score = 0;
var timer;
var timeLeft = 60; 
var timerInterval;
var startButton = document.getElementById("start-button");
var questionText = questions[currentQuestion].question;
var choices = questions[currentQuestion].choices;

var savedScore = localStorage.getItem("quizScore");


var initialsInput = document.getElementById("initials-input");
var scoreDisplay = document.getElementById("score-display");
var scoreForm = document.getElementById("score-form");


// event listener to perform button action
startButton.addEventListener("click", startQuiz);

//starts the quiz
function startQuiz() {
  document.getElementById("start-button").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  displayQuestion();
  startTimer();
}

function hideText() {
  document.getElementById("my-text").style.display = "none";
}
function displayQuestion() {
  var question = questions[currentQuestion];
  document.getElementById("question").textContent = question.question;
  var choices = document.getElementById("choices").getElementsByTagName("button");
  for (var i = 0; i < question.choices.length; i++) {
    choices[i].textContent = question.choices[i];
    choices[i].onclick = handleAnswerClick;
    
    document.getElementById("score").textContent = score;
  }
}

//fucntion to handle selected answers -> if answer is inccorect, a message will display and reduce time by 10 seconds. 
function handleAnswerClick(event) {
  var selectedAnswerIndex = event.target.value;
  var question = questions[currentQuestion];
  if (selectedAnswerIndex == question.answer) {
    score++;
    document.getElementById("score").textContent = score;
  } else {
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
    var message = document.getElementById("message");
    message.textContent = "Incorrect answer";
  }
  currentQuestion++;
  
  if (currentQuestion === questions.length || timeLeft === 0) {
    endQuiz();
    return;
  } else {
    displayQuestion();
  }
}

function startTimer() {
  timerInterval = setInterval(function() {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft + " seconds left";
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}


function endQuiz() {
  clearInterval(timerInterval);
  document.getElementById("quiz").style.display = "none";
  document.getElementById("score").textContent = score;
  document.getElementById("score-form").style.display = "block";
}

if (savedScore) {
  document.getElementById("saved-score").textContent = savedScore;
}


