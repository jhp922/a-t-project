let background_move_n = -0;
let background_move = false;

let cloud_move_falme = 0;

let img_sky;
let img_sky5;
let img_ground;
let img_ground2;

let img_cloud1;
let img_cloud2;
let img_cloud3;
let img_cloud4;
let img_cloud5;
let img_cloud6;

let img_tree_1;
let img_tree_2;
let img_tree_3;
let img_tree_4;

let handPose;
let video;
let hands = [];

let objectX = 300, objectY = 400;
let objectVisible = true;
let isGrabbing = false;
let offsetX = 0, offsetY = 0;

let openHandImg, closedHandImg;
let standImgs = [], walkImgs = [];

let currentAge = 0;
let characterX = 360, characterY = 330;
let isGiven = false;
let frameToggle = false;

function preload() {
  img_sky = loadImage('하늘.png');
  img_sky5 = loadImage('하늘5.png');
  
  img_ground = loadImage('땅.png');
  img_ground2 = loadImage('땅2.png');
  
  img_cloud1 = loadImage('구름1.png');
  img_cloud2 = loadImage('구름2.png');
  img_cloud3 = loadImage('구름3.png');
  img_cloud4 = loadImage('구름4.png');
  img_cloud5 = loadImage('구름5.png');
  img_cloud6 = loadImage('구름6.png');
  
  img_tree_1 = loadImage('나무1.png');
  img_tree_2 = loadImage('나무2.png');
  img_tree_3 = loadImage('나무3.png');
  img_tree_4 = loadImage('나무4.png');
  
  handPose = ml5.handPose();
  openHandImg = loadImage('openHand.png');
  closedHandImg = loadImage('closedHand.png');

  standImgs[0] = loadImage('child stand.png');
  walkImgs[0]  = loadImage('child walk.png');
  standImgs[1] = loadImage('teen walk.png');
  walkImgs[1]  = loadImage('teen walk 2.png');
  standImgs[2] = loadImage('adult walk.png');
  walkImgs[2] = loadImage('adult walk2.png');
  standImgs[3] = loadImage('old walk.png');
  walkImgs[3] = loadImage('old walk2.png');
}

function setup() {
  createCanvas(4000, 450);
  background(220);
  rectMode(CENTER);
  imageMode(CENTER);
  
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  handPose.detectStart(video, gotHands);
  frameRate(20);
}

function draw() {
  background_maker();
  
  if(background_move){
    background_mover();
  }
  
  drawCharacter(characterX, characterY, isGiven, currentAge);
  drawHands();

  if (isGiven) {
    characterX += 0.5;
    if (characterX > width + 50) {
      nextCharacter();
    }
  }

  if (objectVisible) {
    drawRecyclingBox(objectX, objectY);
  }

  updateHandState();
  updateObjectPosition();

  if (objectVisible && isNearCharacter(objectX, objectY)) {
    objectVisible = false;
    isGiven = true;
  }
}

function mousePressed(){
  if(background_move === false){
    background_move = true;
  }
  
}


function background_mover(){
  background_move_n -= 1;
  
  switch(background_move_n){
      
    case -800:
      background_move = false;
      break;
    case -1600:
      background_move = false;
      break;
    case -2400:
      background_move = false;
      break;
    case -3200:
      background_move = false;
      break;
      
  }
}

function background_maker(){

  
    background1();
    background2();
    background3();
    background4();
    background5();
    cloud_maker();
  
  


}

function cloud_maker(){
  if(background_move_n < -800){

  }else{
    image(img_cloud1,200 + background_move_n + cloud_move_falme,50,120,90);
    image(img_cloud2,400 + background_move_n + cloud_move_falme,70,150,120);
    image(img_cloud3,600 + background_move_n + cloud_move_falme,50,150,60);
    image(img_cloud4,800 + background_move_n + cloud_move_falme,70,180,120);
    image(img_cloud5,1000 + background_move_n + cloud_move_falme,50,180,120);
    image(img_cloud6,1200 + background_move_n + cloud_move_falme,70,120,80);
  }
  cloud_move_falme += -0.2;
}

function background1(){
  push();
  fill(150,200,255);
  image(img_sky,400 + background_move_n,225,800,450);
  image(img_ground,400 + background_move_n,225,800,450);
  
  
  image(img_tree_1,300 + background_move_n,190,150,270);
  image(img_tree_2,400 + background_move_n,170,150,270);
  image(img_tree_3,500 + background_move_n,190,150,270);
  image(img_tree_4,600 + background_move_n,190,150,270);
  image(img_tree_1,700 + background_move_n,190,150,270);
  image(img_tree_3,100 + background_move_n,190,150,270);
  image(img_tree_4,200 + background_move_n,190,150,270);
  image(img_tree_1,300 + background_move_n,190,150,270);

  // 왼쪽 나무들
  image(img_tree_1,100 + background_move_n,200,150,270);
  image(img_tree_2,30 + background_move_n,230,150,270);
  image(img_tree_3,200 + background_move_n,270,150,270);
  image(img_tree_4,80 + background_move_n,300,150,270);
  image(img_tree_1,10 + background_move_n,330,150,270);
  image(img_tree_2,270 + background_move_n,360,150,270);
  image(img_tree_3,150 + background_move_n,390,150,270);
  image(img_tree_4,230 + background_move_n,410,150,270);
  image(img_tree_1,70 + background_move_n,450,150,270);
  
  // 아래 나무들
  image(img_tree_1,400 + background_move_n,450,150,270);
  image(img_tree_4,500 + background_move_n,450,150,270);
  image(img_tree_1,600 + background_move_n,450,150,270);
  image(img_tree_2,700 + background_move_n,450,150,270);
  pop();
}




function background2(){
  push();
  image(img_sky,1200 + background_move_n,225,800,450);
  image(img_ground2,1200 + background_move_n,225,800,450);
  
  //밑 나무
  pop();
}

function background3(){
  push();
  tint(255,200);
  image(img_sky,2000 + background_move_n,225,800,450);
  tint(255,30);
  image(img_sky5,2000 + background_move_n,225,800,450);
  tint(255,255);
  image(img_ground,2000 + background_move_n,225,800,450);
  pop();
}

function background4(){
  push();
  tint(255,200);
  image(img_sky,2800 + background_move_n,225,800,450);
  tint(255,60);
  image(img_sky5,2800 + background_move_n,225,800,450);
  tint(255,255);
  image(img_ground,2800 + background_move_n,225,800,450);
  pop();
}


function background5(){
  push();
  fill(0,0,255);
  image(img_sky5,3600 + background_move_n,225,800,450);
  image(img_ground,3600 + background_move_n,225,800,450);
  pop();
}

function drawCharacter(x, y, isGiven, ageIndex) {
  if (!isGiven) {
    image(standImgs[ageIndex], x, y, 100, 100);
  } else {
    if (frameCount % 6 === 0) frameToggle = !frameToggle;
    image(frameToggle ? walkImgs[ageIndex] : standImgs[ageIndex], x, y, 100, 100);
  }
}

function drawRecyclingBox(x, y) {
  push();
  noStroke();
  const dotSize = 6;
  fill(250,0,0);
  for (let i = -3; i <= 3; i++) {
    for (let j = -2; j <= 2; j++) {
      rect(x + i * dotSize, y + j * dotSize, dotSize, dotSize);
    }
  }
  pop();
}

function drawHands() {
  for (let hand of hands) {
    let indexTip = hand.keypoints.find(k => k.name === "index_finger_tip");
    if (indexTip) {
      imageMode(CENTER);
      image(isGrabbing ? closedHandImg : openHandImg, indexTip.x, indexTip.y, 60, 60);
    }
  }
}

function updateHandState() {
  for (let hand of hands) {
    let thumbTip = hand.keypoints.find(k => k.name === "thumb_tip");
    let indexTip = hand.keypoints.find(k => k.name === "index_finger_tip");

    if (thumbTip && indexTip) {
      let d = dist(thumbTip.x, thumbTip.y, indexTip.x, indexTip.y);
      if (d < 40) {
        if (!isGrabbing && objectVisible && isNearObject(indexTip.x, indexTip.y)) {
          isGrabbing = true;
          offsetX = objectX - indexTip.x;
          offsetY = objectY - indexTip.y;
        }
      } else {
        isGrabbing = false;
      }
    }
  }
}

function updateObjectPosition() {
  if (!isGrabbing || !objectVisible) return;

  let hand = hands[0];
  if (!hand) return;

  let indexTip = hand.keypoints.find(k => k.name === "index_finger_tip");
  if (indexTip) {
    objectX = indexTip.x + offsetX;
    objectY = indexTip.y + offsetY;
  }
}

function nextCharacter() {
  currentAge++;
  if (currentAge >= standImgs.length) currentAge = 0;

  characterX = 40;
  isGiven = false;
  objectVisible = true;
  objectX = 300;
  objectY = 400;
}

function isNearObject(x, y) {
  return dist(x, y, objectX, objectY) < 50;
}

function isNearCharacter(x, y) {
  return dist(x, y, characterX, characterY) < 50;
}

function gotHands(results) {
  hands = results;
}
