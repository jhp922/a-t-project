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
let characterX = 40, characterY = 400;
let isGiven = false;
let frameToggle = false;

function preload() {
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
  createCanvas(1600, 900);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  handPose.detectStart(video, gotHands);
  frameRate(20);
}

function draw() {
  background(220);

  drawCharacter(characterX, characterY, isGiven, currentAge);
  drawHands();

  if (isGiven) {
    characterX += 4;
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

function drawCharacter(x, y, isGiven, ageIndex) {
  if (!isGiven) {
    image(standImgs[ageIndex], x, y, 128, 128);
  } else {
    if (frameCount % 6 === 0) frameToggle = !frameToggle;
    image(frameToggle ? walkImgs[ageIndex] : standImgs[ageIndex], x, y, 128, 128);
  }
}

function drawRecyclingBox(x, y) {
  push();
  noStroke();
  const dotSize = 6;
  fill(34, 139, 34);
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
