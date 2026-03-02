// DOM refs
const go = document.getElementById("gobtn");
const welcome = document.getElementById("welcome");
const zone = document.getElementById("zone");

// post game stuff
const deadscreen = document.getElementById("dead");
const finaltxt = document.getElementById("final");
const retry = document.getElementById("retry");
const ship = new Image();
ship.src = "rocket_icon.svg";

// hook up the start btn
go.addEventListener("click", () => {
    welcome.classList.add("hide"); // custom hide class
    setTimeout(() => {
        welcome.style.display = "none";
        zone.classList.remove("hidden");
        ignite(); // start it up
    }, 450); 
});

const view = document.getElementById("view");
const eng = view.getContext("2d");

// Player/Unit data
const unit = {
    w: 50,
    h: 50,
    x: view.width / 2 - 20,
    y: view.height - 70,
    hitbox: 19
};

const enemies = [];
let points = 0;
let toprecord = 0;
let rip = false;
let movev = 2;
let rate = 0.02;

// checking hits
function checkhit(a, b) {
    const ax = a.x + a.w / 2;
    const ay = a.y + a.h / 2;
    const bx = b.x + b.size / 2;
    const by = b.y + b.size / 2;
    return Math.sqrt((ax - bx)**2 + (ay - by)**2) < (a.hitbox + b.size / 2);
}

// spawn next block
function getenemy() {
    const s = 20 + Math.random()*20;
    const x = Math.random()*(view.width-s);
    enemies.push({x: x, y: -s, size: s});
}

// load high score from disk
const saved = localStorage.getItem("bestscore");
if(saved) {
    toprecord = Number(saved);
    document.getElementById("best").textContent = toprecord;
}

const input = new Set();
window.onkeydown = e => input.add(e.key);
window.onkeyup = e => input.delete(e.key);

// visual particles
const stars = Array.from({length: 105}, () => ({
    x: Math.random() * view.width,
    y: Math.random() * view.height,
    z: Math.random() * 2 + 1,
    v: movev * Math.random() * 0.5 + 0.5
}));

let ptr;

function drawunit() {
    eng.drawImage(ship, unit.x, unit.y, unit.w, unit.h);
}

// main execution loop
function step() {
    document.getElementById("scoreshow").textContent = points;
    eng.clearRect(0, 0, view.width, view.height);
    
    // stars moving
    for(let i=0; i<stars.length; i++) {
        const s = stars[i];
        s.y += s.v;
        if(s.y > view.height) s.y = 0;
        eng.fillStyle = "rgba(255,255,255,0.7)";
        eng.fillRect(s.x, s.y, s.z, s.z);
    }

    if(rip) {
        for(let i=0; i<enemies.length; i++) {
            const e = enemies[i];
            eng.fillStyle = "#f97316";
            eng.fillRect(e.x, e.y, e.size, e.size);
        }
        drawunit();
        ptr = requestAnimationFrame(step);
        return;
    }

    if (Math.random() < rate) getenemy();
    
    // key polling
    if (input.has("ArrowLeft") || input.has("a")) unit.x -= 5.5;
    if (input.has("ArrowRight") || input.has("d")) unit.x += 5.5;
    
    unit.x = Math.max(0, Math.min(view.width - unit.w, unit.x));

    for(let i=enemies.length-1; i>=0; i--) {
        const e = enemies[i];
        e.y += movev;

        if (e.y > view.height + e.size) {
            enemies.splice(i, 1);
            if(!rip) points++;
        } else {
            eng.fillStyle = "#f97316";
            eng.fillRect(e.x, e.y, e.size, e.size);
            
            if(!rip && checkhit(unit, e)) {
                rip = true;
                const old = toprecord;
                toprecord = Math.max(toprecord, points);
                document.getElementById("best").textContent = toprecord;
                
                if(points > old) {
                    finaltxt.innerHTML = points + "<br><br><span>NEW TOP SCORE!</span>";
                } else {
                    finaltxt.textContent = points;
                }
                deadscreen.classList.remove("hidden");
                localStorage.setItem("bestscore", toprecord);
            }
        }
    }

    drawunit();
    movev = Math.min(6, 2 + points * 0.1);
    rate = Math.min(0.04, 0.02 + points * 0.015);
    ptr = requestAnimationFrame(step);
}

function ignite() {
    cancelAnimationFrame(ptr);
    step();
}

retry.onclick = () => {
    rip = false;
    points = 0;
    movev = 2;
    rate = 0.02;
    enemies.length = 0;
    unit.x = view.width / 2 - 20;
    deadscreen.classList.add("hidden");
    ignite();
};

const q = new URLSearchParams(window.location.search);
if (q.get('autostart') === 'true') {
    window.onload = () => setTimeout(() => go.click(), 150);
}