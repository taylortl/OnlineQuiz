// get elements
const question = document.getElementById('question');
const answers = Array.from(document.getElementsByClassName('answer-but'));
const next = document.getElementById('next-but');
const counter = document.getElementById('quest-counter');
const progress = document.getElementById('progress');
const quiz = document.getElementById('quiz');
const loader = document.getElementById('loader');

// declare variables
let currentQuestion = {};
let ready_ans = false;
let quiz_score = 0;
let questionShown = 0;
let unanswered_quest = [];
let questions = [
    {
        question: 'What is 2 + 2?', 
        answers: [
            {text: '6', correct: false},
            {text: '22', correct: false},
            {text: '45', correct: false},
            {text: '4', correct: true},
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

    },
    {
        question: 'What is 2 + 2?', 
        answers: [
            {text: '6', correct: false},
            {text: '22', correct: false},
            {text: '45', correct: false},
            {text: '4', correct: true},
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
];

// declare constant
const CORRECT = 10;
const MAX_QUEST = 6;

function setcounter(number) {
    counter.innerText = 'Question ' + number + '/' + MAX_QUEST;
}

function updateProgess(number) {
    percentage = (number / MAX_QUEST) * 100;
    progress.style.width = percentage + '%';
}

function nextQuestion() {
    // check if end quiz 
    if (unanswered_quest.length == 0 || questionShown >= MAX_QUEST){
        quiz_score = parseInt((quiz_score / (MAX_QUEST * 10)) * 100);
        localStorage.setItem('score', quiz_score);
        return window.location.assign('/result_page/result.html');
    } 
    
    // show a random question 
    const index = Math.floor(Math.random() * unanswered_quest.length);
    currentQuestion = unanswered_quest[index];
    question.innerText = currentQuestion.question;
    
    // set values for flags
    next.disabled = true;
    questionShown++;

    // update info section
    setcounter(questionShown);
    updateProgess(questionShown);

    // show the choices for the question 
    answers.forEach((ans) => {
        ans.lastElementChild.innerText = currentQuestion.answers[ans.dataset['number']].text;
    });

    // delete the shown question from the array 
    unanswered_quest.splice(index, 1);
    ready_ans = true;

}

function addListenerToAnswer(ans) {
    ans.addEventListener('click', (event) => {
        // if question not shown, don't react
        if (!ready_ans)
            return;

        
        let selected_element = event.target;

        // the user can click on the button / span
        // this assert we are dealing with the button
        if (!selected_element.classList.contains('answer-but'))
            selected_element = selected_element.parentElement;

        // get the data-number of the button
        const selected_ans = selected_element.dataset['number'];
        let classToAdd = 'wrong';
        if (currentQuestion.answers[selected_ans].correct){
            classToAdd = 'correct';
            quiz_score += CORRECT;
        }
    
        // change the theme 
        selected_element.classList.add(classToAdd);
        document.body.classList.add(classToAdd);

        // set values for flags
        next.disabled = false;
        ready_ans = false;
    });
} 

function removeClass(element, cls) {
    if (element.classList.contains(cls))
        element.classList.remove(cls);
}

function eventForNext() {

    // remove themes
    answers.forEach((ans) => {
        removeClass(ans, 'correct');
        removeClass(ans, 'wrong');
    });
    
    removeClass(document.body, 'correct');
    removeClass(document.body, 'wrong');

    // show next question
    nextQuestion();
} 

function startQuiz() {
    quiz_score = 0;
    unanswered_quest = [...questions]; /* spread opeator: make a copy of the array */
    nextQuestion();
    answers.forEach(addListenerToAnswer);
    next.addEventListener('click', eventForNext);
    quiz.classList.remove('hide');
    loader.classList.add('hide');
}

startQuiz();