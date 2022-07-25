// get elements
const question = document.getElementById('question');
const answers = Array.from(document.getElementsByClassName('answer-but'));
const next = document.getElementById('next-but');
const counter = document.getElementById('quest-counter');
const progress = document.getElementById('progress');
const quiz = document.getElementById('quiz');
const loader = document.getElementById('loader');
const numQuest = document.getElementById('count');

// declare constant
const CORRECT = 10;
const MAX_QUEST = 10;
const num_question = parseInt(numQuest.innerText);

// declare variables
let currentQuestion = null; // current question number
let ready_ans = false; // flag to block user press "next" button 
let quiz_score = 0; // score of the user 
let questionShown = 0; // keep track of the question shown (cannot be larger than MAX_QUEST)
let unanswered_quest = [...Array(num_question).keys()]; // id of the unasnwered questions


function startQuiz() {
    quiz_score = 0;
    console.log(num_question);
    console.log(unanswered_quest);
    nextQuestion();
    answers.forEach(addListenerToAnswer);
    next.addEventListener('click', eventForNext);
    quiz.classList.remove('hide');
    loader.classList.add('hide');
}

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
        // save the quiz score of the user 
        localStorage.setItem('score', quiz_score);
        // replace with fetch result 
        return window.location.assign('../result_page/result.html');
    } 
    
    // show a random question 
    const index = Math.floor(Math.random() * num_question + 1);
    fetch(`/quiz/${index}`)
    .then(response => response.json())
    .then(json => {
        currentQuestion = {
            question: json.question[0].question,
            choice1: JSON.parse(JSON.stringify(json.choices[0])),
            choice2: JSON.parse(JSON.stringify(json.choices[1])),
            choice3: JSON.parse(JSON.stringify(json.choices[2])),
            choice4: JSON.parse(JSON.stringify(json.choices[3])),
        };

        question.innerText = currentQuestion.question;

        // set values for flags
        next.disabled = true;
        questionShown++;

        // update info section
        setcounter(questionShown);
        updateProgess(questionShown);

        // show the choices for the question 
        answers.forEach((ans) => {
            ans.lastElementChild.innerText = currentQuestion[`choice${parseInt(ans.dataset['number']) + 1}`].choice;
        });

        // delete the shown question from the array 
        unanswered_quest.splice(index, 1);
        ready_ans = true;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
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
        const selected_ans = parseInt(selected_element.dataset['number']) + 1;
        let classToAdd = 'wrong';
        if (currentQuestion[`choice${selected_ans}`].is_answer == 1){
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

startQuiz();


