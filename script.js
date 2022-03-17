const startButton = document.getElementById("start-but")
const questionElements = document.getElementById("question-container")
const theQuestion = document.getElementById("question")
const answerButtons = document.getElementById("answer-but")
let shuffledQuestions, currentQuestion
startButton.addEventListener('click', startQuiz)

function startQuiz() {
    /* remove the start button */
    startButton.classList.add("hide")
    /* show the questions */
    shuffledQuestions = questions.sort(() => Math.random() - 0.5)
    currentQuestion = 0
    questionElements.classList.remove("hide")
    setNextQuestion()
}

function setNextQuestion() {
    showQuestion(shuffleQuestions[currentQuestionIndex]);
}

function showQuestion(q) {
    theQuestion.innerText = q.question
    q.answers.forEach(answer => )
}
function selectAnswer() {

}

const questions = [
    {
        question: "What is 2 + 2?", 
        answers: [
            {text: "4", correct: true},
            {text: "22", correct: false},
            {text: "45", correct: false},
            {text: "6", correct: false},
        ]
    }
]