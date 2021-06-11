var PLAY = 2;

var END = 3;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;
var jump
var gameOver, restart;
var title
var fail
var l1
var l2
var l3
var l4
var l5

var ll1
var ll2
var ll3
var ll4
var ll4
var ll5

function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  jump = loadSound("jump.mp3")
  fail = loadSound("f.mp3")
  
l1 = loadImage("1.png")
l2 = loadImage("2.png")
l3 = loadImage("3.png")
l4 = loadImage("4.png")
l5 = loadImage("5.png")

  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("download.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight/2);
  
  trex = createSprite(displayWidth/2-600);
  

  












  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;

  ll5 = createSprite(displayWidth/2-500,displayHeight/2-400)
  ll5.addImage(l5)
  ll5.scale = 0.5
 ll5.visible = false
  
  ll4 = createSprite(displayWidth/2-500,displayHeight/2-400)
  ll4.addImage(l4)
  ll4.scale = 0.5
  ll4.visible = false

  ll3 = createSprite(displayWidth/2-500,displayHeight/2-400)
  ll3.addImage(l3)
  ll3.scale = 0.5
  ll3.visible = false

  ll2 = createSprite(displayWidth/2-500,displayHeight/2-400)
  ll2.addImage(l2)
  ll2.scale = 0.5
  ll2.visible = false

  ll1 = createSprite(displayWidth/2-500,displayHeight/2-400)
  ll1.addImage(l1)
  ll1.scale = 0.5
  ll1.visible = false
  
  ground = createSprite(displayWidth,displayHeight/2-200,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(displayWidth/2,displayHeight/2-300);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(displayWidth/2,displayHeight/2-150);
  restart.addImage(restartImg);
  
  gameOver.scale = 2 ;
  restart.scale = 0.2;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(displayWidth/2-500,displayHeight/2-195,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();

  camera.position.x=displayWidth/2
  camera.position.y=displayHeight/2-300
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
 

  


 
  if (gameState===PLAY){
    background(255)
    score = score + Math.round(getFrameRate()/60);
   ground.velocityX = -(6 + 3*score/100);
   ll1.visible = false
    if(score >= 500){
      ll1.visible = true
    }
 if(score >= 1000){
     ll2.visible = true
 }
 if(score >= 1500){
  ll3.visible = true
}
if(score >= 2000){
  ll4.visible = true
}
if(score >= 2500){
  ll5.visible = true
}


    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -12;
      jump.play()
    }
textSize(30)
    text("T-REX GAME",displayWidth/2-100,displayHeight/2-450)
    textSize(20)
    text("Score: "+ score, displayWidth/2+550,displayHeight/2-360);
    trex.visible = true  
    ground.visible = true
  
    trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState=(END)

        fail.play()
    }
  }
  else if (gameState === END) {
 ll1.visible = false
 ll2.visible = false
 ll3.visible = false
 ll4.visible = false
 ll5.visible = false



    gameOver.visible = true;
    restart.visible = true;
    //textSize(30)
   // text("👈👈PRESS THIS BUTTON TO RESET",displayWidth/2+70,displayHeight/2-150)
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
   trex.visible = false  
  ground.visible = false
  
  
    
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(displayWidth/2+700,displayHeight/2-300,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
   cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 500;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(displayWidth/2+700,displayHeight/2-215,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
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
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
 
  
  score = 0;
  
}
