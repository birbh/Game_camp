const startBtn = document.getElementById("start-button");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");

const gameOverScreen = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restart-button");


startBtn.addEventListener("click", () => {
    startScreen.classList.remove("show");
    setTimeout(() => {
        startScreen.style.display = "none";
        gameScreen.classList.remove("hidden");
        start();
    }, 400);
});

const canvas = document.getElementById("game-canvas");
const context= canvas.getContext("2d");


const player = {
    width: 40,
    height: 40,
    x: canvas.width / 2 - 20,
    y: canvas.height - 60,
};

const obstacle= [];

let score = 0;
let gameOver = false;
let speed = 2;
let spawn=0.02;
function collision(a, b) {
    return (
        a.x < b.x + b.size &&
        a.x + a.width > b.x &&
        a.y < b.y + b.size &&
        a.y + a.height > b.y
    );
}

function spawnObstacle() {
    const size=20+Math.random()*20;
    const x=Math.random()*(canvas.width-size);
    obstacle.push({x, y:-size, size});
}

const key=new Set();

window.addEventListener("keydown", (event) => {
    key.add(event.key);
});
window.addEventListener("keyup", (event) => {
    key.delete(event.key);
});


let animationId;

function Player() {
    context.fillStyle = "#ff000dd3";
    context.fillRect(player.x, player.y, player.width, player.height);
}
function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (Math.random() < spawn) {
        spawnObstacle();
    }
    if (key.has("ArrowLeft") || key.has("a") || key.has("A")) {
        player.x -= 5;
    }
    if (key.has("ArrowRight") || key.has("d") || key.has("D")) {
        player.x += 5;
    }
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));

    for(let i=obstacle.length-1; i>=0; i--) {
        const obs=obstacle[i];
        obs.y += speed;

        if (obs.y > canvas.height + obs.size) {
            obstacle.splice(i, 1);
            if(!gameOver) score++;
        }
        else{
            context.fillStyle = "#f97316";
            context.fillRect(obs.x, obs.y, obs.size, obs.size);
            
            if(!gameOver && collision(player, obs)) {
                gameOver = true;    
                finalScore.textContent = score;
                gameOverScreen.classList.remove("hidden");
                console.log("Game Over Bro!!! Your score is : " + score);
            }
        }
    }

    context.fillStyle = "#e2e8f0";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 30);

    Player();
    
    speed = Math.min(5, 2 + score * 0.02);
    spawn = Math.min(0.035, 0.02 + score * 0.002);
    
    animationId = requestAnimationFrame(loop);


    

    
}

function start() {
    cancelAnimationFrame(animationId);
    loop();
}

restartBtn.addEventListener("click", () => {
    gameOver = false;
    score = 0;
    speed = 2;
    spawn = 0.02;
    obstacle.length = 0;
    player.x = canvas.width / 2 - 20;
    gameOverScreen.classList.add("hidden");
    start();
});