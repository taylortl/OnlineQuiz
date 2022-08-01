// get element from document
const names = document.getElementById('name-list');
const scores = document.getElementById('score-list');
const display = document.getElementById('display');
const loader = document.getElementById('loader');

let record = null;

// get record data from database 
function getRecord() {
    fetch('/record/history')
    .then( response => response.json() )
    .then( response => {
        if (response.record.length < 10) {
            record = response.record;
        } else {
            record = response.record.slice(-10);
        }
        showList();
    } )
    .catch((error) => {
        console.error('Error:', error);
    });
}

function showList() {
    names.innerHTML = record
        .map(user => 
        "<li class='list-items'>" + user.username + "</li>"
        ).join("");

    scores.innerHTML = record.map(user => 
        "<li class='list-items'>" + user.score + "</li>"
        ).join("");
    display.classList.remove('hide');
    loader.classList.add('hide');
}

getRecord();