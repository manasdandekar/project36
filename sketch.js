var dog,sadDog,happyDog;
var petdog,feeddog;
var foodobj,foodStock,foodS;
var addFood,feed,lastFed;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodobj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock)

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  addFood=createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
}

function draw() {
  background(46,139,87);

  foodobj.display();

  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
  lastFed=data.val()
  })

  fill(255,255,255)

  if(lastFed>=12){
    text("Last Feed: "+lastFed%12+"PM",350,30)
  }else if(lastFed==0){
    text("Last Feed: 12 AM",350,30)
  }else {
    text("Last Feed: "+lastFed+"AM",350,30)
  }

  drawSprites();
}

function readStock(data){
 foodS=data.val();
 foodobj.updateFoodStock(foodS);
}

//function to update food Stock
function feedDog(){
  dog.addImage(happyDog);
   var food_stock_val = foodobj.getFoodStock();
  if(food_stock_val<=0){
    foodobj.updateFoodStock(food_stock_val*0);
  }else{
    foodobj.updateFoodStock(food_stock_val-1);
  }

database.ref('/').update({
  Food:foodobj.getFoodStock(),
  FeedTime:hour()
})
}

//function to update food stock and last fed time


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
  Food:foodS
  })
}