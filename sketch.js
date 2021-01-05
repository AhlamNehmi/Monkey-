var monkey , monkey_running
var bananaImage, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var backGround,backGImg; 
var invisibleGround;

var END = 1;
var PLAY = 0;
var gameState = PLAY;
var survivalTime;



function preload(){
  
  monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  backGImg = loadImage("jungle.jpg");
  
  score = 0;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
}

function setup() {
  createCanvas(400, 400);
  
  backGround = createSprite(200,200,600,8);
  backGround.velocityX = -10;
  backGround.addImage(backGImg);
    
  monkey = createSprite(58,320,8,8);
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.scale = 0.2;
  monkey.velocityY = 2;
  
  invisibleGround = createSprite(200,380,600,8);
}

function draw() {
  background(220);
  
  
  
  if(backGround.x<200){
    backGround.x = backGround.width/2;
  }
    
  invisibleGround.visible = false;
  monkey.collide (invisibleGround);
  
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  
  if(monkey.isTouching(obstacleGroup)){
    monkey.scale = monkey.scale - 0.005;
  }
  
  if(monkey.isTouching(foodGroup)){
    score = score+1;
    monkey.scale = 0.2 + 0.05;
  }
  
    monkey.velocityY = monkey.velocityY + 0.8;
  
  drawSprites();
  
  textSize (20);
  text("Score:"+score,50,50);
  
  spawnObstacles();
  spawnFood();
}

function spawnObstacles(){
  if(frameCount % 200 === 0){
  var obstacle = createSprite(450,350,70,400);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.2;
  obstacle.lifetime = 50;  
  obstacle.velocityX = -10;
    
    obstacleGroup.add(obstacle);
  }
}

function spawnFood(){
  if(frameCount % 100 === 0){
  var food = createSprite(450,200,70,400);
  food.y = Math.round(random(80,200));
  food.addImage(bananaImage);
  food.scale = 0.05;
  food.lifetime = 50;  
  food.velocityX = -10;
    
    foodGroup.add(food);
  }
}