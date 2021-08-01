var database;
var gameState=0;
var playerCount=0;
var game , player , form;
var allPlayers;
var cars,car1,car2,car3,car4;

function preload(){
    track=loadImage("track.jpg")
    car1img=loadImage("car1.png")
    car2img=loadImage("car2.png")
    car3img=loadImage("car3.png")
    car4img=loadImage("car4.png")
    groundimg=loadImage("ground.png")
}
function setup(){
    createCanvas(displayWidth-20,displayHeight-30);

    database=firebase.database()
    game = new Game(); 
    game.getState(); 
    game.start();
}

function draw(){

if (playerCount==4){
    game.update(1)
}

if (gameState===1){
    clear()
    game.play();
    
}
if(gameState===2){
    game.end()
}
}