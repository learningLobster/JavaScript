const computerChoiceDisplay = document.getElementById('computer-choice'); // To grab an HTML element by its id.
const userChoiceDisplay = document.getElementById('user-choice'); // To grab an HTML element by its id.
const resultDisplay = document.getElementById('result'); // To grab an HTML element by its id.
const possibleChoices = document.querySelectorAll('button'); // Grabs all the CSS elements(p, classes, ids, and all other 'balises HTML.' ).

let userChoice // What can I rename this variable??
let computerChoice // What can I rename this variable??
let result;

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => { // click is the type of event and the rest is the function, all the rest.
    userChoice = e.target.id // Selects the id of the event target. The element on which the click is triggered.
    userChoiceDisplay.innerHTML = userChoice // innerHTML retrieves the element element within the id or the tag.
    generarateComputerChoice()
    getResult()
}))

function generarateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * possibleChoices.length) +1 ; // what does this mean?? And remember, length is not a function. Why the +1?
    // console.log(randomNumber);

    if (randomNumber ===1) {
        computerChoice = 'rock';
    }
    else if (randomNumber === 2) {
        computerChoice = 'scissors';
    }
    else{ computerChoice = 'paper';}

    computerChoiceDisplay.innerHTML = computerChoice;
}

function getResult(){
    if (computerChoice === userChoice) {
        result = 'it\'s a draw';
    }
    else if (computerChoice ==='rock' && userChoice === 'paper') {
        result = 'Player Won!'
    }
    else if (computerChoice ==='rock' && userChoice === 'scissors') {
        result = 'Player lost!'
    }
    else if (computerChoice ==='paper' && userChoice === 'scissors') {
        result = 'Player Won!'
    }
    else if (computerChoice ==='paper' && userChoice === 'rock') {
        result = 'Player lost!'
    }
    else if (computerChoice === 'scissors' && userChoice === 'rock') {
        result = 'Player Won!'
    }
    else { result = 'Player lost!' }

    resultDisplay.innerHTML = result;
}
