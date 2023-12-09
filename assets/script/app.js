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
let countdown = 20;

const timeDisplay = document.getElementById('timer');
const wordInput = document.querySelector('#word-input');
const chosenWord = document.getElementById('current-word');
const startButton = document.getElementById('start');
const restartButton = document.querySelector('#restart');
const modal = document.getElementById('myModal');
const gameOverDialog = document.getElementById('gameOverDialog');
const scoreboardDialog = document.getElementById('scoreboardDialog');
const scoreboardContent = document.getElementById('scoreboardContent');

function updateTimer() {
    countdown--;
    if (countdown < 0) {
        gameTimeOver();
        endGame();
    } else {
        timeDisplay.innerText = countdown;
    }
}

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

function openGameOverDialog() {
    const gameScoreText = document.getElementById('game-score');
    gameScoreText.textContent = `Your Score: ${hitCount} hits`;
    gameOverDialog.style.display = 'block';
}

function openScoreboard() {
    scoreboardContent.innerHTML = ''; 

    scores.forEach((score, index) => {
        const scoreItem = document.createElement('p');
        scoreItem.textContent = `${index + 1}. Hits: ${score.hits}, Percentage: ${score.percentage}% - ${score.date}`;
        scoreboardContent.appendChild(scoreItem);
    });

    scoreboardDialog.style.display = 'block';
}

function closeDialog(dialogId) {
    const dialog = document.getElementById(dialogId);
    dialog.style.display = 'none';
}

function start() {
    closeModal();
    clearInterval(timer);
    countdown = 20;
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
    clearInterval(timer);
    countdown = 20;
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
    hitCount = 0;
    updateScore();
}

restartButton.addEventListener('click', restart);
const scores = JSON.parse(localStorage.getItem('scores')) || [];

function endGame() {
    const newScore = { date: new Date().toString(), hits: hitCount, percentage: (hitCount / 120) * 100 };
    scores.push(newScore);
    updateScoreboard();

    clearInterval(timer);

    let gameMusic = document.getElementById('game-music');
    gameMusic.pause();

    hitCount = 0;
    wordInput.disabled = true;

    openGameOverDialog();
}

document.getElementById('scoreboard').addEventListener('click', openScoreboard);

document.getElementById('start-again').addEventListener('click', function () {
    closeDialog('gameOverDialog');
    start();
    hitCount = 0;
    updateScore();
    wordInput.disabled = false;
});

document.getElementById('close-scoreboard').addEventListener('click', function () {
    closeDialog('scoreboardDialog');
});

window.onload = function () {
    modal.style.display = 'block';
    modal.removeAttribute('aria-hidden');
};



function updateScoreboard() {
    scores.sort((a, b) => b.hits - a.hits);

    scores.splice(9);

    localStorage.setItem('scores', JSON.stringify(scores));

    const scoreboard = document.getElementById('scoreboard');
    scoreboard.innerHTML = '<h2>Top 9 Scores</h2>';
    if (scores.length > 0) {
      scores.forEach((score, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. Hits: ${score.hits}, Percentage: ${score.percentage}% - ${score.date}`;
        scoreboard.appendChild(listItem);
      });
    } else {
      scoreboard.innerHTML = '<p>No games have been played yet.</p>';
    }
}

updateScoreboard();