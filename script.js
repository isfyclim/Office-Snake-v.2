
const c=document.getElementById("game"),x=c.getContext("2d"),g=20,n=25;
let s,f,dx,dy,score,spd=120,t;
let paused=false;
const foods=[["☕",5],["🍩",10],["⌨️",15],["📄",20]];
let hi=+localStorage.officeSnakeHigh||0;
high.textContent=hi;
function newFood(){let a=foods[Math.floor(Math.random()*foods.length)];f={x:Math.floor(Math.random()*n),y:Math.floor(Math.random()*n),e:a[0],p:a[1]}}
function reset(){

    paused=false;

    s=[{x:10,y:10}];

    dx=1;
    dy=0;

    score=0;

    scoreEl();

    spd=120;

    newFood();

    clearInterval(t);

    t=setInterval(draw,spd);

}
function scoreEl(){document.getElementById("score").textContent=score;document.getElementById("high").textContent=hi}
onkeydown=e=>{

    // ENTER = Pause / Resume
    if(e.key==="Enter"){

        paused=!paused;

        return;

    }

    // SPACE = Restart
    if(e.code==="Space"){

        reset();

        return;

    }

    // Don't allow movement while paused
    if(paused){

        return;

    }

    let k=e.key.toLowerCase();

    // UP
    if(k==="arrowup" || k==="w"){

        if(dy!==1){

            dx=0;
            dy=-1;

        }

    }

    // DOWN
    if(k==="arrowdown" || k==="s"){

        if(dy!==-1){

            dx=0;
            dy=1;

        }

    }

    // LEFT
    if(k==="arrowleft" || k==="a"){

        if(dx!==1){

            dx=-1;
            dy=0;

        }

    }

    // RIGHT
    if(k==="arrowright" || k==="d"){

        if(dx!==-1){

            dx=1;
            dy=0;

        }

    }

}
function hit(h){return s.slice(1).some(p=>p.x==h.x&&p.y==h.y)}
function draw(){

    if(paused){

    x.fillStyle="#111";
    x.fillRect(0,0,500,500);

    x.fillStyle="white";
    x.font="40px Arial";
    x.textAlign="center";

    x.fillText(
        "⏸ PAUSED",
        250,
        230
    );

    x.font="18px Arial";

    x.fillText(
        "Press ENTER to resume",
        250,
        270
    );

    x.textAlign="left";

    return;

}

    x.fillStyle="#111";
    x.fillRect(0,0,500,500);x.font="18px Arial";x.fillText(f.e,f.x*g+1,f.y*g+17);s.forEach((p,i)=>{x.fillStyle=i?"#8bc34a":"#4caf50";x.fillRect(p.x*g,p.y*g,18,18)});let h={x:s[0].x+dx,y:s[0].y+dy};if(h.x<0||h.y<0||h.x>=n||h.y>=n||hit(h)){clearInterval(t);x.fillStyle="red";x.font="30px Arial";x.fillText("GAME OVER",150,250);return;}s.unshift(h);if(h.x==f.x&&h.y==f.y){score+=f.p;if(score>hi){hi=score;localStorage.officeSnakeHigh=hi}scoreEl();newFood();spd=Math.max(45,spd-2);clearInterval(t);t=setInterval(draw,spd)}else s.pop();}
reset();
