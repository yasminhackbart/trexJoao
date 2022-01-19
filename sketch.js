var ground, IMGground

var trex

var trexIMG

var solo_invisivel 

var Obstaculo

var grupo

var score

var modo

var trexColidido

var Restart

var Game_Over

var pulo

var checkpoint

var gameOver

function create_cloud () {
  if (frameCount % 80 == 0){
    nuvem = createSprite (-20,100)
    nuvem.velocityX = 2
    nuvem.addImage (IMGcloud)
    nuvem.y = random (10,100)
    nuvem.depth = 1
    trex.depth = 2    
    nuvem.lifetime = 800
  }                     
}

function create_obstaculo () {
  if (frameCount % 150 ==0){
    obstaculo = createSprite (width,height/2)
    obstaculo.lifetime = 900
    obstaculo.velocityX = -(3+score/100)
    obstaculo.scale = 0.1
    OBS = Math.round(random(1,6))
    switch (OBS) {
      case 1: obstaculo.addImage (IMGobs1)
      obstaculo.scale= 0.07
     break
     case 2: obstaculo.addImage (IMGobs2)
     obstaculo.scale= 0.07
     break
     case 3: obstaculo.addImage (IMGobs3)
     break
     case 4: obstaculo.addImage (IMGobs4) 
     obstaculo.scale= 0.04
     break
     case 5: obstaculo.addImage (IMGobs5)
     obstaculo.scale= 0.04
     break
     case 6: obstaculo.addImage (IMGobs6)
     break
     default: break
    }
     grupo.add (obstaculo)
  }
}

function preload() {

  trexIMG=loadAnimation ("trex1.png", "trex3.png", "trex4.png")

  IMGground = loadImage ("ground2.png")

  IMGcloud = loadImage ("cloud.png")

  IMGobs1 = loadImage (" obstacle1.png")
  IMGobs2 = loadImage (" obstacle2.png")
  IMGobs3 = loadImage (" obstacle3.png")
  IMGobs4 = loadImage (" obstacle4.png")
  IMGobs5 = loadImage (" obstacle5.png")
  IMGobs6 = loadImage (" obstacle6.png")

  trexColidido = loadAnimation ("trex_collided.png")

  restart = loadImage ("restart.png")
  Game_Over = loadImage ("gameOver.png")
  pulo=loadSound("jump.mp3")
  checkpoint=loadSound("checkPoint.mp3")
  gameOver=loadSound("die.mp3")
  modo = "inicio"
}

function setup() {
  
  createCanvas(windowWidth,windowHeight);
  
  trex=createSprite (100,100)
  
  trex.addAnimation ("trex", trexIMG)
  trex.addAnimation("trexColidido",trexColidido)
  
  ground=createSprite (300,height/2,600,10)
  
  trex.scale = 0.5
  
  ground.addImage (IMGground)

  ground.scale = 1.5
  
  solo_invisivel = createSprite (300,height/2+50,600,100)

  solo_invisivel.visible=false 

  score = 0
  grupo=createGroup ()
  modo = "início"

  trex.setCollider ("circle",0,0,40)
  //trex.debug = true

  F5=createSprite (width/2,height/2)
  GameOver=createSprite (width/2,height/2+100)

  F5.addImage (restart)
  GameOver.addImage (Game_Over)

  F5.scale = 0.5
  GameOver.scale = 0.5

  F5.visible=false
  GameOver.visible=false
}

function draw() {
 
 
  
  background("white");
  
  drawSprites ()
 
  
  text (score, 10, 170)

  if (modo=="início"){
      
    if (touches.lenght>0){
        modo="jogando"
        touches=[]
        trex.collide (solo_invisivel)
      }
      
    }


if (modo=="jogando"){
  if(trex.collide (solo_invisivel)){
    if (touches.length>0){
         touches=[] ;   
        trex.velocityY = -12
        pulo.play();
       }
    } 

    trex.velocityY = trex.velocityY +0.6   

     ground.velocityX = -(3+score/100)
    
     create_obstaculo ()
    
     score=score+Math.round(getFrameRate()/60);
    
     if (ground.x<100 ){
    ground.x=ground.width/2
    }
    
        create_cloud ()
        if (frameCount%500==0){
          checkpoint.play()
        }
        if (trex.isTouching (grupo))
      {
        gameOver.play();
        modo="fim"
        }
    }



   if (modo=="fim") {
   var tempo=World.seconds
    ground.velocityX=0
    grupo.setVelocityXEach (0)
     trex.changeAnimation ("trexColidido")
     create_cloud()
     grupo.setLifetimeEach (-8000)
     F5.visible=true
     GameOver.visible=true
     trex.collide (solo_invisivel)
     if (touches.length>0){
       modo="início"
       grupo.destroyEach ()
       F5.visible=false
       GameOver.visible=false
       trex.changeAnimation ("trex")
       score=0
       touches=[]
      }
    }
  }
