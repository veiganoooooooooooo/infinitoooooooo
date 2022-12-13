

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var ground, invisibleGround, groundImage;

var argola
var piso
var trex ,trex_running,trex_colide;
var n ,nng,nGroup;
var piso 
var murreu, murreuimg;
var gameoverimg, restartimg;
var jump
var check
var die
function preload(){
 

 
  trex_running = loadAnimation("sonic2.png","sonic1.png");
  trex_colide= loadAnimation("go.png")
  nng = loadImage("1.png","2.png","3.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  murreuimg = loadAnimation("go.png");
  gameoverimg = loadImage("over.png");
  restartimg = loadImage("restart.png");
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  check=loadSound("checkpoint.mp3");
}


function setup(){
  createCanvas(windowWidth,windowHeight);

  
  //crie um sprite de trex
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("colided",trex_colide);
  trex.scale = 0.2;
  piso = createSprite(width/2,height-10,999999999,2);
  argola = createSprite(1235,height-31,15,40);
  argola.shapeColor = "lightgreen";

  gameover=createSprite(621,200,50,50);
  gameover.addImage(gameoverimg);
  restart=createSprite(621,300);
  restart.addImage(restartimg);
  gameover.scale=1.6;
  restart.scale=1;
  trex.setCollider("circle",0, 0,135);
  trex.debug = false;  
  score=0;
  obstaclesGroup= createGroup();
  nGroup= createGroup();
  

}

function draw(){
  background("white");
  

  if(gameState === PLAY){
    gameover.visible=false;
    restart.visible=false;
  if (touches.length > 0 || keyDown("SPACE") && trex.y >= 150){
    trex.velocityY=-10;
    jump.play();
    touches=[]
    }
    
    
    else{
      trex.velocityX= 0;
    }
    if (keyDown("space")&& trex.y>=height-150){
      trex.velocityY=-10;
      jump.play();
    }
    if (keyDown("up")&& trex.y>=height-150){
      jump.play();
      trex.velocityY=-10;
    }
    trex.velocityY=trex.velocityY+1;
    trex.collide(piso);
    n1()

    spawnObstacles()
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
      
      die.play();
      
    }
    

  }
  else if(gameState === END){

    obstaclesGroup.destroy;
    gameover.visible=true;
    restart.visible=true;
    piso.velocityX = 0;
    trex.velocityY = 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999;
    trex.changeAnimation("colided",trex_colide);
    //obstaclesGroup.setLifetimeEach(-1);
    nGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(999999999999999999999999999999999999999999999999999999999999999999999999);
    nGroup.setVelocityXEach(0);
  }
drawSprites();
}

function n1() {
  if(frameCount %60===0){
    n = createSprite(1250,100,40,10);
    n.addImage(nng);
    n.y = Math.round(random(10,60));
    n.scale = 0.4;
    n.velocityX=-3;
    n.depth=trex.depth;
    trex.depth=trex.depth+1;
    nGroup.add(n);

  }
}
function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(1150,height-25,10,40);
    obstacle.velocityX = -6;
 
    
     // //gerar obstáculos aleatórios
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: obstacle.addImage(obstacle1);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;
       case 3: obstacle.addImage(obstacle3);
               break;
       case 4: obstacle.addImage(obstacle4);
               break;
       case 5: obstacle.addImage(obstacle5);
               break;
       case 6: obstacle.addImage(obstacle6);
               break;
       default: break;
     }
    
     //atribua dimensão e tempo de vida aos obstáculos          
     obstacle.scale = 0.5;
     obstacle.lifetime = 300;
    
    //adicionando obstáculos ao grupo
    obstaclesGroup.add(obstacle);

  }
 }