'use strict';


class Score {
    #date;
    #hits;
    #percentage;

    constructor(date, hits, percentage) {
      this.#date = date;
      this.#hits = hits;
      this.#percentage = percentage;
    }

    get date() { return this.#date; }
    get hits() { return this.#hits; }
    get percentage() { return this.#percentage; }
}

const words = [
    'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building',
    'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
    'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow',
    'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer',
    'philosophy', 'database', 'periodic', 'capitalism', 'abominable',
    'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada',
    'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology', 'promise',
    'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake',
    'baseball', 'beyond', 'evolution', 'banana', 'perfume', 'computer',
    'management', 'discovery', 'ambition', 'music', 'eagle', 'crown', 'chess',
    'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'superman', 'library',
    'unboxing', 'bookstore', 'language', 'homework', 'fantastic', 'economy',
    'interview', 'awesome', 'challenge', 'science', 'mystery', 'famous',
    'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
    'keyboard', 'window', 'beans', 'truck', 'sheep', 'band', 'level', 'hope',
    'download', 'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil', 'mask',
    'audio', 'school', 'detective', 'hero', 'progress', 'winter', 'passion',
    'rebel', 'amber', 'jacket', 'article', 'paradox', 'social', 'resort', 'escape'
];

let timer;
let countdown = 99;

const timeDisplay = document.getElementById('timer');
const wordInput = document.querySelector('#word-input');
const chosenWord = document.getElementById('current-word');
const startButton = document.getElementById('start');
const restartButton = document.querySelector('#restart');
var modal = document.getElementById('myModal');

function updateTimer() {
    countdown--;
    if (countdown < 0) {
        gameTimeOver();
        endGame();
    } else {
    timeDisplay.innerText = countdown;
}}


function gameTimeOver() {
    clearInterval(timer);
    let gameMusic = document.getElementById('game-music');
    gameMusic.pause();
}

function updateDisplay() {
    timeDisplay.textContent = countdown;
}

function displayNewWord(word) {
    chosenWord.textContent = word;
}

const shuffled = words.sort(() => Math.random() - 0.5);
let hitCount = 0;
const scoreDisplay = document.getElementById('score');

function updateScore() {
    scoreDisplay.textContent = hitCount;

    // let leaf = document.createElement('img');
    // leaf.src = '../assets/img/monkey.png';
    // leaf.classList.add('leaf');

    // leaf.style.left = Math.random() * window.innerWidth + 'px';

    // let leafcontainer = document.getElementById("monkey-box");
    // leafcontainer.appendChild(leaf);
}

wordInput.addEventListener('keyup', function () {
    const currentWord = wordInput.value.trim().toLowerCase();
    const currentDisplayedWord = chosenWord.textContent;

    if (currentWord === currentDisplayedWord) {
        displayNewWord(shuffled.pop());
        hitCount++;
        wordInput.value = '';
        updateScore();
        if (shuffled.length === 0) endGame();
    }
});



function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true'); 
}

function start() {
    closeModal();
    clearInterval(timer);
    countdown = 99;
    updateDisplay();
    timer = setInterval(function () {
        --countdown;
        if (countdown < 0) endGame();
        else updateDisplay();
    }, 1000);
    displayNewWord(shuffled.pop());
    wordInput.value = '';
    wordInput.focus();
    let gameMusic = document.getElementById('game-music');
    gameMusic.play();
}

startButton.addEventListener('click', start);

function restart() {
    modal.style.display = 'block';
    modal.removeAttribute('aria-hidden');    
    let gameMusic = document.getElementById('game-music');
    gameMusic.pause();
    gameMusic.currentTime = 0;
    wordInput.disabled = false;
}

restartButton.addEventListener('click', restart);
const scores = [];

function endGame() {
    const newScore = new Score(new Date().toString(), hitCount, (hitCount / 120) * 100);
    scores.push(newScore);

    clearInterval(timer);

    let gameMusic = document.getElementById('game-music');
    gameMusic.pause();

    hitCount = 0;
    wordInput.disabled = true;
}

window.onload = function(){
    modal.style.display = 'block';
    modal.removeAttribute('aria-hidden'); 
};

