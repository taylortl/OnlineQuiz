const question = document.getElementById('question')
const answers = Array.from(document.getElementsByClassName('answer-container'))

let currentQuestion = {}
let ready_ans = false
let score = 0
let questionShown = 0
let unanswered_quest = []
let questions = [
    {
        question: 'What is 2 + 2?', 
        answers: [
            {text: '4', correct: true},
            {text: '22', correct: false},
            {text: '45', correct: false},
            {text: '6', correct: false},
        ]
    },
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        answers: [
            {text: '<script>', correct: true},
            {text: '<javascript>', correct: false},
            {text: '<js>', correct: false},
            {text: '<scripting>', correct: false},
        ]
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        answers: [
            {text: "msgBox('Hello World');", correct: false},
            {text: "alertBox('Hello World';", correct: false},
            {text: "msg('Hello World');", correct: false},
            {text: "alert('Hello World');", correct: true},
        ]

    }
]

const CORRECT = 10
const MAX_QUEST = 3

function nextQuestion() {
    if (unanswered_quest.length == 0 || questionShown >= MAX_QUEST)
        return window.location.assign('/end.html')
    
    /* show a random question */
    const index = Math.floor(Math.random() * unanswered_quest.length)
    currentQuestion = unanswered_quest[index]
    question.innerText = currentQuestion.question
    questionShown++

    /* show the choices for the question */
    answers.forEach((ans) => {
        ans.lastElementChild.innerText = currentQuestion.answers[ans.dataset['number']].text
    })

    /* delete the shown question from the array */
    unanswered_quest.splice(index, 1)
    ready_ans = true

}

function addListenerToAnswers(ans) {
    ans.addEventListener('click', (event) => {
        if (!ready_ans)
            return
        ready_ans = false

        let selected_element = event.target
        if (!selected_element.classList.contains('answer-container'))
            selected_element = selected_element.parentElement

        const selected_ans = selected_element.dataset['number']
        if (currentQuestion.answers[selected_ans].correct){
            event.target.classList.add('correct')
            document.body.classList.add('correct')
        } else {
            event.target.classList.add('wrong')
            document.body.classList.add('wrong')
        }
        nextQuestion()
    })
} 

function addListenerToNext(ans) {
    ans.addEventListener('click', (event) => {
        if (!ready_ans)
            return
        ready_ans = false

        const selected_ans = event.target.dataset['number']
        if (currentQuestion.answers[selected_ans].correct){
            event.target.classList.add('correct')
            document.body.classList.add('correct')
        } else {
            event.target.classList.add('wrong')
            document.body.classList.add('wrong')
        }
        nextQuestion()
    })
} 


function startQuiz() {
    questionShown = 0
    score = 0
    unanswered_quest = [...questions] /* spread opeator: make a copy of the array */
    nextQuestion()
    answers.forEach(addListenerToAnswers)
}

startQuiz()