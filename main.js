const startBtn = document.getElementById("start-button");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");

startBtn.addEventListener("click", () => {
    startScreen.classList.remove("show");
    setTimeout(() => {
        startScreen.style.display = "none";
        gameScreen.classList.remove("hidden");
    }, 400);
});




// const canvas = document.getElementById("game");
// const ctx = canvas.getContext("2d");

// const scoreEl = document.getElementById("score");
// const bestEl = document.getElementById("best");
// const overlay = document.getElementById("overlay");
// const statusEl = document.getElementById("status");
// const finalScoreEl = document.getElementById("finalScore");
// const restartBtn = document.getElementById("restart");

// const state = {
//   running: false,
//   score: 0,
//   best: 0,
//   speed: 2.2,
//   spawnTimer: 0,
//   spawnInterval: 900,
//   lastTime: 0,
// };

// const player = {
//   width: 42,
//   height: 42,
//   x: canvas.width / 2 - 21,
//   y: canvas.height - 70,
//   speed: 6,
// };

// const obstacles = [];
// const keys = new Set();

// function resetGame() {
//   state.running = true;
//   state.score = 0;
//   state.speed = 2.2;
//   state.spawnTimer = 0;
//   state.spawnInterval = 900;
//   state.lastTime = performance.now();
//   obstacles.length = 0;
//   player.x = canvas.width / 2 - player.width / 2;
//   overlay.classList.add("hidden");
//   statusEl.textContent = "Go!";
//   finalScoreEl.textContent = "Score: 0";
// }

// function spawnObstacle() {
//   const size = 28 + Math.random() * 28;
//   const x = Math.random() * (canvas.width - size);
//   obstacles.push({ x, y: -size, size });
// }

// function update(delta) {
//   state.spawnTimer += delta;
//   if (state.spawnTimer >= state.spawnInterval) {
//     state.spawnTimer = 0;
//     spawnObstacle();
//   }

//   state.speed += delta * 0.00015;
//   state.spawnInterval = Math.max(380, 900 - state.score * 4);

//   if (keys.has("ArrowLeft") || keys.has("a") || keys.has("A")) {
//     player.x -= player.speed;
//   }
//   if (keys.has("ArrowRight") || keys.has("d") || keys.has("D")) {
//     player.x += player.speed;
//   }

//   player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));

//   for (let i = obstacles.length - 1; i >= 0; i -= 1) {
//     const obs = obstacles[i];
//     obs.y += state.speed * (delta / 16.67);

//     if (obs.y > canvas.height + obs.size) {
//       obstacles.splice(i, 1);
//       state.score += 1;
//       continue;
//     }

//     if (checkCollision(player, obs)) {
//       endGame();
//       break;
//     }
//   }
// }

// function checkCollision(a, b) {
//   return (
//     a.x < b.x + b.size &&
//     a.x + a.width > b.x &&
//     a.y < b.y + b.size &&
//     a.y + a.height > b.y
//   );
// }

// function endGame() {
//   state.running = false;
//   state.best = Math.max(state.best, state.score);
//   bestEl.textContent = state.best;
//   statusEl.textContent = "Game Over";
//   finalScoreEl.textContent = `Score: ${state.score}`;
//   overlay.classList.remove("hidden");
// }

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   ctx.fillStyle = "#38bdf8";
//   ctx.fillRect(player.x, player.y, player.width, player.height);

//   ctx.fillStyle = "#f97316";
//   obstacles.forEach((obs) => {
//     ctx.fillRect(obs.x, obs.y, obs.size, obs.size);
//   });

//   ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
//   for (let i = 0; i < 12; i += 1) {
//     ctx.fillRect(i * 40 + 6, (i * 70) % canvas.height, 2, 60);
//   }
// }

// function loop(timestamp) {
//   if (!state.running) {
//     draw();
//     return;
//   }

//   const delta = timestamp - state.lastTime;
//   state.lastTime = timestamp;

//   update(delta);
//   draw();

//   scoreEl.textContent = state.score;

//   requestAnimationFrame(loop);
// }

// window.addEventListener("keydown", (event) => {
//   keys.add(event.key);
//   if (!state.running && event.code === "Space") {
//     resetGame();
//     requestAnimationFrame(loop);
//   }
// });

// window.addEventListener("keyup", (event) => {
//   keys.delete(event.key);
// });

// restartBtn.addEventListener("click", () => {
//   resetGame();
//   requestAnimationFrame(loop);
// });

// resetGame();
// requestAnimationFrame(loop);
