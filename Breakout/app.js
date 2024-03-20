const GRID = document.querySelector('.grid');
let scoreDisplay = document.querySelector('#score');
let score = 0;

  ////*****************************************////
 //// ****** Use variables for coords. ****** ////
////*****************************************////

const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;
let timerID;
let xDirection = 2;
let yDirection = 2;

const userStart = [230, 10];
let userCurrentPostion = userStart;
const ballStart = [((boardWidth/2)-10), 40];
let ballCurrentPosition = ballStart; 


// Create Block
class Block{
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

// All blocks.
const blocks = [
    // You can either make a function or a loop later.
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
    // new Block(10, 270),
    // new Block(10, 270),
    // new Block(10, 270),
    // new Block(10, 270),
    // new Block(10, 270),
    // new Block(10, 270),
    // new Block(10, 270),
    // new Block(10, 270),
    // new Block(10, 270),
    // new Block(10, 270),
    // new Block(10, 270),
    // new Block(10, 270),
    // new Block(10, 270),
]



// Draw my block
function addBlocks() {
    for (let i = 0; i < blocks.length; i++){
        const BLOCK = document.createElement('div');
        BLOCK.classList.add('block'); // Add a class to the variable which is a div.
        BLOCK.style.left = blocks[i].bottomLeft[0] + 'px'; // No, it doesn't make sense.
        BLOCK.style.bottom = blocks[i].bottomLeft[1] + 'px';
        GRID.appendChild(BLOCK);
    }
}

// Draw ball.
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
}

// Draw user.
function drawUser() {
    user.style.left = userCurrentPostion[0] + 'px';
    user.style.bottom = userCurrentPostion[1] + 'px';
}


addBlocks();

// Add user.
const user = document.createElement('div');
user.classList.add('user');
drawUser();
GRID.appendChild(user);


// Move user.
function moveUser(e) {  // e is event.
    switch (e.key) {
        case 'ArrowLeft':
            if (userCurrentPostion[0] > 10) { 
                console.log('Can move left.') 
                userCurrentPostion[0] -= 10;
                drawUser();
            }
            break;
        case 'ArrowRight':
            if (userCurrentPostion[0] < (boardWidth - blockWidth)-10) {  
                userCurrentPostion[0] += 10;
                drawUser();
            }
            break;
    }
}

document.addEventListener('keydown', moveUser);

// Add ball.
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
GRID.appendChild(ball);

// Move ball.
function moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkCollisions();
}

timerID = setInterval(moveBall, 30); // Every 30 ms, moveBall() will be called.


// Check for collisions.
function checkCollisions() {
    // Check block collision.
    for (let i=0; i<blocks.length; i++) {
        if ((ballCurrentPosition[0] > blocks[i].bottomLeft[0] && 
            ballCurrentPosition[0] < blocks[i].bottomRight[0]) && 
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && 
            ballCurrentPosition[1] < blocks[i].topLeft[1])) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block');
            blocks.splice(i, 1); // index, number of elements to delete.
            changeDirection();
            score++;
            scoreDisplay.innerHTML = score;

            // Check for win.
            if (blocks.length === 0) {
                scoreDisplay.innerHTML = "You win!";
                clearInterval(timerID);
                document.removeEventListener('keydown', moveUser);
            }
        }
    }

    // Check for user collisions.
    if (
        (ballCurrentPosition[0] > userCurrentPostion[0] && ballCurrentPosition[0] < userCurrentPostion[0] + blockWidth) &&
        (ballCurrentPosition[1] > userCurrentPostion[1] && ballCurrentPosition[1] < userCurrentPostion[1] + blockHeight)
        ) {
            changeDirection();
    }

    // Check for wall collision.
    if (
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
        ballCurrentPosition[0] <= 10
        ) {
        changeDirection();
    }

    // Check gameover.
    if (ballCurrentPosition[1] <= 0) {
        scoreDisplay.innerHTML = "";
        gameoverMessage = document.createElement('h1');
        gameoverMessage.innerHTML = "You lose!";
        scoreDisplay.appendChild(gameoverMessage);
        clearInterval(timerID);
        document.removeEventListener('keydown', moveUser);
    }

}


function changeDirection() {
    if (xDirection === 2 && yDirection === 2) { // Basically means that if the ball is moving upright: change y direction.
        yDirection = -2;
        return; // Apparently just "return" is used to stop the function running process.
    } 
    
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2;
        return;
    }

    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2;
        return;
    }

    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2;
        return;
    }


}