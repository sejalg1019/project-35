var dog, dogImg, happyDog, happyImg, database, foodS, foodStock;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);

  dog = createSprite(250,300,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyImg);
  }

  drawSprites();

  textSize(25);
  fill("white");
  stroke("black");
  text("Food remaining:"+ foodS, 150, 200);

  
  textSize(15);
  fill("white");
  stroke("black");
  text("Note: Press the up arrow key to feed your dog milk!", 150, 20);

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  } else {
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}



