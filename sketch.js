var bg,bgI;
var shooter,shooterI,shooterI1;
var zombieI,zombieG;
var heart1,heart2,heart3;
var heart1I,heart2I,heart3I;
var bullets = 80;
var bulletG;
var bullet;
var gameState = "fight";
var life = 3;
var Score = 0;

function preload(){
    bgI = loadImage("assets/bg.jpeg");
    shooterI = loadImage("assets/shooter_2.png");
    shooterI1 = loadImage("assets/shooter_3.png");
    zombieI = loadImage("assets/zombie.png");
    heart1I = loadImage("assets/heart_1.png");
    heart2I = loadImage("assets/heart_2.png");
    heart3I = loadImage("assets/heart_3.png");
    
    
}

function setup(){
    createCanvas(windowWidth,windowHeight);

    zombieG = new Group();
    bulletG = new Group();


    bg = createSprite(displayWidth/2-20,displayHeight/2-40,10,10);
    bg.addImage(bgI);
    bg.scale = 1.2;

    shooter = createSprite(displayWidth-1150,displayHeight-300,10,10);
    shooter.addImage(shooterI);
    shooter.scale = 0.5;
    shooter.debug = false;
    shooter.setCollider ("rectangle",0,0,200,450);

    heart1 = createSprite(displayWidth-150,50,10,10);
    heart1.addImage(heart1I);
    heart1.scale = 0.3;

    heart2 = createSprite(displayWidth-120,50,10,10);
    heart2.addImage(heart2I);
    heart2.scale = 0.3;

    heart3 = createSprite(displayWidth-150,50,10,10);
    heart3.addImage(heart3I);
    heart3.scale = 0.3;
}

function draw(){
   background(0);
   
   if(gameState === "fight"){

     if(life === 3){
         heart1.visible = false;
         heart2.visible = false;
         heart3.visible = true;
     }

     if(life === 2){
        heart1.visible = false;
        heart2.visible = true;
        heart3.visible = false;
     }

     if(life === 1){
        heart1.visible = true;
        heart2.visible = false;
        heart3.visible = false;
     }

     if(life === 0){
         gameState = "lose";
         heart1.visible = false;
     }
     
     if(Score === 100){
         gameState = "win";
     }

     if(keyDown("UP_ARROW")){
         shooter.y = shooter.y-4;
     }

     if(keyDown("DOWN_ARROW")){
        shooter.y = shooter.y+4;
    }

     if(keyWentDown("space")){
         shooter.addImage(shooterI1);
         bullet = createSprite(displayWidth-1150,shooter.y -30,30,10);
         bullet.velocityX = 12;
         bulletG.add(bullet);
         shooter.depth = bullet.depth;
         shooter.depth = shooter.depth+2;
         bullets = bullets - 1;
     }

     else if(keyWentUp("space")){
         shooter.addImage(shooterI);
     }
     
     if(bullets === 0){
         gameState = "bullet";
     }

     if(zombieG.isTouching(bulletG)){
         for(var m = 0; m<zombieG.length; m++){
             if(zombieG[m].isTouching(bulletG)){
                 zombieG[m].destroy();
                 bulletG.destroyEach();
                 Score = Score + 2;
             }
         }
     }
     if(zombieG.isTouching(shooter)){
         for(var i = 0; i<zombieG.length; i++){
             if(zombieG[i].isTouching(shooter)){
                 zombieG[i].destroy();
                 life = life - 1;
             }
         }
     }

     spawnZombie()
    }
    drawSprites();

    textSize(20);
    fill("blue");
    text("Bullets: " + bullets,displayWidth-210,displayHeight/2-250);
    text("Score: " + Score,displayWidth-200,displayHeight/2-220);
    text("Lives: " + life,displayWidth-200,displayHeight/2-280);

    if(gameState === "lose"){
        textSize(100);
        fill("red");
        text("Better luck next time...",400,400);
        zombieG.destroyEach();
        shooter.destroy();
    }

    else if(gameState === "win"){
        textSize(100);
        fill("green");

        text("'Congratulations!!! YOU WIN...'",400,400);
        zombieG.destroyEach();
        shooter.destroy();
    }

    else if(gameState === "bullet"){
        textSize(100);
        fill("red");
        text("You ran out of bullets",400,400);
        zombieG.destroyEach();
        shooter.destroy();
        bulletG.destroyEach();
    }
}

function spawnZombie(){
   if(frameCount % 50 === 0){
    var zombie = createSprite(random(800,1600),random(100,700),10,10);
    zombie.addImage(zombieI);
    zombie.velocityX = -(4 + 3*Score/20);
    zombie.lifetime = -1;
    zombie.scale = 0.2;
    zombieG.add(zombie);

}}
