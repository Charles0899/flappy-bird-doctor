var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var gameover = new Image();

bird.src = "img/tardis3.png";
bg.src = "img/bg0.png";
fg.src = "img/fg7.png";
pipeNorth.src = "img/pipeNorth.png";
pipeSouth.src = "img/pipeSouth.png";
gameover.src = "img/dalek.png";

var gap = 130;                                                                  //permet de definir l'espace entre tuyaux
var constant;

var bX = 10;                                                                    //largeur d'ou arrive tardis
var bY = 150;                                                                   //hauteur d'ou arrive tardis

var gravity = 1.5;

var score = 0;

var doctor = new Audio();                                                       //variables des audios
var scor = new Audio();

doctor.src = "doctor.mp3";                                                      //audio fond
scor.src = "exterminate.mp3";                                                   //audio score

document.addEventListener("keydown",moveUp);                                    //clic clavier
document.addEventListener("mousedown",moveUp);                                  //clic souris


function moveUp(){
    bY -= 30;                                                                   //hauteur de saut
    doctor.play();
}

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0                                                                       //position des tuyaux
};

function draw(){
    ctx.drawImage(bg,0,0);                                                      //largeur, hauteur background
doctor.play();

    for(var i = 0; i < pipe.length; i++){

        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);                           //tuyaux en haut
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);                  //tuyaux en bas

        pipe[i].x--;

        if( pipe[i].x == 100 ){                                                 //espace entre les tuyaux
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        }

        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            location.reload();
        }

        if(pipe[i].x == 5){
            score++;
            scor.play();
        }


    }

    ctx.drawImage(fg,0,cvs.height - fg.height);

    ctx.drawImage(bird,bX,bY);

    bY += gravity;

    ctx.fillStyle = "#000000";
    ctx.font = "18px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-17);

    requestAnimationFrame(draw);

}

draw();
