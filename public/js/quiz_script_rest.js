// get elements
const question = document.getElementById('question');
const answers = Array.from(document.getElementsByClassName('answer-but'));
const next = document.getElementById('next-but');
const counter = document.getElementById('quest-counter');
const progress = document.getElementById('progress');
const quiz = document.getElementById('quiz');
const loader = document.getElementById('loader');
const numQuest = document.getElementById('count');
const userID = document.getElementById('user');

// declare constant
const CORRECT = 10; // points for correct answeres
const MAX_QUEST = 10; // number of questions to be shown at max
const num_question = parseInt(numQuest.innerText); // number of questions the database has
const user_id = parseInt(userID.innerText); // the user id of the current user

// declare variables
let currentQuestion = null; // current question json object
let current_index = -1;
let ready_ans = false; // flag to block user press "next" button 
let quiz_score = 0; // score of the user 
let questionShown = 0; // keep track of the question shown (cannot be larger than MAX_QUEST)
let unanswered_quest = [...Array(num_question).keys()]; // id of the unasnwered questions


function startQuiz() {
    quiz_score = 0;
    nextQuestion();
    answers.forEach(addListenerToAnswer);
    next.addEventListener('click', eventForNext);
    quiz.classList.remove('hide');
    loader.classList.add('hide');
}

// update the question number shown
function setcounter(number) {
    counter.innerText = 'Question ' + number + '/' + MAX_QUEST;
}

// update the progress bar 
function updateProgess(number) {
    percentage = (number / MAX_QUEST) * 100;
    progress.style.width = percentage + '%';
}

function nextQuestion() {
    // check if end quiz 
    if (unanswered_quest.length == 0 || questionShown >= MAX_QUEST){
        quiz_score = parseInt((quiz_score / (MAX_QUEST * 10)) * 100);

        // TODO: change local storage to post request

        // save the quiz score of the user 
        localStorage.setItem('score', quiz_score);
        // replace with fetch result 
        return window.location.assign('../result_page/result.html');
    } 
    
    // get a random index of an unanswered question
    current_index = Math.floor(Math.random() * unanswered_quest.length);

    // fetch the question from the database
    fetch(`/quiz/${unanswered_quest[current_index]}`)
    .then(response => response.json())
    .then(json => {
        // update the current question
        currentQuestion = {
            index: unanswered_quest[current_index],
            question: json.question[0].question,
            // ensure the choices are json objects
            choice1: JSON.parse(JSON.stringify(json.choices[0])),
            choice2: JSON.parse(JSON.stringify(json.choices[1])),
            choice3: JSON.parse(JSON.stringify(json.choices[2])),
            choice4: JSON.parse(JSON.stringify(json.choices[3])),
        };

        // show the question fetched 
        question.innerText = currentQuestion.question;

        // set values for flags
        next.disabled = true;
        questionShown++;

        // update info section on the page
        setcounter(questionShown);
        updateProgess(questionShown);

        // show the choices for the question 
        answers.forEach((ans) => {
            // ans.dataset['number'] is the "tag" of the choice buttons (0-3)
            ans.lastElementChild.innerText = currentQuestion[`choice${parseInt(ans.dataset['number']) + 1}`].choice;
        });

        // delete the shown question from the array 
        unanswered_quest.splice(current_index, 1);
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

        // make post request to save user's answer
        const params = {
            user: user_id,
            choice: currentQuestion[`choice${selected_ans}`].id
        };
        const options = {
            method: 'POST'
        };
        fetch(`/quiz/${currentQuestion.index}/${user_id}/${currentQuestion[`choice${selected_ans}`].id}`, options )
        .then( response => response.json() )
        .then( response => {
            console.log(response.message);
        } )
        .catch((error) => {
            console.error('Error:', error);
        });

        
    
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



