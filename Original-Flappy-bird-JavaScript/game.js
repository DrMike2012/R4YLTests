// SELECT CVS
const cvs = document.getElementById("bird");
const ctx = cvs.getContext("2d");

// GAME VARS AND CONSTS
let frames = 0;
const DEGREE = Math.PI/180;

// LOAD SPRITE IMAGE
const sprite = new Image();
sprite.src = "img/sprite.png";

//LOAD RABBIT IMAGE
const rabbit = new Image();
rabbit.src = "img/rabbit_up.png";  //does not load

// LOAD SOUNDS
const SCORE_S = new Audio();
SCORE_S.src = "audio/sfx_point.wav";

const FLAP = new Audio();
FLAP.src = "audio/sfx_flap.wav";

const HIT = new Audio();
HIT.src = "audio/sfx_hit.wav";

const SWOOSHING = new Audio();
SWOOSHING.src = "audio/sfx_swooshing.wav";

const DIE = new Audio();
DIE.src = "audio/sfx_die.wav";

// GAME STATE
const state = {
    current : 0,
    getReady : 0,
    game : 1,
    over : 2
}

// START BUTTON COORD
const startBtn = {
    x : 120,
    y : 263,
    w : 83,
    h : 29
}

// CONTROL THE GAME -- this detects user clicks - calls the reset methods for all objects to create movement, scoring, etc
cvs.addEventListener("click", function(evt){
    switch(state.current){
        case state.getReady:
            state.current = state.game;
            SWOOSHING.play();  //play sounds
            break;
        case state.game:
            if(bird.y - bird.radius <= 0) return;  //if the bird goes below the scr
           if(bird.y>50){
            bird.flap();  //go up
           }
           else {
            bird.gravit(); //go down
           }
            FLAP.play();
            break;
        case state.over:
            let rect = cvs.getBoundingClientRect();
            let clickX = evt.clientX - rect.left;
            let clickY = evt.clientY - rect.top;
            
            // CHECK IF WE CLICK ON THE START BUTTON
            if(clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h){
                pipes.reset();
                bird.speedReset();
                score.reset();
                state.current = state.getReady;
            }
            break;
    }
});

// BACKGROUND
const bg = {
    sX :0,
    sY : 0,
    w : 275,
    h : 226,
    x : 0,
    y : cvs.height - 226,
    
    draw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }
    
}
// NEW IMAGE
// const testImage = {
//     sX: 276,
//     sY: 0,
//     w: 10,
//     h: 10,  //height of brown rectangle at bottom of screen
//     x: 200,  //i think starting position (far left) for brown rectangle
//     y: cvs.height - 112,
//     dx : 2,    
//     draw : function(){
//        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        
//        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
//     },  
//     update: function(){
//         if(state.current == state.game){
//             this.x = (this.x - this.dx)%(this.w/4);
//         }
//     }
// }

// FOREGROUND
const fg = {
    sX: 20,
    sY: 20,
    w: 20,
    h: 20,  //height of brown rectangle at bottom of screen
    x: 50,  //i think starting position (far left) for brown rectangle
    y: 50,
    dx : 2,    
    draw : function(){
    //     ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    //     ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    },  
    update: function(){
        if(state.current == state.game){
            this.x = (this.x - this.dx)%(this.w/4);
            this.y = (this.y);
        }
    }
}
// BIRD / RABBIT
const bird = {
    animation : [  // changes sprite to four different pictures to simulate motion
        {sX: 276, sY : 112},
        {sX: 276, sY : 139},
        {sX: 276, sY : 164},
        {sX: 276, sY : 139}
    ],
    x : 50,
    y : 150,  //changed to 150 - jump - 1 >> did not work.  screen went completely white
    w : 34,
    h : 26,
    
    radius : 12,
    frame : 0,
    gravity : 0.0025,  //changed to 0 gravity from .25  - bird flies UP off the screen
    jump : .001, //changed jump from 4.6 to .1  - bird goes SLOWLY up off the screen -- clicking does NOT change bird
    speed : 0,
    rotation : 0,
    UPSPEED : .15,
    
    
    draw : function(){
        let bird = this.animation[this.frame];
        
        ctx.save();
        ctx.translate(this.x, this.y);
     //   ctx.rotate(this.rotation);  //rotates up and down for direction of flight
      //  ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h,- this.w/2, - this.h/2, this.w, this.h);  
        ctx.drawImage(rabbit, this.w, this.h );  //draws the rabbit
        ctx.restore();
        
    },
    gravit : function(){            //newly created function intended to cause bird to decrease altitude on click based on Y position
        this.speed += this.UPSPEED;
         this.jump += this.UPSPEED;  //this.jump += 1;  
    },
    flap : function(){  //NOTE -  flap() IS NOT inside update function.  only occurs on user mouse click
      this.speed = -this.UPSPEED;
      this.jump -= this.UPSPEED;  //this.jump -= 1;// flap happens on click - more clicks = more speed  // 
    },     // changed - this jump to + this jump - nothing changed
    
    update: function(){
        // IF THE GAME STATE IS GET READY STATE, THE BIRD MUST FLAP SLOWLY - THIS ALL MAKES THE BIRD APPEAR TO FLAP ITS WINGS - NOT NEEDED
//deleted
        if(state.current == state.getReady){

        }
        else{
            this.speed += this.gravity;       //updates the current speed
            this.y += this.speed;             //moves bird up or down based on current speed
            
            // if(this.y + this.h/2 >= cvs.height - fg.h){
            //     this.y = cvs.height - fg.h - this.h/2;
            // }
        }  
    }// deleted comma
    // speedReset : function(){  //updates the speed to 0 when game begins
    //     this.speed = 0;
    // }
}

// GET READY MESSAGE
const getReady = {
    sX : 0,
    sY : 228,
    w : 173,
    h : 152,
    x : cvs.width/2 - 173/2,
    y : 80,
    
    draw: function(){
        if(state.current == state.getReady){
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
    
}

// PIPES -- deleted 100 lines of pipes code

// SCORE
const score= {
    best : parseInt(localStorage.getItem("best")) || 0,
    value : 0,
    
    draw : function(){
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#000";
        
        if(state.current == state.game){
            ctx.lineWidth = 2;
            ctx.font = "35px Teko";
            ctx.fillText(this.value, cvs.width/2, 50);
            ctx.strokeText(this.value, cvs.width/2, 50);
            
        }else if(state.current == state.over){
            // SCORE VALUE
            ctx.font = "25px Teko";
            ctx.fillText(this.value, 225, 186);
            ctx.strokeText(this.value, 225, 186);
            // BEST SCORE
            ctx.fillText(this.best, 225, 228);
            ctx.strokeText(this.best, 225, 228);
        }
    },  
    reset : function(){
        this.value = 0;
    }
}
// GAME OVER MESSAGE
const gameOver = {
    sX : 175,
    sY : 228,
    w : 225,
    h : 202,
    x : cvs.width/2 - 225/2,
    y : 90,
    
    draw: function(){
        if(state.current == state.over){
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);   
        }
    }
    
}

// DRAW
function draw(){
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    
    bg.draw();
  //  pipes.draw();
    fg.draw();
    bird.draw();
    getReady.draw();
    gameOver.draw();
    score.draw();
}

// UPDATE
function update(){
    bird.update();  //bird includes the gravity increment, but not flap().  flap only occurs on click.  so gravity grows continuously
    fg.update();
  //  pipes.update();
}

// LOOP
function loop(){  //these loops are themselves getting looped
    update();  
    draw();
    frames++;
    
    requestAnimationFrame(loop);
}
loop();
