// DOM elements
const startBtn = document.getElementById("start-button");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");

// game over elements
const gameOverScreen = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restart-button");
const playericon = new Image();
playericon.src = "rocket_icon.svg";
// let isPaused = false;   ignore ::::


// start button event listener
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

// Player object
const player = {
    width: 50,
    height: 50,
    x: canvas.width / 2 - 20,
    y: canvas.height - 70,
    radius: 19
};

const obstacle= [];


let score = 0;
let bestsc=0;
let gameOver = false;
let speed = 2;
let spawn=0.02;
// Collision detection
function collision(a, b) {
    const aCenterX = a.x + a.width / 2;
    const aCenterY = a.y + a.height / 2;
    const bCenterX = b.x + b.size / 2;
    const bCenterY = b.y + b.size / 2;
    const dist = Math.sqrt((aCenterX - bCenterX) ** 2 + (aCenterY - bCenterY) ** 2);
    return dist < (a.radius + b.size / 2);
}
// Spawn obstacles
function spawnObstacle() {
    const size=20+Math.random()*20;
    const x=Math.random()*(canvas.width-size);
    obstacle.push({x, y:-size, size});
}

const savebest=localStorage.getItem("bestscore");
if(savebest){
    bestsc=Number(savebest);
    document.getElementById("bestsc").textContent = bestsc;
}

const key=new Set();

window.addEventListener("keydown", (event) => {
    key.add(event.key);
});
window.addEventListener("keyup", (event) => {
    key.delete(event.key);
});

// Star bg
const star=Array.from({length:100}, () => ({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    size: Math.random()*2+1,
    speed: speed*Math.random()*0.5+0.5
}));

let animationId;

// Draw player
function Player() {
    context.drawImage(playericon, player.x, player.y, player.width, player.height);
}

// Main game loop
function loop() {
    document.getElementById("score").textContent = score;
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0; i<star.length; i++) {
        const s=star[i];
        s.y+=s.speed;
        if(s.y > canvas.height) s.y=0;
        context.fillStyle= "white";
        context.fillRect(s.x, s.y, s.size, s.size);
    }
    if(gameOver) {
        for(let i=0; i<obstacle.length; i++) {
            const obs=obstacle[i];
            context.fillStyle = "#f97316";
            context.fillRect(obs.x, obs.y, obs.size, obs.size);
        }
            Player();
            animationId = requestAnimationFrame(loop);
            return;
    }

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
                let tmp = bestsc;  
                bestsc = Math.max(bestsc, score);
                document.getElementById("bestsc").textContent = bestsc;
                if(score > tmp){
                    finalScore.innerHTML = score + "<br><br>🎉 New High Score!!!<br>";
                }
                else{
                    finalScore.textContent = score;
                }
                gameOverScreen.classList.remove("hidden");
                localStorage.setItem("bestscore", bestsc);
                console.log("Game Over Bro!!! Your score is : " + score);
            }
        }
    }


    Player();
    
    speed = Math.min(5, 2 + score * 0.1);
    spawn = Math.min(0.035, 0.02 + score * 0.02);
    
    animationId = requestAnimationFrame(loop);


    

    
}

// Start the game loop
function start() {
    cancelAnimationFrame(animationId);
    loop();
}

// restart button listener
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

// Autostart from about page
const params = new URLSearchParams(window.location.search);
if (params.get('autostart') === 'true') {
    setTimeout(() => startBtn.click(), 0);
}