const NUMOFBLOCKS = 81;
let frogIndex; // Player current position.
// let lastPos; // Player last position.

for (let i=0; i < NUMOFBLOCKS; i++) {
    newDiv = document.createElement('div');
    // Ending block.
    if (i == 4){
        newDiv.classList.add('ending-block');
    }
    // 18 - 27
    if (i >= 18 && i <= 26){
        newDiv.classList.add('log-left');
    }
    // 28 - 36
    if (i > 26 && i <= 35){ // 26 bc of `>` instead of `>=`
        newDiv.classList.add('log-right');
    }
    // 45 - 54
    if (i >= 45 && i <= 53){
        newDiv.classList.add('car-left');
    }
    // 55 - 63
    if (i >= 54 && i <= 62){
        newDiv.classList.add('car-right');
    }
    // Starting block.
    if (i == (NUMOFBLOCKS-5)){
        newDiv.classList.add('starting-block');
        frogIndex = i;
    }
    document.querySelector('.grid').appendChild(newDiv);

}



let timeLeft = document.querySelector('#time-left');
let result = document.querySelector('#result');
let button = document.querySelector('#start-pause-button');
/* querySelector works the same as a CSS selector. */
const squares = document.querySelectorAll('.grid div'); // returns a list
// console.log(squares.length)

function moveFrog(e) {
    // console.log(e);
    // lastPos = frogIndex
    //  && lastPos <= NUMOFBLOCKS
    // Search for the equivalent of in range().
    // if (frogIndex < NUMOFBLOCKS && frogIndex >= 10) { // Prevents us from moving past the end of the grid.
        if (squares[frogIndex].classList.contains('frog')){
            squares[frogIndex].classList.remove('frog');
        }
        switch(e.key){
            case 'ArrowLeft':
                frogIndex--;
                break;
            case 'ArrowRight':
                frogIndex++
                break;
            // 9 bc the grid is 9x9.
            case 'ArrowUp':
                if (frogIndex >= NUMOFBLOCKS/9) frogIndex -= 9;
                break;
            case 'ArrowDown':
                if (frogIndex < NUMOFBLOCKS-9) frogIndex += 9;
                break;
        }
        // if (squares[lastPos].classList.contains('frog')){
        //     squares[lastPos].classList.remove('frog');
        // }
        console.log(frogIndex < NUMOFBLOCKS);
        squares[frogIndex].classList.add('frog');
    // } else {
    //     console.log('You are getting on my nerves');
    // }
}
squares[frogIndex].classList.add('frog');
document.addEventListener('keydown', moveFrog);
