class Game {
  constructor() { }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100, 200)
    car1.addImage("car1", car1img);
    car2 = createSprite(300, 200)
    car2.addImage("car2", car2img)
    car3 = createSprite(500, 200)
    car3.addImage("car3", car3img)
    car4 = createSprite(700, 200)
    car4.addImage("car4", car4img)
    cars = [car1, car2, car3, car4]
  }

  play() {
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if (allPlayers !== undefined) {
      background("#C68767")
      image(track, 0, -displayHeight * 4, displayWidth, displayHeight * 5)
      var index = 0;


      //x and y position of the cars
      var x = 175
      var y;
      //var display_position = 130;
      for (var plr in allPlayers) {
        //add one to the index for every loop
        index = index + 1

        //position the car a little bit away from each other in X direction
        x = x + 240;

        //use data from the data base to display the cars in Y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index - 1].x = x;
        cars[index - 1].y = y;

        if (index === player.index) {
          stroke(10)
          fill("red")
          ellipse(x,y,60,60)
          cars[index - 1].shapeColour = "red";
          camera.position.x = displayWidth / 2;
          camera.position.y = cars[index - 1].y;
        }


        /* if (plr === "player" + player.index)
           fill("red")
         else
           fill("black");
 
         display_position+=20;
         textSize(15);
         text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)*/
      }
    }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance += 50
      player.update();
    }
    if (player.distance > 4100) {
      gameState = 2;
    }

    drawSprites()

  }
  end() {
    console.log("Game Ended")
  }
}