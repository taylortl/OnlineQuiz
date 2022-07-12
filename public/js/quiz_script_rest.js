// get elements
const question = document.getElementById('question');
const answers = Array.from(document.getElementsByClassName('answer-but'));
const next = document.getElementById('next-but');
const counter = document.getElementById('quest-counter');
const progress = document.getElementById('progress');
const quiz = document.getElementById('quiz');
const loader = document.getElementById('loader');
const data = { username: 'example' };

// declare variables
let currentQuestion = {}; // current question json object
let ready_ans = false; // flag to block user press "next" button 
let quiz_score = 0; // score of the user 
let questionShown = 0; // keep track of the question shown (cannot be larger than MAX_QUEST)
let unanswered_quest = []; // id of the unasnwered questions

// declare constant
const CORRECT = 10;
const MAX_QUEST = 10;

fetch('./quiz')
.then(response => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});




// function setcounter(number) {
//     counter.innerText = 'Question ' + number + '/' + MAX_QUEST;
// }

// function updateProgess(number) {
//     percentage = (number / MAX_QUEST) * 100;
//     progress.style.width = percentage + '%';
// }

// function nextQuestion() {
//     // check if end quiz 
//     if (unanswered_quest.length == 0 || questionShown >= MAX_QUEST){
//         quiz_score = parseInt((quiz_score / (MAX_QUEST * 10)) * 100);
//         localStorage.setItem('score', quiz_score);
//         // replace with fetch result 
//         return window.location.assign('../result_page/result.html');
//     } 
    
//     // show a random question 
//     const index = Math.floor(Math.random() * unanswered_quest.length);
//     currentQuestion = unanswered_quest[index];
//     question.innerText = currentQuestion.question;
    
//     // set values for flags
//     next.disabled = true;
//     questionShown++;

//     // update info section
//     setcounter(questionShown);
//     updateProgess(questionShown);

//     // show the choices for the question 
//     answers.forEach((ans) => {
//         ans.lastElementChild.innerText = currentQuestion.answers[ans.dataset['number']].text;
//     });

//     // delete the shown question from the array 
//     unanswered_quest.splice(index, 1);
//     ready_ans = true;

// }

// function addListenerToAnswer(ans) {
//     ans.addEventListener('click', (event) => {
//         // if question not shown, don't react
//         if (!ready_ans)
//             return;

//         let selected_element = event.target;

//         // the user can click on the button / span
//         // this assert we are dealing with the button
//         if (!selected_element.classList.contains('answer-but'))
//             selected_element = selected_element.parentElement;

//         // get the data-number of the button
//         const selected_ans = selected_element.dataset['number'];
//         let classToAdd = 'wrong';
//         if (currentQuestion.answers[selected_ans].correct){
//             classToAdd = 'correct';
//             quiz_score += CORRECT;
//         }
    
//         // change the theme 
//         selected_element.classList.add(classToAdd);
//         document.body.classList.add(classToAdd);

//         // set values for flags
//         next.disabled = false;
//         ready_ans = false;
//     });
// } 

// function removeClass(element, cls) {
//     if (element.classList.contains(cls))
//         element.classList.remove(cls);
// }

// function eventForNext() {

//     // remove themes
//     answers.forEach((ans) => {
//         removeClass(ans, 'correct');
//         removeClass(ans, 'wrong');
//     });
    
//     removeClass(document.body, 'correct');
//     removeClass(document.body, 'wrong');

//     // show next question
//     nextQuestion();
// } 

// function startQuiz() {
//     quiz_score = 0;
//     unanswered_quest = [...questions]; /* spread opeator: make a copy of the array */
//     nextQuestion();
//     answers.forEach(addListenerToAnswer);
//     next.addEventListener('click', eventForNext);
//     quiz.classList.remove('hide');
//     loader.classList.add('hide');
// }

// function getOnlineQuestion(loaded_quest) {
//     // the questions in Open Trivia Database is coded in HTML
//     // these lines change some html codes to usual string
//     let refined_quest = loaded_quest.question.replaceAll('&quot;', '"');
//     refined_quest = refined_quest.replaceAll('&#039;', "'");
//     const question = {
//         question: refined_quest,
//         answers: []
//     };

//     // load answers 
//     const loaded_answers = [...loaded_quest.incorrect_answers];
//     const correct_index = Math.floor(Math.random() * 4);
//     loaded_answers.splice(correct_index, 0, loaded_quest.correct_answer);

//     const answers = [];
    
//     loaded_answers.forEach((ans, index) => {
//         let refined_ans = ans.replaceAll('&quot;', '"');
//         refined_ans = refined_ans.replaceAll('&#039;', "'");
//         const choice = {
//             text: refined_ans,
//             correct: false
//         };

//         if (index == correct_index) {
//             choice['correct'] = true;
//         }
//         answers.push(choice);
//     })
//     question['answers'] = answers;
//     return question;
// } 

// // fetch questions from the api and start the quiz
// fetch("https://opentdb.com/api.php?amount=20&category=19&type=multiple")
// .then(response => response.json())
// .then((load_quests) => {
//     questions = load_quests.results.map(getOnlineQuestion);
//     startQuiz();
// })
// .catch((e) => {
//     console.error(e);
// })