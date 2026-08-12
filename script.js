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


// =========================
// OFFICE FOOD
// =========================

const foods = [
    ["☕", 5],
    ["🍩", 10],
    ["⌨️", 15],
    ["📄", 20]
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
        Math.floor(Math.random() * foods.length)
    ];

    f = {

        x: Math.floor(Math.random() * n),

        y: Math.floor(Math.random() * n),

        e: a[0],

        p: a[1]

    };

}


// =========================
// RESET / RESTART GAME
// =========================

function reset() {

    paused = false;

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

    clearInterval(t);

    t = setInterval(draw, spd);

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

        paused = !paused;

        return;

    }


    // =====================
    // SPACE = RESTART
    // =====================

    if (e.code === "Space") {

        reset();

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

    x.font = "18px Arial";

    x.fillText(
        f.e,
        f.x * g + 1,
        f.y * g + 17
    );


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


        // ===================
        // REMOVE TAIL
        // ===================

        s.pop();

    }

}


// =========================
// START GAME
// =========================

reset();
