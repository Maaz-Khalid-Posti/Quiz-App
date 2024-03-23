import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
  import { getDatabase , ref , set ,push ,onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCmB9RhsP1NiaEs6XL7Eo4WvX1itfPZiSY",
    authDomain: "project-quizapp-33902.firebaseapp.com",
    projectId: "project-quizapp-33902",
    storageBucket: "project-quizapp-33902.appspot.com",
    messagingSenderId: "959535188200",
    appId: "1:959535188200:web:938c80d5290ea651aea15d",
    measurementId: "G-0XG1G6G3QF"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  console.log(app);
  console.log(database);
//   Quiz Js Start
var questions = [
    {
        question: "Html Stands For _______________________",
        options: ["Hyper Text Makeup Language", "html", "Case Cading Style Sheet", "Hypertext markup language"],
        correctAns: "Hypertext markup language",
    },
    {
        question: "Css Stands For _______________________",
        options: ["Casecading Style Sheet", "Java", "Ram", "Hypertext markup language"],
        correctAns: "Casecading Style Sheet",
    },
    {
        question: "Js Stands For _______________________",
        options: ["Java Style", "Java Script", "Script", "Script Src"],
        correctAns: "Java Script",
    },
    {
        question: "Dom Stands For _______________________",
        options: ["Document Object Model", "html", "Css", "Java"],
        correctAns: "Document Object Model",
    },
    {
        question: "Ram Stands For _______________________",
        options: ["Read Only Memory", "Dom", "Random Acccess Memory", "For Pc"],
        correctAns: "Random Acccess Memory",
    },
    {
        question: "Rom Stands For _______________________",
        options: ["Hyper Text Markup Language", "html", "HTml", "Read Only Memory"],
        correctAns: "Read Only Memory",
    },
];

var displayQuestion = document.getElementById("displayQuestion");
var optionParent = document.getElementById("optionParent");
var totalQuestionNumber = document.getElementById("totalQuestionNumber");
var currentQuestionNumber = document.getElementById("currentQuestionNumber");
var quizDisplay = document.getElementById("quizdisplay");
var resultDisplay = document.getElementById("resultDisplay");
var percentage = document.getElementById("percentage");
var indexValue = 0;
var marks = 0;

function ShowQuestion() {
    let refv = push(ref(database, "Questions"));
    let refkey = refv.key;

    let obj = {
        question: questions[indexValue].question,
        options: questions[indexValue].options,
        correctAnswer: questions[indexValue].correctAns
    };

    set(ref(database, `Questions/${refkey}`) , obj)
    .then(function () {
        displayQuestion.innerHTML = questions[indexValue].question;
        totalQuestionNumber.innerHTML = questions.length;
        currentQuestionNumber.innerHTML = indexValue + 1;
    })
    .catch(function (err){
        console.log("ShowQuestion error: " + err)
    })

    for (var i = 0; i < questions[indexValue].options.length; i++) {
        var options = questions[indexValue].options[i];
        var correctAns = questions[indexValue].correctAns;
        mainoptions.innerHTML += `
            <div class="col-md-6">
                <button class="optionbtn" onclick="checkQuestion('${options}', '${correctAns}')">${questions[indexValue].options[i]}</button>
            </div>
        `;
    }
}

ShowQuestion();

function nextQuestion() {
    document.getElementById("mainoptions").innerHTML = ""; // Clear the options displayed
    if (indexValue + 1 == questions.length) {
        resultDisplay.style.display = "block";
        quizDisplay.style.display = "none";

        var totalPercentage = ((marks / questions.length) * 100).toFixed(2); // Calculate percentage with two decimal places
        percentage.innerHTML = totalPercentage;

    } else {
        indexValue++;
        ShowQuestion();
    }
}


window.checkQuestion = function(optionValue, correctValue) {
    if (optionValue === correctValue) {
        marks++;
    }
    nextQuestion();
}

window.restartQuiz = function() {
    indexValue = 0;
    marks = 0;
    resultDisplay.style.display = "none";
    quizDisplay.style.display = "block";
    ShowQuestion();
}