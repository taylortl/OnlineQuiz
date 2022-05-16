// get elements from document
const save = document.getElementById('save-but');
const score = document.getElementById('score');
const username = document.getElementById('user');
const display = document.getElementById('display');
const loader = document.getElementById('loader');

// get item from local storage
const quiz_score = localStorage.getItem('score');
const record = JSON.parse(localStorage.getItem('record')) || [];

/*  For 3 months storage

function deleteExpiredRecord() {
    for (var i = 0 ; i < Object.keys(record).length ; i++) {
        const today = new Date();
        if (today.getTime() > record[i].exp)
            record.splice(i, 1);
    }
    localStorage.setItem('record', JSON.stringify(record));
}

function saveResult() {
    const today = new Date();
    const result = {
        score: quiz_score,
        name: username.value,
        exp: today.getTime() + 604800000  // millisec for 1 week
    };
    record.push(result);
    localStorage.setItem('record', JSON.stringify(record));
    save.classList.add('hide');
}

*/

/* 10 users storage */
function saveTenResult() {
    const result = {
        score: quiz_score,
        name: username.value,
    };
    
    record.push(result);

    if (Object.keys(record).length > 10) {
        record.splice(0, Object.keys(record).length - 10);
    }
    localStorage.setItem('record', JSON.stringify(record));
    
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
    save.addEventListener('click', saveTenResult);
    display.classList.remove('hide');
    loader.classList.add('hide');
}

init();

