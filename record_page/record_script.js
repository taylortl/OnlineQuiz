// get element from document
const names = document.getElementById('name-list');
const scores = document.getElementById('score-list');
const display = document.getElementById('display');
const loader = document.getElementById('loader');

// get item from local storage
const record = JSON.parse(localStorage.getItem('record')) || [];

function showList() {
    names.innerHTML = record
        .map(user => 
        "<li class='list-items'>" + user.name + "</li>"
        ).join("");

    scores.innerHTML = record.map(r => 
        "<li class='list-items'>" + r.score + "</li>"
        ).join("");
    display.classList.remove('hide');
    loader.classList.add('hide');
}

showList();