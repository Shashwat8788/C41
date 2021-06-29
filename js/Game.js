class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1Img);
    console.log()
    car2 = createSprite(300,200);
    car2.addImage("car2",car2Img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3Img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4Img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();

    player.getCarAtEnd();
    console.log(playerRank);
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));

      image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5);
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
          fill("red");
          ellipse(x,y,70,70);
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10;
      if(player.distance===3900 && gameState===1){
      
        console.log(playerRank);
        playerRank++;
        player.rank = playerRank;
        
        Player.updateCarAtEnd();
        console.log("here"+gameState);
  
        if(playerRank===3){
          gameState = 2;
          console.log(playerRank);
          console.log(gameState);
          
        }
        
      }
      player.update();
    }

    

    drawSprites();
  }

   end(){
     console.log("Game Ended");
     var displaymsg = createElement("h1");
     displaymsg.position(displayWidth/2,40);
     displaymsg.html("Game Ended");
     var rank1 = createElement("h2");
     rank1.position(displayWidth/2,60);
     var rank2 = createElement("h2");
     rank2.position(displayWidth/2,90);
     var rank3 = createElement("h2");
     rank3.position(displayWidth/2,120);
     var rank4 = createElement("h2");
     rank4.position(displayWidth/2,150);
     Player.getPlayerInfo();
     for(var i in allPlayers){
        switch(allPlayers[i].rank){
            case 1: rank1.html(allPlayers[i].name+"is First");
                    break; 
            case 2: rank2.html(allPlayers[i].name+"is Second");
                    break;
            case 3: rank3.html(allPlayers[i].name+"is Third");
                    break;
            default: rank4.html(allPlayers[i].name+"is Fourth");
                                     
        }
     }

   }
   
}
