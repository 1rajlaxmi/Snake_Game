let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('../music/food.mp3');
const gameOver = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio('../music/music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let sArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };

//Game function
function main(ctime) {
    musicSound.play();
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //snake body collide
    for (let i = 1; i < sArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //collied into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

function gameEngine() {
    //Update snake array and food
    if (isCollide(sArr)) {
        gameOver.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over!! Press any key to play again");
        sArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }

    //change food direction
    if (sArr[0].y === food.y && sArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hscoreval) {
            hscoreval = score;
            localStorage.setItem("hscore", JSON.stringify(hscoreval));
            HscoreBox.innerHTML = "High Score :" + hscoreval;
        }
        scoreBox.innerHTML = "Score :" + score;
        sArr.unshift({ x: sArr[0].x + inputDir.x, y: sArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };//display food in random order
    }

    //Move the snake
    for (let i = sArr.length - 2; i >= 0; i--) {
        sArr[i + 1] = { ...sArr[i] };
    }
    sArr[0].x += inputDir.x;
    sArr[0].y += inputDir.y;

    //dispaly snake and food
    board.innerHTML = "";
    sArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('shead');
        }
        else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}




//Game logic
musicSound.play();
let hscore = localStorage.getItem("hscore");
if (hscore === null) {
     hscoreval = 0;
    localStorage.setItem("hscore", JSON.stringify(hscoreval));
}
else {
    hscoreval = JSON.parse(hscore);
    HscoreBox.innerHTML = "High Score :" + hscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } //start game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;

            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;


            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;


            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});