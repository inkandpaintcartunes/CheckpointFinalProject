const menu = document.getElementById("menu");
const gameScreen = document.getElementById("gameScreen");
const gameArea = document.getElementById("gameArea");

const playBtn = document.getElementById("playBtn");
const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");

const difficulty = document.getElementById("difficulty");

const player = document.getElementById("player");

const scoreDisplay = document.getElementById("score");

const gameOverScreen = document.getElementById("gameOver");
const restartBtn = document.getElementById("restartBtn");
const finalScore = document.getElementById("finalScore");

let leftPressed=false;
let rightPressed=false;

let speed=6;

let score=0;
let animation;
let enemyInterval;

let enemies=[];

settingsPanel.style.display="none";

settingsBtn.onclick=()=>{
    settingsPanel.style.display=
        settingsPanel.style.display==="none"
        ?"block"
        :"none";
};

playBtn.onclick=startGame;
restartBtn.onclick=startGame;

document.addEventListener("keydown",(e)=>{
    if(e.key==="ArrowLeft") leftPressed=true;
    if(e.key==="ArrowRight") rightPressed=true;
});

document.addEventListener("keyup",(e)=>{
    if(e.key==="ArrowLeft") leftPressed=false;
    if(e.key==="ArrowRight") rightPressed=false;
});

function startGame(){

    menu.classList.add("hidden");
    gameOverScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    enemies.forEach(e=>e.remove());
    enemies=[];

    speed=parseInt(difficulty.value);

    score=0;
    scoreDisplay.textContent=0;

    player.style.left="175px";

    clearInterval(enemyInterval);

    enemyInterval=setInterval(createEnemy,700);

    gameLoop();
}

function createEnemy(){

    const enemy=document.createElement("div");

    enemy.className="enemy";

    enemy.style.left=Math.random()*350+"px";
    enemy.style.top="-60px";

    gameArea.appendChild(enemy);

    enemies.push(enemy);

}

function gameLoop(){

    const x=parseFloat(player.style.left);

    if(leftPressed && x>0)
        player.style.left=x-8+"px";

    if(rightPressed && x<350)
        player.style.left=x+8+"px";

    enemies.forEach((enemy,index)=>{

        enemy.style.top=(parseFloat(enemy.style.top)+speed)+"px";

        if(checkCollision(player,enemy))
            endGame();

        if(parseFloat(enemy.style.top)>700){

            enemy.remove();
            enemies.splice(index,1);

            score++;
            scoreDisplay.textContent=score;

        }

    });

    animation=requestAnimationFrame(gameLoop);

}

function checkCollision(a,b){

    const r1=a.getBoundingClientRect();
    const r2=b.getBoundingClientRect();

    return !(
        r1.right<r2.left ||
        r1.left>r2.right ||
        r1.bottom<r2.top ||
        r1.top>r2.bottom
    );

}

function endGame(){

    cancelAnimationFrame(animation);
    clearInterval(enemyInterval);

    finalScore.textContent="Score: "+score;

    gameScreen.classList.add("hidden");
    gameOverScreen.classList.remove("hidden");

}
