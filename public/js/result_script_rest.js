// get elements from document
const save = document.getElementById('save-but');
const score = document.getElementById('score');
const username = document.getElementById('user');
const display = document.getElementById('display');
const loader = document.getElementById('loader');

// get info from local storage
const quiz_score = localStorage.getItem('score');
const user_id = localStorage.getItem('user');

// save result to database 
function saveResult() {
    
    const options = {
        method: 'POST'
    };
    fetch(`/result/save-username/${username.value}/${user_id}`, options )
    .then( response => response.json() )
    .then( response => {
        console.log(response.message);
    } )
    .catch((error) => {
        console.error('Error:', error);
    }); 
    
    save.classList.add('hide');
    username.classList.add('hide');
}

function init() {
    // unlock the save button if username is typed
    username.addEventListener('keyup', () => {
        save.disabled = !username.value;
    })
    
    // get the score of the quiz
    score.innerText = quiz_score;
    save.addEventListener('click', saveResult);
    display.classList.remove('hide');
    loader.classList.add('hide');
}

init();