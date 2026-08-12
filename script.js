const c = document.getElementById("game");
const x = c.getContext("2d");

const g = 20;
const n = 25;

let s;
let f;
let dx;
let dy;
let score;
let spd = 120;
let t;

let paused = false;
let started = false;

let foodMessage = "";
let messageTimer = 0;


// =========================
// OFFICE FOOD
// =========================

const foods = [

    {
        emoji: "☕",
        points: 5,
        type: "normal",
        message: "Kape mo diha +5!"
    },

    {
        emoji: "🍩",
        points: 10,
        type: "normal",
        message: "Kaon diay kag donut?"
    },

    {
        emoji: "⌨️",
        points: 15,
        type: "normal",
        message: "Ctrl+C Ctrl+V champion diay ka?"
    },

    {
        emoji: "📄",
        points: 20,
        type: "normal",
        message: "Pag take ug notes ehh!"
    },

    {
        emoji: "⚡",
        points: 30,
        type: "fast",
        message: "NA KURENTEHAN ANG BITIN!"
    },

    {
        emoji: "🥱",
        points: 5,
        type: "slow",
        message: "DUKAAA YARN!?!?"
    }

];


// =========================
// HIGH SCORE
// =========================

let hi = +localStorage.officeSnakeHigh || 0;

document.getElementById("high").textContent = hi;


// =========================
// CREATE FOOD
// =========================

function newFood() {

    let a = foods[
        Math.floor(
            Math.random() * foods.length
        )
    ];

    f = {

        x: Math.floor(
            Math.random() * n
        ),

        y: Math.floor(
            Math.random() * n
        ),

        e: a.emoji,

        p: a.points,

        type: a.type,

        message: a.message

    };

}


// =========================
// RESET / RESTART GAME
// =========================

function reset() {

    paused = false;

    foodMessage = "";
    messageTimer = 0;
    
    s = [
        {
            x: 10,
            y: 10
        }
    ];

    dx = 1;
    dy = 0;

    score = 0;

    scoreEl();

    spd = 120;

    newFood();

}


// =========================
// UPDATE SCORE DISPLAY
// =========================

function scoreEl() {

    document.getElementById("score").textContent = score;

    document.getElementById("high").textContent = hi;

}


// =========================
// KEYBOARD CONTROLS
// =========================

onkeydown = e => {


    // =====================
    // ENTER = PAUSE / RESUME
    // =====================

    if (e.key === "Enter") {

    // START GAME
    if (!started) {

        started = true;

        reset();

        clearInterval(t);

        t = setInterval(draw, spd);

        return;

    }

    // PAUSE / RESUME
    paused = !paused;

    return;

}


    // =====================
    // SPACE = RESTART
    // =====================

    if (e.code === "Space") {

    if (started) {

        reset();

        clearInterval(t);

        t = setInterval(draw, spd);

    }

    return;

}


    // =====================
    // DON'T MOVE WHILE PAUSED
    // =====================

    if (paused) {

        return;

    }


    let k = e.key.toLowerCase();


    // =====================
    // UP
    // =====================

    if (k === "arrowup" || k === "w") {

        if (dy !== 1) {

            dx = 0;

            dy = -1;

        }

    }


    // =====================
    // DOWN
    // =====================

    if (k === "arrowdown" || k === "s") {

        if (dy !== -1) {

            dx = 0;

            dy = 1;

        }

    }


    // =====================
    // LEFT
    // =====================

    if (k === "arrowleft" || k === "a") {

        if (dx !== 1) {

            dx = -1;

            dy = 0;

        }

    }


    // =====================
    // RIGHT
    // =====================

    if (k === "arrowright" || k === "d") {

        if (dx !== -1) {

            dx = 1;

            dy = 0;

        }

    }

};


// =========================
// SNAKE COLLISION
// =========================

function hit(h) {

    return s
        .slice(1)
        .some(
            p =>
                p.x === h.x &&
                p.y === h.y
        );

}


// =========================
// MAIN GAME LOOP
// =========================

function draw() {


    // =====================
    // START SCREEN
    // =====================

    if (!started) {

        x.fillStyle = "#111";

        x.fillRect(
            0,
            0,
            500,
            500
        );

        x.textAlign = "center";


        // TITLE

        x.fillStyle = "#4caf50";

        x.font = "42px Arial";

        x.fillText(
            "🐍 OFFICE SNAKE",
            250,
            140
        );


        // HIGH SCORE

        x.fillStyle = "white";

        x.font = "22px Arial";

        x.fillText(
            "🏆 High Score: " + hi,
            250,
            200
        );


        // DESCRIPTION

        x.font = "17px Arial";

        x.fillText(
            "Eat office stuff.",
            250,
            245
        );

        x.fillText(
            "Avoid yourself.",
            250,
            270
        );

        x.fillText(
            "Don't get caught slacking!",
            250,
            295
        );


        // START MESSAGE

        x.fillStyle = "#8bc34a";

        x.font = "22px Arial";

        x.fillText(
            "▶ PRESS ENTER TO START",
            250,
            365
        );


        // CONTROLS

        x.fillStyle = "#aaa";

        x.font = "15px Arial";

        x.fillText(
            "WASD / Arrow Keys to move",
            250,
            410
        );

        x.fillText(
            "ENTER = Pause",
            250,
            435
        );


        x.textAlign = "left";

        return;

    }

    // =====================
    // PAUSED SCREEN
    // =====================

    if (paused) {

        x.fillStyle = "#111";

        x.fillRect(
            0,
            0,
            500,
            500
        );


        x.fillStyle = "white";

        x.font = "40px Arial";

        x.textAlign = "center";


        x.fillText(
            "PAUSED",
            250,
            230
        );


        x.font = "18px Arial";


        x.fillText(
            "Press ENTER to resume",
            250,
            270
        );


        x.textAlign = "left";


        return;

    }


    // =====================
    // CLEAR GAME BOARD
    // =====================

    x.fillStyle = "#111";

    x.fillRect(
        0,
        0,
        500,
        500
    );


    // =====================
    // DRAW FOOD
    // =====================


    x.font = "22px Arial";

    x.textAlign = "center";

    x.fillText(
        f.e,
        f.x * g + 10,
        f.y * g + 18
    );

    x.textAlign = "left";


    // =====================
    // DRAW SNAKE
    // =====================

    s.forEach(
        (p, i) => {

            x.fillStyle =
                i
                    ? "#8bc34a"
                    : "#4caf50";

            x.fillRect(
                p.x * g,
                p.y * g,
                18,
                18
            );

        }
    );


    // =====================
    // CREATE NEW HEAD
    // =====================

    let h = {

        x: s[0].x + dx,

        y: s[0].y + dy

    };


    // =====================
    // WALL / BODY COLLISION
    // =====================

    if (

        h.x < 0 ||

        h.y < 0 ||

        h.x >= n ||

        h.y >= n ||

        hit(h)

    ) {

        clearInterval(t);


        x.fillStyle = "red";

        x.font = "30px Arial";

        x.textAlign = "center";


        x.fillText(
            "GAME OVER",
            250,
            250
        );


        x.textAlign = "left";


        return;

    }


    // =====================
    // ADD NEW HEAD
    // =====================

    s.unshift(h);


    // =====================
    // CHECK FOOD
    // =====================

    if (

        h.x === f.x &&

        h.y === f.y

    ) {


        // ===================
        // ADD FOOD POINTS
        // ===================

        score += f.p;

        foodMessage = f.message;
        messageTimer = 60;

        // =====================
        // FOOD EFFECTS
        // =====================

    if (f.type === "fast") {

        spd = Math.max(
            30,
            spd - 15
        );

    }

    if (f.type === "slow") {

        spd = Math.min(
            180,
            spd + 15
        );

    }
        
        // ===================
        // UPDATE HIGH SCORE
        // ===================

        if (score > hi) {

            hi = score;

            localStorage.officeSnakeHigh = hi;

        }


        scoreEl();


        // ===================
        // CREATE NEW FOOD
        // ===================

        newFood();


        // ===================
        // INCREASE SPEED
        // ===================

        spd = Math.max(
            45,
            spd - 2
        );


        clearInterval(t);


        t = setInterval(
            draw,
            spd
        );


    } else {

    s.pop();

}


// =====================
// FOOD MESSAGE
// =====================

if (messageTimer > 0) {

    x.textAlign = "center";

    x.font = "20px Arial";

    x.fillStyle = "white";

    x.fillText(
        foodMessage,
        250,
        40
    );

    x.textAlign = "left";

    messageTimer--;

}

}


// =========================
// START GAME
// =========================

started = false;

reset();

draw();
