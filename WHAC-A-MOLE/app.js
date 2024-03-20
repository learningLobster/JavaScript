const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.square');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let result = 0;
let hitPosition;
let currentTime = 60;
let timerID = null;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole'); // What the hell is that?
    });

    let randomPosition = squares[Math.floor(Math.random() * 9)]; // What the hell is this?
    randomPosition.classList.add('mole'); // What the hell is?

    hitPosition = randomPosition.id // HTML id.
}

squares.forEach(square => { // This syntax is killing me.
    square.addEventListener('mousedown', () => {
        if (square.id === hitPosition){
            result++;
            score.textContent = result; // Same as inner HTML.
            hitPosition = null;
        }
    })
})

function moveMole(){ // Make the moll move randomly.
    timerID = setInterval(randomSquare, 500);
}

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    if (currentTime == 0) {
        clearInterval(countDownTimerID);
        clearInterval(timerID);
        alert("Game Over!! Your final score is: " + result);
    }
}

let countDownTimerID = setInterval(countDown, 1500);

moveMole();

